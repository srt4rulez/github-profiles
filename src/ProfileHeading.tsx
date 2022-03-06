import React from 'react';
import type { ReactNode } from 'react';
import {
    Heading,
} from '@chakra-ui/react';

export interface HeadingProps {
    children: ReactNode;
}

const ProfileHeading = (props: HeadingProps): JSX.Element => {

    return (

        <Heading
            as="h3"
            marginBottom="5"
            color="gray.700"
        >

            {props.children}

        </Heading>

    );

};

export default ProfileHeading;
