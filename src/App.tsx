import React from 'react';
import {
    Box,
    Container,
    Heading,
    Text,
} from '@chakra-ui/react';
import GitHubUsernameAutocomplete from 'src/GitHubUsernameAutocomplete/GitHubUsernameAutocomplete';

const App = (): JSX.Element | null => {

    return (

        <Container
            maxWidth="container.xl"
        >

            <Box
                as="header"
                marginTop="32"
            >

                <Heading
                    as="h1"
                    size="2xl"
                    color="gray.700"
                    textAlign="center"
                    marginBottom="4"
                >

                    GitHub Profiles

                </Heading>

                <Text
                    marginX="auto"
                    color="gray.600"
                    textAlign="center"
                    maxWidth="500px"
                >

                    Look up users on github to view their avatar, username, followers, repository count and top 4 repositories.

                </Text>

            </Box>

            <Box
                as="section"
                maxWidth="400px"
                marginX="auto"
                marginTop="5"
            >

                <GitHubUsernameAutocomplete />

            </Box>

        </Container>

    );

};

export default App;
