export default interface Pagination {
    page: string;
    cursor?: string;
    limit: number;
    operation: string;
    prePage?: number;
    nextPage?: number;
    total?: number;
    totalPages?: number;
};