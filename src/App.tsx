import React, { useState } from 'react';
import {
    Box,
    Container,
    Heading,
    Text,
    FormControl,
    FormLabel,
    Input,
    useDisclosure,
    InputGroup,
    InputRightElement,
    Avatar,
} from '@chakra-ui/react';
import {
    Autocomplete,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronDown,
    faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { css } from '@emotion/css';

interface OptionInterface {
    id: string;
    login: string;
    name: string;
    isViewer: boolean;
    avatarUrl: string;
}

const App = (): JSX.Element | null => {

    const [inputValue, setInputValue] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (

        <Container
            maxWidth="container.xl"
        >

            <Box
                as="header"
                marginTop="32"
            >

                <Heading
                    as="h1"
                    size="2xl"
                    color="gray.700"
                    textAlign="center"
                    marginBottom="4"
                >

                    GitHub Profiles

                </Heading>

                <Text
                    marginX="auto"
                    color="gray.600"
                    textAlign="center"
                    maxWidth="500px"
                >

                    Look up users on github to view their avatar, username, followers, repository count and top 4 repositories.

                </Text>

            </Box>

            <Box
                as="section"
                maxWidth="400px"
                marginX="auto"
                marginTop="5"
            >

                <Autocomplete
                    id="github-username"
                    onInputChange={(event, value): void => setInputValue(value)}
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
                    options={[
                        {
                            'id': 'MDQ6VXNlcjY2MTAyMA==',
                            'login': 'srt4',
                            'name': 'Spencer Thomas',
                            'isViewer': false,
                            'avatarUrl': 'https://avatars.githubusercontent.com/u/661020?v=4'
                        },
                        {
                            'id': 'MDQ6VXNlcjQ3MTg1NDI=',
                            'login': 'srt4rulez',
                            'name': 'Jake D',
                            'isViewer': true,
                            'avatarUrl': 'https://avatars.githubusercontent.com/u/4718542?u=b6f6c9dc2164afb3d138a7acda8bcf17f7d3ad5f&v=4'
                        },
                        {
                            'id': 'MDQ6VXNlcjQwMDM5ODE0',
                            'login': 'srt499',
                            'name': 'Brian Porter',
                            'isViewer': false,
                            'avatarUrl': 'https://avatars.githubusercontent.com/u/40039814?v=4'
                        },
                    ]}
                    open={isOpen}
                    onOpen={onOpen}
                    onClose={onClose}
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
                    getOptionLabel={(option: OptionInterface): string => option.login}
                    PaperComponent={(paperProps): JSX.Element => {
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
                    }}
                    renderOption={(optionProps, option: OptionInterface): JSX.Element => {
                        return (
                            // @ts-expect-error: chakra and mui html types are out of sync
                            <Box
                                as="li"
                                {...optionProps}
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
                    }}
                    renderInput={(params): JSX.Element => {
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

                                    <Input
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
                    }}
                />

            </Box>

        </Container>

    );

};

export default App;
