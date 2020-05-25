import React from 'react'

const useFetch = (url, options) => {

    const [loading, setLoading] = React.useState(true);
    const [result, setResult] = React.useState(null);
    const [error, setError] = React.useState(null);

   React.useEffect(() => {
        (async () => {
          try {
            const res = await fetch.get(`${urlApiProducts}/helados`);
            const json = await res.json();
            setResult(json);
            setLoading(false);
          } catch (err) {
            setError(err);
            setLoading(false);
          }
        })();
      }, [options, url]);

    return (
       
       { loading, result, error }
       
    )
}

export default useFetch
