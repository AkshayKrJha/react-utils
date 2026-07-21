// Shared global error handler
export const handleResult = (res: any) => {
  if (res?.status === false || res?.success === false) {
    throw new Error(res?.message || "Problem processing request");
  }
};

// Unified fetch core using default parameters
async function apiFetch(url: string, config: RequestInit = {}) {
  try {
    const res = await fetch(url, config);
    const data = await res.json();
    handleResult(data);
    return data;
  } catch (err: any) {
    throw new Error(err?.message || "An unexpected network error occurred");
  }
}

// Reusable configurations helper for POST/PUT
const payloadConfig = (method: string, data: any, opt?: RequestInit) => ({
  ...opt,
  method,
  headers: { "Content-Type": "application/json", ...opt?.headers },
  body: JSON.stringify(data),
});

// Shorthand Core CRUD Helpers
export const getResult = (url: string, opt?: RequestInit) =>
  apiFetch(url, { method: "GET", ...opt });

export const deleteResult = (url: string, opt?: RequestInit) =>
  typeof window === "undefined" || window.confirm("Are you sure?")
    ? apiFetch(url, { method: "DELETE", ...opt })
    : Promise.resolve();

export const addAndFetchResult = (body: any, url: string, opt?: RequestInit) =>
  apiFetch(url, payloadConfig("POST", body, opt));

export const updateAndFetchResult = (
  body: any,
  url: string,
  opt?: RequestInit,
) => apiFetch(url, payloadConfig("PUT", body, opt));
