import fetch from 'node-fetch';

const downloadFromURL = async (url) => {
  const response = await fetch(url);
  const body = await response.text();
  const headers = await response.headers;

  const headersObject = {};
  headers.forEach((value, key) => {
    headersObject[key] = value;
  });

  return { headersObject, body };
};

export { downloadFromURL };
