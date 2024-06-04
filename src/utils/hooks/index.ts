import { useState, useEffect, useCallback, useRef } from 'react';

type UseRequestReturn<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
};

export function useRequest<T>(requestFunc: () => Promise<T>, initialValue?: T): UseRequestReturn<T> {
  const [data, setData] = useState<T | null>(initialValue ?? null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const cancelRef = useRef<(() => void) | null>(null);

  const refetch = useCallback(async () => {
    cancelRef.current?.(); // 取消上一次的请求（如果有的话）  
    setLoading(true);
    setError(null);

    try {
      const response = await Promise.race([
        requestFunc(),
        new Promise((_, reject) => {
          // 模拟请求超时  
          setTimeout(() => reject(new Error('Request timeout')), 5000);
        }),
      ]);
      setData(response as T | null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [requestFunc]);

  useEffect(() => {
    refetch(); // 初始请求  
  }, [refetch]); // 依赖refetch，确保在requestFunc变化时重新请求  

  return { data, loading, error, refetch };
}
