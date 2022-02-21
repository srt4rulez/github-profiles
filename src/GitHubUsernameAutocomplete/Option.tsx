import React from 'react';
import {
    Box,
    Text,
    Avatar,
} from '@chakra-ui/react';
import type { OptionInterface } from 'src/types';

export type OptionProps = React.HTMLAttributes<HTMLLIElement>

const Option = (props: OptionProps, option: OptionInterface): JSX.Element => {

    return (

        // @ts-expect-error: chakra and mui html types are out of sync
        <Box
            as="li"
            {...props}
        >

            <Avatar
                name={option.name}
                src={option.avatarUrl}
                size="sm"
                marginRight="3"
                loading="lazy"
            />

            <Box>

                <Text
                    color="gray.800"
                >

                    {option.login}

                </Text>

                <Text
                    color="gray.500"
                    fontSize="sm"
                >

                    {option.name}

                </Text>

            </Box>

        </Box>

    );

};

export default Option;
