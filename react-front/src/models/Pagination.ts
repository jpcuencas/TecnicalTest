

export default interface Pagination {
    page: number;
    cursor?: string;
    limit: number;
    operation: string;
    prePage?: number;
    nextPage?: number;
    total?: number;
    totalPages?: number;
  }