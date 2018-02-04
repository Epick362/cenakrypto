let axios = require('axios')
let _ = require('lodash')
let cache = require('../cache')

class Front {
    static index() {
        return this.list()
        .then(coins => {
            return coins.splice(0, 10);
        })
    }

    static list(page = 1) {
        let coinList = axios.get(`http://coincap.io/front`);

        return Promise.all([
            cache.eurRate(),
            cache.request('front', coinList)
        ])
        .then((promises) => {
            let eurRate = promises[0];
            let coins = promises[1].data;

            coins = _.map(coins, (coin, index) => {
                coin.price = +(coin.price / eurRate).toFixed(2);
                coin.mktcap = +(coin.mktcap / eurRate).toFixed(2);
                coin.rank = index + 1;

                return coin;
            })

            return coins;
        })
    }

    static coins() {
        // Cryptocompare has richer data
        let coinsData = axios.get(`https://www.cryptocompare.com/api/data/coinlist`);

        // but we have to filter list by this one which we have historical data from
        let coinsListSupported = axios.get(`http://coincap.io/coins`);

        return Promise.all([
            cache.request('global-coinsdata', coinsData, 60 * 60 * 24), // 1 day cache
            cache.request('global-coinslist', coinsListSupported, 60 * 60 * 24) 
        ])
        .then((promises) => {
            let coinsData = promises[0].data.Data;
            let coinsList = promises[1].data;

            return _.reduce(coinsList, function(result, coin) {
                let match = coinsData[coin];

                if (match) {
                    result.push({
                        symbol: match.Symbol,
                        name: match.CoinName,
                        algorithm: match.Algorithm,
                        supply: match.TotalCoinSupply,
                        image: match.ImageUrl
                    });
                }

                return result;
            }, []);
        })
    }
}

module.exports = Front