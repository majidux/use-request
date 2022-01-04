export interface ParameterType {
  url: string;
  method?: 'get' | 'post' | 'put' | 'delete';
}

export interface ReturnType<T> {
  response?: T;
  error?: string;
  isLoading?: boolean;
  setParams?: (param: unknown) => void;
}

export interface StateType<T> {
  response?: T;
  error?: any;
  isLoading?: boolean;
  params?: any;
}
