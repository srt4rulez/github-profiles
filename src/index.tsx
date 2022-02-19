import React from 'react';
import ReactDOM from 'react-dom';
import App from 'src/App';
// import {
//     ApolloClient,
//     InMemoryCache,
//     ApolloProvider,
// } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import theme from 'src/theme';
import '@fontsource/rubik/400.css';
import '@fontsource/rubik/700.css';

// const client = new ApolloClient({
//     uri: typeof window !== 'undefined' ? `${window.location.origin}/api/graphql` : undefined,
//     cache: new InMemoryCache(),
// });

ReactDOM.render(
    <React.StrictMode>
        {/* <ApolloProvider */}
        {/*     client={client} */}
        {/* > */}

        <ChakraProvider
            theme={theme}
        >

            <App />

        </ChakraProvider>

        {/* </ApolloProvider> */}
    </React.StrictMode>,
    document.getElementById('root')
);
