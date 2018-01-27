let redis = require('redis')
let _ = require('lodash')
let axios = require('axios')

let redisClient = redis.createClient();
redisClient.on('error', (err) => {
    console.log("Redis Error " + err);
});

exports.request = function (key, apiCall, expire = 60) {
    let cacheResult;

    redisClient.get(key, (error, result) => {
        if (result) {
            cacheResult = JSON.parse(result);
        }
    })

    if (cacheResult) {
        return Promise.resolve({data: cacheResult});
    }

    return apiCall.then((response) => {
        redisClient.set(key, JSON.stringify(response.data), 'EX', expire);

        return response;
    })
}

exports.eurRate = function () {
    let fiat = axios.get(`https://api.fixer.io/latest?base=EUR`)

    return exports.request('fiat', fiat, 3600)
    .then(response => {
        let eurToUsd = _.get(response.data, "rates.USD");

        return eurToUsd;
    })
}