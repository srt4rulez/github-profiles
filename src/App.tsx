import React, { useState } from 'react';
import {
    Box,
    Container,
    Heading,
    Text,
    Spinner,
    Center,
} from '@chakra-ui/react';
import GitHubUsernameAutocomplete from 'src/GitHubUsernameAutocomplete/GitHubUsernameAutocomplete';
import { loader } from 'graphql.macro';
import type { OptionInterface, Repository } from 'src/types';
import { useLazyQuery } from '@apollo/client';
import UserProfile from 'src/UserProfile';

const GET_USER_PROFILE_DETAILS_QUERY = loader('./graphql/GetUserProfileDetails.graphql');

interface UserProfileDetails {
    user: {
        id: string;
        login: string;
        name: string;
        bio: string;
        url: string;
        avatarUrl: string;
        createdAt: string;
        issues: {
            totalCount: number;
        };
        followers: {
            totalCount: number;
        };
        repositories: {
            totalCount: number;
            nodes: Array<Repository>;
        };
    };
}

const App = (): JSX.Element | null => {

    const [fetchUserProfileDetails, { loading, data }] = useLazyQuery<UserProfileDetails>(GET_USER_PROFILE_DETAILS_QUERY);

    const userProfileDetails = data;

    const [gitHubUser, setGitHubUser] = useState<OptionInterface | null>(null);

    const handleChange = async(event: React.SyntheticEvent, newValue: OptionInterface | null): Promise<void> => {
        setGitHubUser(newValue);

        if (newValue && newValue.login) {
            await fetchUserProfileDetails({
                variables: {
                    login: newValue.login
                },
            });
        }
    };

    return (

        <Container
            maxWidth="container.xl"
        >

            <Box
                as="header"
                marginTop={{
                    md: 32,
                    base: 10,
                }}
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

                    Look up users on GitHub to view their avatar, username, followers count, repository count, and top 4 repositories based on stars.

                </Text>

            </Box>

            <Box
                as="section"
                maxWidth="400px"
                marginX="auto"
                marginTop="5"
                marginBottom="5"
            >

                <GitHubUsernameAutocomplete
                    value={gitHubUser}
                    onChange={handleChange}
                />

            </Box>

            {loading && (

                <Center>

                    <Spinner
                        size="xl"
                        color="purple.500"
                    />

                </Center>

            )}

            {userProfileDetails && (

                <UserProfile
                    login={userProfileDetails.user.login}
                    name={userProfileDetails.user.name}
                    url={userProfileDetails.user.url}
                    bio={userProfileDetails.user.bio}
                    avatarUrl={userProfileDetails.user.avatarUrl}
                    createdAt={userProfileDetails.user.createdAt}
                    followersTotalCount={userProfileDetails.user.followers.totalCount}
                    repositoriesTotalCount={userProfileDetails.user.repositories.totalCount}
                    issuesTotalCount={userProfileDetails.user.issues.totalCount}
                    repositories={userProfileDetails.user.repositories.nodes}
                />

            )}

        </Container>

    );

};

export default App;
