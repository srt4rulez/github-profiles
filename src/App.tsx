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
import { useLazyQuery } from '@apollo/client';
import UserProfile from 'src/UserProfile';
import type { GetUserProfileDetailsQuery } from 'src/generated/graphql';
import { GetUserProfileDetailsDocument } from 'src/generated/graphql';
import type { OptionInterface } from './types';

const App = (): JSX.Element | null => {

    const [fetchUserProfileDetails, { loading: isLoading, data, previousData }] = useLazyQuery<GetUserProfileDetailsQuery>(GetUserProfileDetailsDocument);

    const userProfileDetails = data || previousData;

    const isReloading = isLoading && previousData;

    const [gitHubUser, setGitHubUser] = useState<OptionInterface | null>(null);

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

                    Look up users on GitHub to view their profile information.

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
                    onChange={(event: React.SyntheticEvent, newValue): void => {
                        setGitHubUser(newValue);

                        if (newValue && newValue.login) {
                            void fetchUserProfileDetails({
                                variables: {
                                    login: newValue.login
                                },
                            });
                        }
                    }}
                />

            </Box>

            <Box
                position="relative"
            >

                {isLoading && (

                    <Center
                        position={isReloading ? 'absolute' : 'relative'}
                        width="100%"
                        marginY="32"
                    >

                        <Spinner
                            size="xl"
                            color="gray.800"
                        />

                    </Center>

                )}

                {userProfileDetails && userProfileDetails.user && (

                    <UserProfile
                        login={userProfileDetails.user.login}
                        name={userProfileDetails.user.name || ''}
                        url={userProfileDetails.user.url || ''}
                        bio={userProfileDetails.user.bio || ''}
                        avatarUrl={userProfileDetails.user.avatarUrl || ''}
                        createdAt={userProfileDetails.user.createdAt || ''}
                        followersTotalCount={userProfileDetails.user.followers.totalCount}
                        repositoriesTotalCount={userProfileDetails.user.repositories.totalCount}
                        issuesTotalCount={userProfileDetails.user.issues.totalCount}
                        repositories={userProfileDetails.user.repositories.nodes || []}
                        topRepositories={userProfileDetails.user.topRepositories.nodes || []}
                    />

                )}

            </Box>

        </Container>

    );

};

export default App;
