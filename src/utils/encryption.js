"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.enc2 = exports.dec = exports.enc = void 0;
const crypto_1 = __importDefault(require("crypto"));
const enc = function (url, params) {
    params += `&url=${url}`;
    params += '&is_encryption=1';
    const PASSWORD = 'webapp1.0+202212';
    const cipher = crypto_1.default.createCipheriv('aes-128-cbc', PASSWORD, PASSWORD);
    return Buffer.concat([cipher.update(params), cipher.final()]).toString('base64');
};
exports.enc = enc;
const dec = function (params) {
    //params += '&is_encryption=1';
    try {
        const PASSWORD = 'webapp1.0+202212';
        const cipher = crypto_1.default.createDecipheriv('aes-128-cbc', PASSWORD, PASSWORD);
        let dec = cipher.update(params, 'base64url', 'utf-8'); //]).toString('base64');
        dec += cipher.final('utf-8');
        return dec;
    }
    catch (err) {
        console.log(err);
        throw new Error('error decrypting string');
        //return { error: true, msg: 'error decrypting string' };
    }
};
exports.dec = dec;
const enc2 = function (url) {
    let params = `url=${url}`;
    params += '&is_encryption=1';
    const PASSWORD = 'webapp1.0+202212';
    const cipher = crypto_1.default.createCipheriv('aes-128-cbc', PASSWORD, PASSWORD);
    return Buffer.concat([cipher.update(params), cipher.final()]).toString('base64url');
};
exports.enc2 = enc2;
