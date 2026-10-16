import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, relative, resolve, sep } from 'node:path'
import ts from 'typescript'

const SELECTION = 'visual-regression/selection.json'
const CHANGED = 'visual-regression/changed-files.txt'

const NOT_VISUAL = [
  /^\.github\//,
  /^\.husky\//,
  /^__tests__\//,
  /\.test\.[cm]?[jt]sx?$/,
  /\.mdx?$/,
  /^\.(commitlintrc|editorconfig|gitignore|nvmrc|prettierrc)$/,
  /^eslint\.config\.mjs$/,
  /^jest\.config\.js$/,
  /^jest\.module-hooks\.setup\.js$/,
  /^tsconfig\.build[\w.-]*\.json$/,
  /^scripts\/build[\w.-]*\.mjs$/,
  /^index\.js$/
]

const AFFECTS_EVERY_STORY = [
  /^src\/(colors|animations)\//,
  /^src\/(theme|tailwind-plugin|tailwind-base)\.ts$/,
  /\.css$/,
  /^\.storybook\//,
  /^package(-lock)?\.json$/,
  /^postcss\.config\.js$/,
  /^tsconfig\.json$/,
  /^public\//,
  /^scripts\//
]

const toRepoPath = file => relative(process.cwd(), file).split(sep).join('/')

const listStoryFiles = dir =>
  readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) return listStoryFiles(path)
    return /\.stories\.[cm]?[jt]sx?$/.test(entry.name) ? [path] : []
  })

const storyDependencies = storyFiles => {
  const configPath = ts.findConfigFile('.', ts.sys.fileExists, 'tsconfig.json')
  const { config } = ts.readConfigFile(configPath, ts.sys.readFile)
  const { options } = ts.parseJsonConfigFileContent(config, ts.sys, '.')
  const program = ts.createProgram(storyFiles, { ...options, noEmit: true })
  const checker = program.getTypeChecker()
  const cache = new Map()

  const declarationFiles = identifier => {
    let symbol = checker.getSymbolAtLocation(identifier)
    if (symbol && symbol.flags & ts.SymbolFlags.Alias) {
      symbol = checker.getAliasedSymbol(symbol)
    }
    return (symbol?.declarations ?? []).map(
      declaration => declaration.getSourceFile().fileName
    )
  }

  const visit = (fileName, seen) => {
    if (seen.has(fileName) || fileName.includes('/node_modules/')) return
    seen.add(fileName)
    const source = program.getSourceFile(fileName)
    if (!source) return
    for (const statement of source.statements) {
      if (
        !(
          ts.isImportDeclaration(statement) || ts.isExportDeclaration(statement)
        ) ||
        !statement.moduleSpecifier ||
        !ts.isStringLiteral(statement.moduleSpecifier)
      ) {
        continue
      }
      const specifier = statement.moduleSpecifier.text
      const resolved = ts.resolveModuleName(
        specifier,
        fileName,
        options,
        ts.sys
      ).resolvedModule
      if (!resolved) {
        if (specifier.startsWith('.')) {
          seen.add(resolve(dirname(fileName), specifier))
        }
        continue
      }
      if (resolved.isExternalLibraryImport) continue

      const bindings = ts.isImportDeclaration(statement)
        ? statement.importClause?.namedBindings
        : undefined
      const onlyNamed =
        bindings &&
        ts.isNamedImports(bindings) &&
        !statement.importClause.name &&
        bindings.elements.length > 0

      if (onlyNamed) {
        for (const element of bindings.elements) {
          for (const file of declarationFiles(element.name)) visit(file, seen)
        }
      } else {
        visit(resolved.resolvedFileName, seen)
      }
    }
  }

  return storyFiles.map(storyFile => {
    if (!cache.has(storyFile)) {
      const seen = new Set()
      visit(resolve(storyFile), seen)
      cache.set(
        storyFile,
        new Set(
          [...seen]
            .filter(file => !file.includes(`${sep}node_modules${sep}`))
            .map(toRepoPath)
        )
      )
    }
    return { storyFile: toRepoPath(storyFile), files: cache.get(storyFile) }
  })
}

const select = () => {
  if (process.env.VISUAL_ALL === 'true') {
    return { mode: 'all', reason: 'a full run was requested' }
  }

  const changed = readFileSync(CHANGED, 'utf8')
    .split('\n')
    .filter(Boolean)
    .filter(file => !NOT_VISUAL.some(pattern => pattern.test(file)))

  if (changed.length === 0) {
    return { mode: 'none', reason: 'no changed file can affect a story' }
  }

  const global = changed.filter(file =>
    AFFECTS_EVERY_STORY.some(pattern => pattern.test(file))
  )
  if (global.length > 0) {
    return {
      mode: 'all',
      reason: `${global.join(', ')} can affect every story`
    }
  }

  const stories = storyDependencies(listStoryFiles('stories'))
  const reachable = new Set(stories.flatMap(({ files }) => [...files]))
  const untraced = changed.filter(file => !reachable.has(file))

  if (untraced.length > 0) {
    return {
      mode: 'all',
      reason: `${untraced.join(', ')} can't be traced to specific stories`
    }
  }

  const storyFiles = stories
    .filter(({ files }) => changed.some(file => files.has(file)))
    .map(({ storyFile }) => storyFile)

  return {
    mode: 'some',
    reason: `${changed.length} changed file(s) reach ${storyFiles.length} story file(s)`,
    storyFiles
  }
}

const filterIndex = storybookDir => {
  const selection = JSON.parse(readFileSync(SELECTION, 'utf8'))
  const indexPath = join(storybookDir, 'index.json')
  const index = JSON.parse(readFileSync(indexPath, 'utf8'))
  const keep = new Set(selection.storyFiles ?? [])
  const entries = Object.fromEntries(
    Object.entries(index.entries).filter(
      ([, entry]) =>
        entry.type === 'story' &&
        (selection.mode === 'all' ||
          keep.has(entry.importPath.replace(/^\.\//, '')))
    )
  )
  writeFileSync(indexPath, JSON.stringify({ ...index, entries }))
  console.log(Object.keys(entries).length)
}

const [command, argument] = process.argv.slice(2)

if (command === 'select') {
  const selection = select()
  writeFileSync(SELECTION, JSON.stringify(selection, null, 2))
  const files = selection.storyFiles
    ? `: ${selection.storyFiles.join(', ')}`
    : ''
  console.error(
    `Visual selection: ${selection.mode} (${selection.reason})${files}`
  )
  console.log(selection.mode)
} else if (command === 'filter') {
  filterIndex(argument)
} else {
  throw new Error('Usage: visual-affected.mjs select | filter <storybook-dir>')
}
