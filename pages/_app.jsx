// for now this _app.jsx file is just to import a global CSS file, which in turn
// imports css files at the component level
import './styles.css'

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}
