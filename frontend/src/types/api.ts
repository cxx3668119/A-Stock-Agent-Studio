export type ApiResponse<T> = {
  success: boolean;
  data: T;
  trace_id: string;
};
