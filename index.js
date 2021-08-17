#!/usr/bin/env node
"use strict";
const promptly = require("promptly");
const crypto = require("crypto");
const { ethers } = require("ethers");
const chalk = require("chalk");
const QRCode = require('qrcode');


const helpString = `
ethbrain transforms a passphrase into a valid Ethereum/BSC/Polygon/... wallet.

Options:
-p              Show private key in hex format.
-q              Show private key QR code.
--help, -h      Show help.

Usage example:
ethbrain -p -q  #Show private key in hex format and QR code. 

`


async function getPass() {
    return await promptly.password("Passphrase:", { replace: "*" })
}

async function main() {
    let print_private_key = false;
    let print_qrcode = false;

    if (process.argv.indexOf("-p") !== -1) {
        print_private_key = true;
    }

    if (process.argv.indexOf("-q") !== -1) {
        print_qrcode = true;
    }

    if (process.argv.indexOf("-h") !== -1 || process.argv.indexOf("--help") !== -1) {
        console.log(helpString);
        process.exit(0);
    }

    let pass = await getPass();
    let priv = "0x" + crypto.createHash("sha256").update(pass).digest("hex");
    let wallet = new ethers.Wallet(priv)
    console.log(chalk.yellow("Wallet address: ") + chalk.greenBright(wallet.address));
    if (print_private_key) {
        console.log(chalk.yellow("Private Key: ") + chalk.grey(wallet.privateKey));
    } else {
        console.log(chalk.yellowBright("Private key not printed. Use -p flag to print it or -h to see all options"));
    }
    if (print_qrcode) {
        console.log(await QRCode.toString(wallet.privateKey, { type: 'terminal' }));
    }
    console.log("");
}


main();


