export interface IQueryObj {
  page?: string;
  limit?: string;
  sortBy?: string;
  order?: "asc" | "desc";
}

export interface IStudent {
  name: string;
  age: number;
  grade: string;
  email: string;
}
