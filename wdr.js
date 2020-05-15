//------------------------------------------------------------------------------
//  PACKAGE REQUIREMENTS
//------------------------------------------------------------------------------
const fs = require("fs");
const os = require("os");
const ini = require("ini");
const express = require("express");
const cluster = require("cluster");
const config = ini.parse(fs.readFileSync("./config/config.ini", "utf-8"));


console.info("[wdr.js] Now Listening on port "+config.LISTENING_PORT+".");

// LOAD MAIN FOR EACH PROCESS (MANDATORY)
const MAIN = require("./modules/base/bot.js");

// DEFINE THE EXPRESS SERVER
var server = express().use(express.json({ limit: "1mb" }));

// CATCH REQUESTS AND SEND FOR PARSING
server.post("/", async (webhook, resolve) => {
  return MAIN.webhookParse(webhook.body);
});

// LISTEN TO THE SPECIFIED PORT FOR TRAFFIC
server.listen(config.LISTENING_PORT);
