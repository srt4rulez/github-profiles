export interface OptionInterface {
    id: string;
    login: string;
    name: string;
    isViewer: boolean;
    avatarUrl: string;
}

export interface SearchUserResult {
    search: {
        nodes: Array<OptionInterface>;
    };
}
