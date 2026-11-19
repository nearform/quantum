/**
 * The theme a page should open in, applied before it first paints.
 *
 * `ThemeToggle` reads and writes the same key, but it runs after React has
 * rendered, so a page that waits for it shows the light theme for a frame
 * before switching. `themeInitScript` closes that gap: inline it in the page's
 * `<head>`, ahead of the stylesheet, and the `.dark` class is set first.
 *
 * It lives here rather than beside `ThemeToggle`, with no imports, so that it
 * can be loaded on its own as `@nearform/quantum/theme-init`, from a build
 * config that injects it into a static `index.html` (Vite's
 * `transformIndexHtml`, for one) without loading React or any component.
 */

/** The `localStorage` key that holds the chosen theme, `'light'` or `'dark'`. */
export const THEME_STORAGE_KEY = 'theme'

/** The media query for the operating system's dark preference. */
export const DARK_SCHEME_QUERY = '(prefers-color-scheme: dark)'

/**
 * The script to inline, as a string. A stored choice wins; otherwise it follows
 * the operating system. It never throws: storage can be blocked and
 * `matchMedia` can be missing, and the page then opens light.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');document.documentElement.classList.toggle('dark',t==='dark'||(t!=='light'&&matchMedia('${DARK_SCHEME_QUERY}').matches))}catch(e){}})()`
