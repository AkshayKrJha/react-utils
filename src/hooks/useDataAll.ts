import { useEffect, useState, useCallback } from "react";
import { getResult, deleteResult } from "../utils/apiHelpers";

export function useDataAll<T = any>({
  link,
  trigger = true,
  options = {},
}: {
  link: string;
  trigger?: any;
  options?: RequestInit;
}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T[]>([]);

  // 1. Structural change manager. Handles automatic re-fetching safely.
  const serializedOptions = JSON.stringify(options);

  // 2. Beautifully simple callback signature with no bloated parameters
  const fetchTableData = useCallback(
    async (isActive: () => boolean = () => true) => {
      try {
        setLoading(true);
        const parsedOptions = JSON.parse(serializedOptions);
        const res = await getResult(link, parsedOptions);
        if (isActive()) setData(res?.data || res || []);
      } catch (err: any) {
        if (isActive()) alert(err.message || "An error occurred");
      } finally {
        if (isActive()) setLoading(false);
      }
    },
    [link, serializedOptions], // Triggers recreation only when link or options structurally change
  );

  // 3. Deletion handler safely using the current configuration snapshot
  const deleteItem = useCallback(
    (url: string, opt?: RequestInit) => async () => {
      try {
        const parsedOptions = JSON.parse(serializedOptions);
        const res = await deleteResult(url, { ...parsedOptions, ...opt });
        if (res) {
          alert(res?.message || "Record deleted successfully");
          await fetchTableData();
        }
      } catch (err: any) {
        alert(err?.message || "An error occurred during deletion");
      }
    },
    [fetchTableData, serializedOptions],
  );

  // 4. Clean, standard lifecycle trigger
  useEffect(() => {
    let active = true;
    if (trigger) fetchTableData(() => active);
    return () => {
      active = false;
    };
  }, [trigger, fetchTableData]); // Fired automatically by React whenever fetchTableData changes

  return [data, loading, fetchTableData, deleteItem] as const;
}
