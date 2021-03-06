import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from '../componests/Auth'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <AuthProvider>
      <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}
export default MyApp;
