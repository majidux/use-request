/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { useEffect, useCallback } from 'react';
import { useStates } from 'use-states-react';
import debounce from 'lodash/debounce';

interface ParameterType {
  url: string;
  method?: 'get' | 'post' | 'put' | 'delete';
}

interface ReturnType<T> {
  response?: T;
  error?: string;
  isLoading?: boolean;
  setParams?: (param: unknown) => void;
}

const initialState = {
  response: undefined,
  error: '',
  isLoading: false,
  params: undefined,
};

export const useRequest = <T>({
  url,
  method = 'get',
}: ParameterType): ReturnType<T> => {
  const [{ response, error, isLoading, params }, setState] =
    useStates<any>(initialState);
  const fetchData = async () => {
    setState({ isLoading: true });
    try {
      const result = await axios[method](`${url}`, { params });
      setState({ response: result.data });
    } catch (error) {
      setState({ error: error });
    } finally {
      setState({ isLoading: false });
    }
  };

  const setParams = useCallback(
    debounce((params) => setState({ params }), 500),
    []
  );

  useEffect(() => {
    fetchData();
  }, [params]);

  return { response, error, isLoading, setParams } as any;
};
