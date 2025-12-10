import { useCallback, useEffect, useState } from "react";

export function useMockRequest<T>(action: () => Promise<{ data?: T; error?: string }>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();

  const run = useCallback(async () => {
    setLoading(true);
    setError(undefined);
    const { data: response, error: apiError } = await action();
    setLoading(false);
    if (apiError) {
      setError(apiError);
      return;
    }
    setData(response ?? null);
  }, [action]);

  useEffect(() => {
    run();
  }, [run]);

  return { data, loading, error, retry: run };
}


