'use strict'

const binance_api = require("binance-api-node").default
const binance = binance_api()

class binance_client {
    constructor (config) {
        this.parse_config(config)
    }

    parse_config (config) {
        for (let exchange of config.exchanges) {
            if (exchange.name == "binance") {
                this.symbols = exchange.symbols
            }
        }
    }

    async run () {
        let prices = await binance.prices() 
        let res = {}
        for (let symbol of this.symbols) {
            res[symbol] = parseFloat(prices[symbol.replace("_", "")])
        }
        return res
    }
}

module.exports = binance_client