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
                    color="purple.800"
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

                    Look up users on GitHub to view their avatar, username, followers count, repository count, and top 4 repositories based on stars.

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
