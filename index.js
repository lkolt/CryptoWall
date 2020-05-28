'use strict'

const config = require("./config.json")

const binance = require("./binance_client")
const exchange_rates_api = require("./exchangerates")
const excel_writer = require("./excel_writer")

let clients = []
clients.push(new binance(config))
clients.push(new exchange_rates_api(config))

let args = ['prices', 'wallet']

let run = async () => {
    let result = {}
    for (let arg of args) result[arg] = {}

    for (let client of clients) {
        let res = await client.run() 
        for (let arg of args) result[arg] = { ...result[arg], ...res[arg] }
    }

    if (config.format == "excel") {
        let excel = new excel_writer()
        for (let arg of args) excel.add_worksheet(arg, result[arg])
        excel.write()  
    } else {
        console.log(result)
    }
}

run()