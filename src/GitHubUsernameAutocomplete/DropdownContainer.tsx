import React from 'react';
import { Box } from '@chakra-ui/react';

export type DropdownContainerProps = React.HTMLAttributes<HTMLElement>

const DropdownContainer = (props: DropdownContainerProps): JSX.Element => {

    return (

        <Box
            position="relative"
            top="2px"
            boxShadow="1"
            rounded="md"
            borderWidth="1px"
            borderColor="gray.200"
            backgroundColor="white"
        >

            {props.children}

        </Box>

    );

};

export default DropdownContainer;
