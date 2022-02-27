import React from 'react';
import {
    Box,
    Text,
    Link,
    Heading,
    Avatar,
} from '@chakra-ui/react';

export interface ProfileBoxProps {
    login: string;
    name: string;
    bio: string;
    avatarUrl: string;
    url: string;
}

const ProfileBox = (props: ProfileBoxProps): JSX.Element => {

    return (

        <Box
            display="flex"
            rounded="md"
            borderWidth="1px"
            borderColor="gray.300"
            backgroundColor="white"
            padding="5"
            flexDirection={{
                sm: 'row',
                base: 'column',
            }}
            alignItems="center"
        >

            <Avatar
                name={props.name}
                src={props.avatarUrl}
                size="2xl"
                marginRight={{
                    sm: 5,
                    base: 0,
                }}
                marginBottom={{
                    sm: 0,
                    base: 5,
                }}
                loading="lazy"
            />

            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
            >

                <Heading
                    size="lg"
                    color="gray.700"
                >
                    {props.name}
                </Heading>

                <Link
                    href={props.url}
                    isExternal={true}
                >

                    <Text
                        fontWeight="bold"
                    >
                        @{props.login}
                    </Text>

                </Link>

                <Text
                    color="gray.700"
                >
                    {props.bio}
                </Text>

            </Box>

        </Box>

    );

};

export default ProfileBox;
