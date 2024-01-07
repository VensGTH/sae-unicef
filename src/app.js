"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const crypto_1 = __importDefault(require("crypto"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const encryption_1 = require("./utils/encryption");
const compression_1 = __importDefault(require("compression"));
const NAMESPACE = 'Server';
const app = (0, express_1.default)();
const md5 = (string) => crypto_1.default.createHash('md5').update(string).digest('hex');
let setCache = (req, res, next) => {
    // here you can define period in second, this one is 5 minutes
    const period = 60 * 60;
    // you only want to cache for GET requests
    if (req.method == 'PUT') {
        res.set('Cache-control', `public, max-age=${period}`);
    }
    else {
        // for the other requests set strict no caching parameters
        res.set('Cache-control', 'no-store, max-age=0');
    }
    // remember to call next() to pass on the request
    next();
};
// now call the new middleware function in your app
app.use(setCache);
app.use((0, compression_1.default)({
    level: 9,
    memLevel: 9
}));
app.use(express_1.default.json());
//app.use(express_1.default.static(__dirname + '/frontend/'));
app.use((0, cors_1.default)());
/** Parse the body of the request */
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
/** Rules of our API */
app.use((req, res, next) => {
    let ts = Math.floor(new Date().getTime() / 1000).toString();
    let ticket = Date.now().toString().split('').reverse().join('');
    const ec = (0, encryption_1.enc)(req.url, ts);
    const dc = (0, encryption_1.dec)(ec);
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-ETHNIKI');
    res.header('X-KRONNUS', ts);
    res.header('X-FRUKTUS', ec);
    next();
});
/** Routes here */
app.get('/', function (req, res) {
    res.status(404).json({statusCode: 'PS503', message: "Down for maintenance"});
    //res.sendFile(path_1.default + 'index.html');
});

/** Error handling */
app.use((req, res, next) => {
    const error = new Error('Not found');
    res.status(404).json({
        message: error.message,
        type: '404'
    });
});
exports.default = app;
