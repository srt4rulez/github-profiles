import React from 'react';
import {
    Box,
    Text,
    Link,
    Heading,
} from '@chakra-ui/react';
import { parseISO } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faStar,
} from '@fortawesome/free-solid-svg-icons';

export interface RepositoryBoxProps {
    id: string;
    name: string;
    description: string;
    url: string;
    stargazerCount: number;
    updatedAt: string;
}

const RepositoryBox = (props: RepositoryBoxProps): JSX.Element => {

    return (

        <Box
            display="flex"
            flexDirection="column"
            key={props.id}
            rounded="md"
            borderWidth="1px"
            borderColor="gray.300"
            backgroundColor="white"
            padding="5"
        >

            <Link
                href={props.url}
                isExternal={true}
            >

                <Heading
                    as="h4"
                    size="md"
                    color="gray.700"
                    marginBottom="2"
                >

                    {props.name}

                </Heading>

            </Link>

            <Text
                color="gray.700"
                fontSize="sm"
                marginBottom="2"
            >

                {props.description}

            </Text>

            <Box
                marginTop="auto"
            >

                <Box>

                    <Box
                        as={FontAwesomeIcon}
                        icon={faStar}
                        marginRight="1"
                        color="yellow.400"
                    />

                    {props.stargazerCount.toLocaleString()}

                </Box>

                <Text
                    color="gray.500"
                    fontSize="xs"
                >

                    Last Updated {parseISO(props.updatedAt).toLocaleDateString()}

                </Text>

            </Box>

        </Box>

    );

};

export default RepositoryBox;
