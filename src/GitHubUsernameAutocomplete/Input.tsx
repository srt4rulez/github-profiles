import React from 'react';
import {
    FormControl,
    FormLabel,
    Input as ChakraInput,
    InputGroup,
    InputRightElement,
} from '@chakra-ui/react';
import type { AutocompleteRenderInputParams } from '@mui/material';

const Input = (params: AutocompleteRenderInputParams): JSX.Element => {

    return (

        <FormControl
            id={params.id}
            label="Search By Username"
            isDisabled={params.disabled}
            ref={params.InputProps.ref}
        >

            <FormLabel
                {...params.InputLabelProps}
            >

                Search by Username

            </FormLabel>

            <InputGroup
                size="lg"
            >

                <ChakraInput
                    id={params.id}
                    {...params.inputProps}
                    size="lg"
                    paddingRight="75px"
                    placeholder="Search by Username"
                />

                <InputRightElement
                    width="60px"
                    right="4"
                >
                    {params.InputProps.endAdornment}
                </InputRightElement>

            </InputGroup>

        </FormControl>

    );

};

export default Input;
