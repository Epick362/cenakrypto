let axios = require('axios')
let _ = require('lodash')
let cache = require('../cache')

class Front {
    static index() {
        let coinList = axios.get(`http://coincap.io/front`);

        return Promise.all([
            cache.eurRate(),
            cache.request('front', coinList)
        ])
        .then((promises) => {
            let coins = promises[1].data.splice(0, 10);

            coins = _.map(coins, (coin) => {
                coin.price = +(coin.price / promises[0]).toFixed(2);

                return coin;
            })

            return coins;
        })
    }
}

module.exports = Front