import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const config = {
	initialColorMode: "dark",
	useSystemColorMode: false,
};

const theme = extendTheme({ config });

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
);

