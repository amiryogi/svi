import { useState, useEffect, useCallback } from 'react';

export const useFetch = (fetchFn, dependencies = [], immediate = true) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(immediate);
    const [error, setError] = useState(null);

    const execute = useCallback(async (...args) => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetchFn(...args);
            setData(response.data);
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [fetchFn]);

    useEffect(() => {
        if (immediate) {
            execute();
        }
    }, [...dependencies, immediate]);

    const refetch = useCallback(() => execute(), [execute]);

    return { data, loading, error, execute, refetch };
};

export default useFetch;
