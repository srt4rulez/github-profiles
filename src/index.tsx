import React from 'react';
import { createRoot } from 'react-dom/client';
import App from 'src/App';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
} from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import { ThemeProvider } from '@mui/material/styles';
import theme from 'src/theme';
import '@fontsource/rubik/400.css';
import '@fontsource/rubik/700.css';

const client = new ApolloClient({
    uri: `${window.location.origin}/.netlify/functions/graphql`,
    cache: new InMemoryCache(),
});

const container = document.getElementById('root');

// eslint-disable-next-line
const root = createRoot(container!);

root.render(
    <React.StrictMode>
        <ApolloProvider
            client={client}
        >

            <ThemeProvider
                theme={theme}
            >

                <ChakraProvider
                    theme={theme}
                >

                    <App />

                </ChakraProvider>

            </ThemeProvider>

        </ApolloProvider>
    </React.StrictMode>
);
