import React from 'react'
import axios from 'axios'
const useFetch = (url, options) => {

    const [loading, setLoading] = React.useState(true);
    const [result, setResult] = React.useState(null);
    const [error, setError] = React.useState(null);

   React.useEffect(() => {
        (async () => {
          try {
            const res = await axios.get(`${urlApiProducts}/helados`);
            const json = await res.data();
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
