export interface IResponse<T> {
  result: 'ok' | 'error';
  data: T
}
