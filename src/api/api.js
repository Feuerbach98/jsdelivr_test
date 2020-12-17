const REGISTRY_URL = `https://registry.npmjs.org/-/v1/search`;
const CORS_URL =`https://cors-anywhere.herokuapp.com/`;
const API_URL = `https://data.jsdelivr.com/v1/package/npm/`;

const request = (url ,param = '') => fetch(`${CORS_URL}${url}${param}`)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    return response.json();
  });

export const getPackagesFromServer = (query, size) => {
  const preparedQuery = query.replace(/\s+/g, '+').trim()

  return request(REGISTRY_URL,`?text=${preparedQuery}&size=${size}`);
};

export const getPackageFromServer = async (query) => {
  return {
    versions: await request(`${API_URL}/${query}`),
    rating: await request(`${API_URL}/${query}/stats`),
  };
};
