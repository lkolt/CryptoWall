'use strict'

const binance_api = require("binance-api-node").default

const get_value_or_null = (str) => str ? str : ''

class binance_client {
    constructor (config) {
        this.parse_config(config)
    }

    parse_config (config) {
        for (let exchange of config.exchanges) {
            if (exchange.name == "binance") {
                this.symbols = exchange.symbols.map(val => this.format_symbol(val))
                this.api_key = get_value_or_null(exchange.key)
                this.api_secret = get_value_or_null(exchange.secret)
            }
        }

        this.binance = binance_api({
            apiKey: this.api_key,
            apiSecret: this.api_secret
        })
    }

    format_symbol (symbol) {
        return symbol.replace("_", "")
    }

    async get_rates () {
        let prices = await this.binance.prices() 
        let res = {}
        for (let symbol of this.symbols) {
            res[symbol] = parseFloat(prices[symbol])
        }
        return res
    }

    async get_wallet () {
        let wallet = (await this.binance.accountInfo()).balances.reduce((acc, val) => { 
            let add = {}
            let balance = parseFloat(val.free) + parseFloat(val.locked)
            if (balance > 0) { 
                add[val.asset] = balance
            }
            return { ...acc, ...add }
        }, {})
        return wallet
    }

    async run () {
        let prices = await this.get_rates()
        let wallet = await this.get_wallet()
        return {
            prices: prices,
            wallet: wallet
        }
    }
}

module.exports = binance_client