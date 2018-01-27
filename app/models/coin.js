let axios = require('axios')
let _ = require('lodash')
let cache = require('../cache')

class Coin {
    static show(coin) {
        let coinDetails = axios.get(`http://coincap.io/page/${coin}`);

        return Promise.all([
            cache.eurRate(),
            cache.request('coin_'+coin, coinDetails)
        ])
        .then((promises) => {
            let coinData = promises[1].data;

            coinData.price = +(coinData.price/promises[0]).toFixed(2);
            coinData.volume = +(coinData.volume/promises[0]).toFixed(2); 
            coinData.market_cap = +(coinData.market_cap/promises[0]).toFixed(2); 

            return coinData;
        });
    }

    static history(coin, range) {
        let coinHistory = axios.get(`http://coincap.io/history/${range}/${coin}`);

        return Promise.all([
            cache.eurRate(),
            cache.request('coin_'+coin+'_'+range, coinHistory)
        ])
        .then((promises) => {
            let coinHistory = promises[1].data;

            coinHistory.price = _.map(coinHistory.price, (item) => {
                item[1] = +(item[1] / promises[0]).toFixed(2);
        
                return item;
            });

            return coinHistory;
        });
    }
}

module.exports = Coin