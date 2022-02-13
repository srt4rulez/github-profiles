import type { AppProps } from 'next/app';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import theme from 'src/theme';
import '@fontsource/rubik/400.css';
import '@fontsource/rubik/700.css';

const client = new ApolloClient({
    uri: typeof window !== 'undefined' ? `${window.location.origin}/api/graphql` : undefined,
    cache: new InMemoryCache(),
});

const App = (props: AppProps): JSX.Element | null => {

    const Component = props.Component;

    return (

        <ApolloProvider
            client={client}
        >

            <ChakraProvider
                theme={theme}
            >

                <Component
                    {...props.pageProps}
                />

            </ChakraProvider>

        </ApolloProvider>

    );

};

export default App;
