import type {
    Handler,
    // HandlerContext,
    HandlerEvent,
    HandlerResponse,
} from '@netlify/functions';
import type {
    AxiosError,
    AxiosResponse,
} from 'axios';
import axios from 'axios';
import process from 'node:process';

const handler: Handler = async(event: HandlerEvent, /* context: HandlerContext */): Promise<HandlerResponse> => {
    return axios({
        method: event.httpMethod as ('get' | 'post'),
        url: 'https://api.github.com/graphql',
        data: event.body,
        headers: {
            'Authorization': `bearer ${process.env.GITHUB_GRAPHQL_API_TOKEN || ''}`,
        },
    })
        .then((response: AxiosResponse) => {
            return {
                statusCode: response.status,
                headers: response.headers,
                body: JSON.stringify(response.data),
            };
        })
        .catch((error: AxiosError) => {
            if (error.response) {
                const response: AxiosResponse = error.response;

                return {
                    statusCode: response.status,
                    headers: response.headers,
                    body: JSON.stringify(response.data),
                };
            }
            return {
                statusCode: 500,
            };
        })
    ;
};

export { handler };
