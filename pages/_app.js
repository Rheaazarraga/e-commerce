import '../styles/globals.css'
import { Layout } from '../components';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      {/* the component that the user is currently on */}
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
