import '../styles/globals.css'
import { Layout } from '../components';
import { StateContext } from '../Context/StateContext';

// small notification pop-up
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }) {
  return (
    <StateContext>
      <Layout>
        <Toaster />
        {/* the component that the user is currently on */}
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  )
}

export default MyApp


/* wrapping the entire application with StateContext allows us to pass the 
data from the StateContext to every single component inside it */
