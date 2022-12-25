#!/usr/bin/env node

const Logger = require("./lib/Logger");
const Valetudo = require("./lib/Valetudo");

const valetudo = new Valetudo();

valetudo.robot.sendCommand("miIO.info").then(res =>  {
    print(res)
    valetudo.shutdown().then(res=>{
        process.exit(0);
    });
})

