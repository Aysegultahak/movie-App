import { useEffect, useState } from 'react';

type WithResults = { results: any[] };

function useFetch<T>(fetchFunction: () => Promise<T>, autoFetch = true) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchFunction();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, []);



  return { data, loading, error, fetchData };
}

export default useFetch;