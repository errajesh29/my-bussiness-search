const fetch = require('node-fetch');
const { SERVICE_URL, API_KEY } = require('./../config');

const options = {
    headers: {'Authorization': 'Bearer ' + API_KEY}
  };

  function buildQuery(params) {
  let query = '?';
  for (const [key, value] of Object.entries(params)) {
    query += key + '=' + value;
    query += '&';
  }
  return query;
}

function getBussinessAPI(queryParams) {
  const url = `${SERVICE_URL}/businesses/search` + buildQuery(queryParams);
  //console.log(url);
  return fetch( url, options);
}

function getBussinessDetailsAPI(id) {
  const url = `${SERVICE_URL}/businesses/${id}`;
  //console.log(url);
  return fetch( url, options);
}

function getBussinessReviewsAPI(id) {
  const url = `${SERVICE_URL}/businesses/${id}/reviews`;
  //console.log(url);
  return fetch( url, options);
}

module.exports = { getBussinessAPI, getBussinessDetailsAPI, getBussinessReviewsAPI };