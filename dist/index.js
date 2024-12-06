"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const gigantti_1 = __importDefault(require("./providers/gigantti"));
const power_1 = __importDefault(require("./providers/power"));
dotenv.config();
const scraper = async () => {
    const ntfyUrl = process.env.NTFY_URL;
    try {
        const giganttiResult = await (0, gigantti_1.default)("/puhelimet-tabletit-ja-alykellot/tabletit/samsung-galaxy-tab-s9-ultra-wifi-tabletti-12256-gb-grafiitti/630946");
        const poweresult = await (0, power_1.default)("/tietotekniikka/tabletit-ja-tarvikkeet/tablet-tietokoneet/samsung-galaxy-tab-s9-ultra-wifi-256-gt-graphite/p-2311617");
        const notification = [giganttiResult, poweresult];
        console.log({ notification });
        // if (ntfyUrl) {
        //   axios.post(ntfyUrl, notification);
        // }
    }
    catch (error) {
        console.log(error.message);
    }
};
scraper();
// setInterval(async() => {
//   await scraper();
// }, 600000);
