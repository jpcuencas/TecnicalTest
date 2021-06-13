

export default interface Pagination {
    page: number;
    cursor: string;
    limit: number;
    operation: string;
    total?: number;
    totalPages?: number;
  }