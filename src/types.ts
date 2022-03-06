export interface OptionInterface {
    id: string;
    login: string;
    name: string;
    avatarUrl: string;
}

export interface SearchUserResult {
    search: {
        nodes: Array<OptionInterface>;
    };
}

export interface Repository {
    id: string;
    name: string;
    description: string;
    url: string;
    stargazerCount: number;
    updatedAt: string;
}
