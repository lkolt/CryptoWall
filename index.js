'use strict'

const config = require("./config.json")

const binance = require("./binance_client")
const exchange_rates_api = require("./exchangerates")
const excel_writer = require("./excel_writer")

let clients = []
clients.push(new binance(config))
clients.push(new exchange_rates_api(config))

let run = async () => {
    let result = []
    for (let client of clients) {
        let res = await client.run()      
        result = { ...result, ...res }
    }
    if (config.format == "excel") {
        excel_writer.to_excel(result)  
    } else {
        console.log(result)
    }
}

run()