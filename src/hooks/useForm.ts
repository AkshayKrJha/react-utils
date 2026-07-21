import { handleResult } from "../utils/apiHelpers";
import { useCallback, useState } from "react";

export function useForm({
  initialData = {},
  onSubmit,
}: {
  initialData?: any;
  onSubmit: any;
}) {
  const [formData, setFormData] = useState<any>(initialData);
  const [loading, setLoading] = useState(false);

  function handleChange(e: any) {
    setFormData((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  //   before calling onSubmit, set loading to true, after onSubmit is done, set loading to false
  // assume submit logic to return result with success
  const handleSubmit = useCallback(
    function (postSuccess: any) {
      return async function (e: any) {
        e.preventDefault();
        alert(JSON.stringify(formData, null, 2));
        try {
          setLoading(true);
          const result = await Promise.resolve(onSubmit?.(formData));
          handleResult(result);
          alert(result?.message || "Record saved successfully");
          postSuccess?.();
        } catch (e: any) {
          alert(e?.message || "An error occurred");
        } finally {
          setLoading(false);
        }
      };
    },
    [formData, onSubmit],
  );

  return { formData, loading, handleChange, handleSubmit };
}
