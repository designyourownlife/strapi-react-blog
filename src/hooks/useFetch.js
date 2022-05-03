import { useEffect, useState } from "react";

/**
 * Get full Strapi URL from path
 * @param {string} path Path of the URL
 * @returns {string} Full Strapi URL
 */
 export function getStrapiURL(path = "") {
  return `${
    process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
  }${path}`;
}

const useFetch = (url) => {
  const [response, setResponse] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch(url);

      if (!res.ok) {
        console.error(res.statusText);
        setError(`${res.status} — ${res.statusText}`);
        setLoading(false);
        throw new Error(`An error occured please try again`);
      }

      const json = await res.json();
      setResponse(json);
      setLoading(false);
    };

    fetchData();
  }, [url]);

  return { loading, error, response };
};

export default useFetch;
