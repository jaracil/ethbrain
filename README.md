# ethbrain
Transforms a passphrase into a valid Ethereum/BSC/Polygon/... wallet

It uses the SHA256 Hash function to derivate private key from passphrase.

## Why?
I needed a way to regain access to my wallets without depending on any physical instrument.

## Install
`npm install -g ethbrain`

## Usage
```
Options:
-p              Show private key in hex format.
-q              Show private key QR code.
--help, -h      Show help.

Usage example:
ethbrain -p -q  #Show private key in hex format and QR code. 
```
