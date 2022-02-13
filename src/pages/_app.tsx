import type { AppProps } from 'next/app';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from '@apollo/client';

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

            <Component
                {...props.pageProps}
            />

        </ApolloProvider>

    );

};

export default App;
