import { useState, useEffect, useCallback } from "react";
import { baseQuery } from "../api/baseQuery";

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // fetchData now accepts optional queryParams
  const fetchData = useCallback(
    async (queryParams) => {
      setLoading(true);
      try {
        let fetchUrl = url;
        if (queryParams && typeof queryParams === "object") {
          const search = new URLSearchParams(queryParams).toString();
          fetchUrl += fetchUrl.includes("?") ? "&" + search : "?" + search;
        }
        const res = await baseQuery(fetchUrl);
        if (!res.ok) throw new Error(`Status: ${res.status}`);
        const json = await res.json();
        setData(json);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    },
    [url]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // refetch can be called with queryParams: refetch({ key: value })
  return { data, loading, error, refetch: fetchData };
}
