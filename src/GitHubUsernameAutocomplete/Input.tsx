import React from 'react';
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input as ChakraInput,
    InputGroup,
    InputRightElement,
    Spinner,
} from '@chakra-ui/react';
import type { AutocompleteRenderInputParams } from '@mui/material';

export interface InputProps extends AutocompleteRenderInputParams {
    isLoading: boolean;
    isValid: boolean;
    errorMessage?: string;
}

const Input = (props: InputProps): JSX.Element => {

    return (

        <FormControl
            id={props.id}
            label="Search By Username"
            isDisabled={props.disabled}
            ref={props.InputProps.ref}
            isInvalid={!props.isValid}
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
                    paddingRight="100px"
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
                            color="purple.500"
                            size="sm"
                            title="Loading"
                        />
                    )}
                    {props.InputProps.endAdornment}
                </InputRightElement>

            </InputGroup>

            <FormErrorMessage>
                {props.errorMessage}
            </FormErrorMessage>

        </FormControl>

    );

};

export default Input;
