import React, { useRef, useState } from 'react';
import {
    Box,
    useDisclosure,
} from '@chakra-ui/react';
import type { AutocompleteInputChangeReason } from '@mui/material';
import { Autocomplete } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronDown,
    faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { css } from '@emotion/css';
import { useApolloClient } from '@apollo/client';
import DropdownContainer from 'src/GitHubUsernameAutocomplete/DropdownContainer';
import Input from 'src/GitHubUsernameAutocomplete/Input';
import Option from 'src/GitHubUsernameAutocomplete/Option';
import type {
    OptionInterface,
    SearchUserResult,
} from 'src/types';
import useConstant from 'use-constant';
import awesomeDebouncePromise from 'awesome-debounce-promise';
import { loader } from 'graphql.macro';

const SEARCH_USER_QUERY = loader('./../graphql/SearchUser.graphql');

// Don't filter options, just return then as-is, since we're calling an API that filters them.
const filterOptions = (options: Array<OptionInterface>): Array<OptionInterface> => options;

const isOptionEqualToValue = (option: OptionInterface, value: OptionInterface): boolean => option.id === value.id;

const getOptionLabel = (option: OptionInterface): string => option.login;

const GitHubUsernameAutocomplete = (): JSX.Element => {

    const [hasError, setHasError] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const [inputValue, setInputValue] = useState('');

    const [value, setValue] = useState<OptionInterface | null>(null);

    const [options, setOptions] = useState<Array<OptionInterface>>([]);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const client = useApolloClient();

    /**
     * Create a flag for fetching users. This can be set to false to prevent a debounced result
     * from returning when we want to stop debouncing.
     */
    const shouldSearchRef = useRef(false);

    const searchUsers = useConstant(() => {
        return async(inputText: string, setLoading = false) => {
            if (!shouldSearchRef.current) {
                // this is basically like cancelling the debounce.
                return [];
            }

            setHasError(false);
            setIsLoading(setLoading);

            try {
                const results = await client
                    .query<SearchUserResult>({
                        query: SEARCH_USER_QUERY,
                        variables: {
                            query: `type:user ${inputText}`,
                        },
                    })
                ;

                if (results && ('data' in results) && ('search' in results.data)) {
                    return results.data.search.nodes;
                }

                return [];
            } finally {
                setIsLoading(false);
            }
        };
    });

    const debouncedSearchUsers = useConstant(() => awesomeDebouncePromise(searchUsers, 500));

    const handleInputChange = async(event: React.SyntheticEvent, inputValue: string, reason: AutocompleteInputChangeReason): Promise<void> => {
        setInputValue(inputValue);

        shouldSearchRef.current = true;

        if (inputValue.length === 0) {
            shouldSearchRef.current = false;

            setOptions([]);

            return;
        }

        if (reason === 'reset') { // aka selecting an option
            try { // Don't use the debounce here, since it's not when the user types.
                const users = await searchUsers(inputValue, false);

                setOptions(users);
            } catch (error) {
                console.error(error);
                setHasError(true);
            }

            return;
        }

        try {
            const users = await debouncedSearchUsers(inputValue, true);

            setOptions(users);
        } catch (error) {
            console.error(error);
            setHasError(true);
        }
    };

    const handleChange = (event: React.SyntheticEvent, newValue: OptionInterface | null): void => setValue(newValue);

    return (

        <Autocomplete<OptionInterface>
            id="github-username"
            onInputChange={handleInputChange}
            inputValue={inputValue}
            onChange={handleChange}
            value={value}
            classes={{
                clearIndicator: css({
                    marginRight: '5px !important',
                    backgroundColor: 'transparent !important',
                }),
                popupIndicator: css({
                    backgroundColor: 'transparent !important',
                }),
            }}
            options={options}
            open={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            loading={isLoading}
            clearIcon={(
                <Box
                    as={FontAwesomeIcon}
                    icon={faXmark}
                    size="sm"
                    color="gray.400"
                />
            )}
            popupIcon={(
                <Box
                    as={FontAwesomeIcon}
                    icon={faChevronDown}
                    size="sm"
                    color="gray.400"
                />
            )}
            getOptionLabel={getOptionLabel}
            isOptionEqualToValue={isOptionEqualToValue}
            filterOptions={filterOptions}
            PaperComponent={DropdownContainer}
            renderOption={Option}
            renderInput={(params): JSX.Element => {
                return (
                    <Input
                        {...params}
                        isLoading={isLoading}
                        isValid={!hasError}
                        errorMessage="An error occurred. Please refresh the page and try again."
                    />
                );
            }}
        />

    );

};

export default GitHubUsernameAutocomplete;
