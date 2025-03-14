export type CommonAction<T = any> = () => Promise<ResponseEntity<T>> | ResponseEntity<T> | T;

export type ResponseEntity<T> = {
  code: number;
  message: string;
  data: T;
};
