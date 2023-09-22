export interface IPagination {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

export class PaginatedResult<T> {
  data: T;
  pagination: IPagination;

  constructor(data: T, pagination: IPagination) {
    this.data = data;
    this.pagination = pagination;
  }
}
