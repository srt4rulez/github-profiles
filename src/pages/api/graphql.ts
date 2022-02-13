import type { NextApiRequest, NextApiResponse } from 'next';
import type { AxiosError, AxiosResponse } from 'axios';
import axios from 'axios';
import process from 'node:process';

const handler = (
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> => {
    return axios({
        method: 'post',
        url: 'https://api.github.com/graphql',
        data: req.body as string,
        headers: {
            'Authorization': `bearer ${process.env.GITHUB_GRAPHQL_API_TOKEN || ''}`,
        },
    })
        .then((response) => {
            Object.keys(response.headers).forEach((key) => {
                res.setHeader(key, response.headers[key]);
            });
            res.json(response.data);
            res
                .status(response.status)
                .end()
            ;
        })
        .catch((error: AxiosError) => {
            if (error.response) {
                const response: AxiosResponse = error.response;

                Object.keys(response.headers).forEach((key) => {
                    res.setHeader(key, response.headers[key]);
                });
                res.json(response.data);
                res
                    .status(response.status)
                    .end()
                ;
            }
        })
    ;
};

export default handler;
