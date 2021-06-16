

export default interface Pagination {
    page: number;
    current: string;
    limit: number;
    operation: string;
    total?: number;
    totalPages?: number;
};