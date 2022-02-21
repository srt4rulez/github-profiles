import React from 'react';
import { Box } from '@chakra-ui/react';

const DropdownContainer = (paperProps: React.HTMLAttributes<HTMLElement>): JSX.Element => {

    return (

        <Box
            position="relative"
            top="2px"
            boxShadow="1"
            rounded="md"
            borderWidth="1px"
            borderColor="gray.200"
        >

            {paperProps.children}

        </Box>

    );

};

export default DropdownContainer;
