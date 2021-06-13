
export default interface PaginationTest {
    page: number;
    pageSize: number;
    total?: number;
    totalPages?: number;
    prePage?: number;
    nextPage?: number;
    elements?: any[];
  }