'use strict'

const axios = require("axios").default

class exchange_rates_api {
    constructor (config) {
        this.parse_config(config)
    }

    parse_config (config) {
        for (let exchange of config.exchanges) {
            if (exchange.name == "exchangeratesapi") {
                this.symbols = exchange.symbols
                this.url = exchange.url
            }
        }
    }

    async run () {
        return new Promise(resolve => {
            axios.get(this.url).then((response) => {
                let result = {}
                for (let symbol of this.symbols) {
                    result[symbol] = response.data.rates[symbol]
                }
                resolve({
                    prices: result
                })
            })  
        })
    }
}

module.exports = exchange_rates_api