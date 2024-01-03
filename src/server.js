"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
//import http from 'http';
const config_1 = __importDefault(require("./config/config"));
const logging_1 = __importDefault(require("./config/logging"));
const NAMESPACE = 'Server';
//const httpServer = http.createServer(app);
app_1.default.listen(config_1.default.server.port, () => logging_1.default.info(NAMESPACE, `Server is running http://${config_1.default.server.hostname}:${config_1.default.server.port}`));
