let axios = require('axios')

module.exports = {
    show: (coin) => {
        return axios.get(`http://coincap.io/page/${coin}`)
        .then(response => {

          return response;
        });
    },

    history: (coin, range) => {
        return axios.get(`http://coincap.io/history/${range}/${coin}`)
        .then(response => {
            return response;
        });
    }
}