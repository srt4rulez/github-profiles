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
