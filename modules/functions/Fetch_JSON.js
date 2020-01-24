const fetch = require('node-fetch');

module.exports = (url) => {
  return new Promise(async function(resolve, reject) {
    fetch(url)
      .then(res => res.json())
      .then(json => {
        return resolve(json);
      });
  });
}
