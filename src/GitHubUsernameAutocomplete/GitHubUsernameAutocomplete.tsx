import React, { useRef, useState } from 'react';
import {
    Box,
    useDisclosure,
    useConst,
} from '@chakra-ui/react';
import type { AutocompleteInputChangeReason, AutocompleteProps } from '@mui/material';
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
import awesomeDebouncePromise from 'awesome-debounce-promise';
import type { SearchUserQuery } from 'src/generated/graphql';
import { SearchUserDocument } from 'src/generated/graphql';
import type { OptionInterface } from 'src/types';

export type GitHubUsernameAutocompleteProps = Partial<AutocompleteProps<OptionInterface, false, false, false>>

const GitHubUsernameAutocomplete = (props: GitHubUsernameAutocompleteProps): JSX.Element => {

    const [hasError, setHasError] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const [inputValue, setInputValue] = useState('');

    const [options, setOptions] = useState<Array<OptionInterface>>([]);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const client = useApolloClient();

    /**
     * Create a flag for fetching users. This can be set to false to prevent a debounced result
     * from returning when we want to stop debouncing.
     */
    const shouldSearchRef = useRef(false);

    const searchUsers = useConst(() => {
        return async(inputText: string, setLoading = false) => {
            if (!shouldSearchRef.current) {
                // this is basically like cancelling the debounce.
                return [];
            }

            setHasError(false);
            setIsLoading(setLoading);

            try {
                const results = await client
                    .query<SearchUserQuery>({
                        query: SearchUserDocument,
                        variables: {
                            query: `type:user ${inputText}`,
                        },
                    })
                ;

                if (results && ('data' in results) && ('search' in results.data)) {
                    const nodes = (results.data.search.nodes || []);

                    const users = nodes.filter((node) => {
                        if (node && node.__typename == 'User') {
                            return true;
                        }
                        return false;
                    });
                    return users as Array<OptionInterface>;
                }

                return [];
            } finally {
                setIsLoading(false);
            }
        };
    });

    const debouncedSearchUsers = useConst(() => awesomeDebouncePromise(searchUsers, 500));

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

    return (

        <Autocomplete<OptionInterface, false, false, false>
            id="github-username"
            onInputChange={handleInputChange}
            inputValue={inputValue}
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
            getOptionLabel={(option): string => option.login ? option.login : ''}
            isOptionEqualToValue={(option, value): boolean => option.id ? option.id === value.id : false}
            // Don't filter options, just return them as-is, since we're calling an API that filters them.
            filterOptions={(options): Array<OptionInterface> => options}
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
            {...props}
        />

    );

};

export default GitHubUsernameAutocomplete;
