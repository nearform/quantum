import { describe, expect, it } from '@jest/globals';
import qPlugin from '../src/tailwind-plugin';
import postcss from 'postcss';
import tailwindcss from 'tailwindcss';
import { ContentConfig } from 'tailwindcss/types/config';
import path from 'path';
function run(testContent: ContentConfig | string) {
  if (typeof testContent === 'string') {
    return postcss(tailwindcss(testContent)).process('@tailwind utilities;', {
      from: undefined
    });
  }
  return postcss(
    tailwindcss({ content: testContent, plugins: [qPlugin] })
  ).process('@tailwind utilities;', {
    from: undefined
  });
}

describe('Plugin can add index.js to content', () => {
  it('Is added to the tailwind config with files key', async () => {
    const testContent: ContentConfig = {
      files: ['./src/content.js', './stories/**/*'],
      relative: false
    };
    const filesLength = testContent.files.length;
    const { messages } = await run(testContent);
    expect(messages.length).toBe(filesLength + 1);
    expect(
      messages.some(message => message.file.includes('src/index.js'))
    ).toBe(true);
  });

  it('Can add to the content if array', async () => {
    const testContent: ContentConfig = ['./src/content.js', './stories/**/*'];
    const { messages } = await run(testContent);
    expect(
      messages.some(message => message.file.includes('src/index.js'))
    ).toBe(true);
  });

  it('Uses the right path to the package if relative', async () => {
    //pass in string path to dummy config
    const { messages } = await run(
      './__mocks__/plugin/tailwind.mock.config.ts'
    );

    const { index_exists, relative_mock_exists } = messages.reduce(
      (acc, message) => {
        //check index.js path added correctly
        if (message.file.includes('src/index.js')) {
          return { ...acc, index_exists: acc.index_exists + 1 };
          //check we're using relative paths.
        } else if (message.file.includes('__mocks__/plugin/content.js')) {
          return {
            ...acc,
            relative_mock_exists: acc.relative_mock_exists + 1
          };
        }
        return acc;
      },
      { index_exists: 0, relative_mock_exists: 0 }
    );
    expect(index_exists).toBe(1);
    expect(relative_mock_exists).toBe(1);
  });

  it('Doesnt add the path if already there', async () => {
    const pkgLoc = path.join(__dirname, '../src/index.js'); //where index.js is wrt this test file
    const testContent: ContentConfig = [
      './src/content.js',
      './stories/**/*',
      pkgLoc
    ];
    const filesLength = testContent.length;
    const { messages } = await run(testContent);
    expect(messages.length).toBe(filesLength);
    expect(
      messages.reduce((acc, message) => {
        return message.file?.includes('src/index.js') ? acc + 1 : acc;
      }, 0)
    ).toBe(1);
  });
});
