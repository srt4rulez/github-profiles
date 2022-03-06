import React from 'react';
import {
    Box,
    SimpleGrid,
    Divider,
    Text,
} from '@chakra-ui/react';
import { parseISO } from 'date-fns';
import ProfileHeading from 'src/ProfileHeading';
import ProfileBox from 'src/ProfileBox';
import StatBox from 'src/StatBox';
import RepositoryBox from 'src/RepositoryBox';
import {
    faBug,
    faCalendar,
    faCube,
    faUsers,
} from '@fortawesome/free-solid-svg-icons';
import type { Repository } from 'src/generated/graphql';

export interface UserProfileProps {
    login: string;
    name: string;
    url: string;
    bio: string;
    avatarUrl: string;
    createdAt: string;
    followersTotalCount: number;
    repositoriesTotalCount: number;
    issuesTotalCount: number;
    repositories?: Array<Partial<Repository> | null>;
    topRepositories?: Array<Partial<Repository> | null>;
}

const UserProfile = (props: UserProfileProps): JSX.Element => {

    return (

        <React.Fragment>

            <ProfileHeading>
                Profile Card
            </ProfileHeading>

            <ProfileBox
                login={props.login}
                name={props.name}
                bio={props.bio}
                avatarUrl={props.avatarUrl}
                url={props.url}
            />

            <Divider
                marginY="10"
            />

            <ProfileHeading>
                Stats
            </ProfileHeading>

            <SimpleGrid
                spacing={5}
                columns={{
                    lg: 4,
                    sm: 2,
                    base: 1,
                }}
            >

                <StatBox
                    value={parseISO(props.createdAt).toLocaleDateString()}
                    label="Joined"
                    icon={faCalendar}
                />

                <StatBox
                    value={props.followersTotalCount.toLocaleString()}
                    label={props.followersTotalCount === 1 ? 'Follower' : 'Followers'}
                    icon={faUsers}
                />

                <StatBox
                    value={props.repositoriesTotalCount.toLocaleString()}
                    label={props.repositoriesTotalCount === 1 ? 'Repository' : 'Repositories'}
                    icon={faCube}
                />

                <StatBox
                    value={props.issuesTotalCount.toLocaleString()}
                    label={props.issuesTotalCount === 1 ? 'Issue' : 'Issues'}
                    icon={faBug}
                />

            </SimpleGrid>

            <Box
                marginBottom="10"
            >

                {props.repositories && props.repositories.length > 0 && (

                    <React.Fragment>

                        <Divider
                            marginY="10"
                        />

                        <ProfileHeading>
                            Owned Repositories
                        </ProfileHeading>

                        <Text
                            marginBottom="5"
                            color="gray.600"
                        >
                            A list of repositories that the user owns.
                        </Text>

                        <SimpleGrid
                            columns={{
                                md: 2,
                                base: 1,
                            }}
                            spacing={5}
                        >

                            {props.repositories.map((repository) => {

                                if (!repository) {
                                    return null;
                                }

                                return (

                                    <RepositoryBox
                                        key={repository.id}
                                        id={repository.id || ''}
                                        name={repository.name || ''}
                                        description={repository.description || ''}
                                        url={repository.url || ''}
                                        stargazerCount={repository.stargazerCount || 0}
                                        updatedAt={repository.updatedAt || ''}
                                    />

                                );

                            })}

                        </SimpleGrid>

                    </React.Fragment>

                )}

                {props.topRepositories && props.topRepositories.length > 0 && (

                    <React.Fragment>

                        <Divider
                            marginY="10"
                        />

                        <ProfileHeading>
                            Top Repositories
                        </ProfileHeading>

                        <Text
                            marginBottom="5"
                            color="gray.600"
                        >
                            Repositories the user has contributed to, ordered by contribution rank, plus repositories the user has created.
                        </Text>

                        <SimpleGrid
                            columns={{
                                md: 2,
                                base: 1,
                            }}
                            spacing={5}
                        >

                            {props.topRepositories.map((repository) => {

                                if (!repository) {
                                    return null;
                                }

                                return (

                                    <RepositoryBox
                                        key={repository.id}
                                        id={repository.id || ''}
                                        name={repository.name || ''}
                                        description={repository.description || ''}
                                        url={repository.url || ''}
                                        stargazerCount={repository.stargazerCount || 0}
                                        updatedAt={repository.updatedAt || ''}
                                    />

                                );

                            })}

                        </SimpleGrid>

                    </React.Fragment>

                )}

            </Box>

        </React.Fragment>

    );

};

export default UserProfile;
