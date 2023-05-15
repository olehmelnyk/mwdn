import axios from 'axios';
import { useState, useEffect } from 'react';

const useAxios = ({
  endpoint,
  payload,
  method = 'GET',
}: {
  endpoint: string;
  payload?: object;
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);

  const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_API_URL,
  });

  useEffect(() => {
    (async () => {
      try {
        const response = await api.request({
          data: payload,
          method,
          url: endpoint,
        });

        setData(response.data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  return { data, error, loaded };
};

export default useAxios;
