import React, { useState } from 'react';
import {
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
import { gql, useApolloClient } from '@apollo/client';
import DropdownContainer from 'src/GitHubUsernameAutocomplete/DropdownContainer';
import Input from 'src/GitHubUsernameAutocomplete/Input';
import Option from 'src/GitHubUsernameAutocomplete/Option';
import type { OptionInterface } from 'src/types';
import useConstant from 'use-constant';
import awesomeDebouncePromise from 'awesome-debounce-promise';

interface SearchUserResult {
    search: {
        nodes: Array<OptionInterface>;
    };
}

const SEARCH_USER = gql`
    query SearchUser($query: String!) {
        search(query: $query, type: USER, first: 5) {
            nodes {
                ... on User {
                    id
                    login
                    name
                    isViewer
                    avatarUrl
                }
            }
        }
    }
`;

// Don't filter options, just return then as-is, since we're calling an API that filters them.
const filterOptions = (options: Array<OptionInterface>): Array<OptionInterface> => options;

const isOptionEqualToValue = (option: OptionInterface, value: OptionInterface): boolean => option.id === value.id;

const getOptionLabel = (option: OptionInterface): string => option.login;

const GitHubUsernameAutocomplete = (): JSX.Element => {

    const [isLoading, setIsLoading] = useState(false);

    const [inputValue, setInputValue] = useState('');

    const [value, setValue] = useState<OptionInterface | null>(null);

    const [options, setOptions] = useState<Array<OptionInterface>>([]);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const client = useApolloClient();

    const searchUsers = useConstant(() => {
        return async(inputText: string, setLoading = false) => {
            setIsLoading(setLoading);

            const results = await client
                .query<SearchUserResult>({
                    query: SEARCH_USER,
                    variables: {
                        query: `type:user ${inputText}`,
                    },
                })
            ;

            setIsLoading(false);

            if (results && ('data' in results) && ('search' in results.data)) {
                return results.data.search.nodes;
            }

            return [];
        };
    });

    const debouncedSearchUsers = useConstant(() => awesomeDebouncePromise(searchUsers, 500));

    const handleInputChange = async(event: React.SyntheticEvent, inputValue: string, reason: AutocompleteInputChangeReason): Promise<void> => {
        setInputValue(inputValue);

        console.log('reason', reason);

        if (inputValue.length === 0) {
            setOptions([]);
            return;
        }

        if (reason === 'reset') {
            const users = await searchUsers(inputValue, false);

            setOptions(users);

            return;
        }

        // TODO: Look into cancel debounce?
        const users = await debouncedSearchUsers(inputValue, true);

        setOptions(users);
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
                <FontAwesomeIcon
                    icon={faXmark}
                    size="sm"
                />
            )}
            popupIcon={(
                <FontAwesomeIcon
                    icon={faChevronDown}
                    size="sm"
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
                    />
                );
            }}
        />

    );

};

export default GitHubUsernameAutocomplete;
