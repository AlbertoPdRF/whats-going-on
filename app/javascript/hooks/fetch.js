const fetchJsonOrError = (url, options = {}) => {
  if (!options.headers) {
    options.headers = {};
  }
  options.headers['Accept'] = 'application/json';
  options.headers['Content-Type'] = 'application/json';
  const csrfTokenElement = document.querySelector('meta[name=csrf-token]');
  if (csrfTokenElement) {
    options.headers['X-CSRF-Token'] = csrfTokenElement.content;
  }

  return fetch(url, options).then((response) =>
    response.json().then((json) => {
      if (!response.ok) {
        throw new Error(
          `${response.status}: ${response.statusText}\n${json.error}`
        );
      }

      return json;
    })
  );
};

export default fetchJsonOrError;
