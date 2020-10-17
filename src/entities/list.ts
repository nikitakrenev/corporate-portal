export interface IListParams extends IPagination {
    searchString?: string;
    paged?: boolean;
    unpaged?: boolean;
    sort?: {
        sorted?: boolean;
        unsorted?: boolean;
    };
}

export interface IPagination {
    offset?: number;
    pageNumber?: number;
    pageSize?: number;
}
