import { extendTheme } from '@chakra-ui/react';
import { deepmerge } from '@mui/utils';
import { createTheme } from '@mui/material/styles';

const chakraTheme = extendTheme({
    fonts: {
        body: '\'Rubik\', sans-serif',
        heading: '\'Rubik\', sans-serif',
    },
});

const muiTheme = createTheme();

const theme = deepmerge(chakraTheme, muiTheme);

export default theme;
