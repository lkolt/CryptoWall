'use strict'

const config = require("./config.json")
const binance = require("./binance_client")
const exchange_rates_api = require("./exchangerates")

let clients = []
clients.push(new binance(config))
clients.push(new exchange_rates_api(config))

let run = async () => {
    for (let client of clients) {
        console.log(await client.run())
    }
}

run()