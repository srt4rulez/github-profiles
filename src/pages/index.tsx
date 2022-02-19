import type { NextPage } from 'next';
import {
    Box,
    Container,
    Heading,
    Text,
} from '@chakra-ui/react';

const IndexPage: NextPage = () => {

    return (

        <Container
            maxWidth="container.xl"
        >

            <Box
                as="section"
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

        </Container>

    );
};

export default IndexPage;
