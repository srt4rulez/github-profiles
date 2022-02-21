import React from 'react';
import {
    FormControl,
    FormLabel,
    Input as ChakraInput,
    InputGroup,
    InputRightElement,
    Spinner,
} from '@chakra-ui/react';
import type { AutocompleteRenderInputParams } from '@mui/material';

export interface InputProps extends AutocompleteRenderInputParams {
    isLoading: boolean;
}

const Input = (props: InputProps): JSX.Element => {

    return (

        <FormControl
            id={props.id}
            label="Search By Username"
            isDisabled={props.disabled}
            ref={props.InputProps.ref}
        >

            <FormLabel
                {...props.InputLabelProps}
            >

                Search by Username

            </FormLabel>

            <InputGroup
                size="lg"
            >

                <ChakraInput
                    id={props.id}
                    {...props.inputProps}
                    size="lg"
                    paddingRight="75px"
                    placeholder="Search by Username"
                />

                <InputRightElement
                    width="100px"
                    right="4"
                >
                    {props.isLoading && (
                        <Spinner
                            position="absolute"
                            right="60px"
                        />
                    )}
                    {props.InputProps.endAdornment}
                </InputRightElement>

            </InputGroup>

        </FormControl>

    );

};

export default Input;