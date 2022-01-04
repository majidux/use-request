/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useCallback } from 'react';
import axios from 'axios';
import { useStates } from 'use-states-react';
import debounce from 'lodash/debounce';
import type { ParameterType, ReturnType, StateType } from './types';

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
  const [state, setState] = useStates<StateType<T>>(initialState);
  const { response, error, isLoading, params } = state;
  const fetchData = async () => {
    setState({ isLoading: true });
    try {
      const result = await axios[method](url, { params });
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
