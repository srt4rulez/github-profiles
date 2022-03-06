import React from 'react';
import {
    Box,
    Text,
} from '@chakra-ui/react';
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface StatBoxProps {
    value: string;
    label: string;
    icon: IconDefinition;
}

const StatBox = (props: StatBoxProps): JSX.Element => {

    return (

        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            rounded="md"
            borderWidth="1px"
            borderColor="gray.300"
            backgroundColor="white"
            padding="5"
        >

            <Box
                as={FontAwesomeIcon}
                icon={props.icon}
                color="gray.700"
                fontSize="3xl"
            />

            <Text
                fontWeight="700"
                fontSize="3xl"
                color="gray.700"
            >

                {props.value}

            </Text>

            <Text
                color="gray.700"
            >

                {props.label}

            </Text>

        </Box>

    );

};

export default StatBox;
