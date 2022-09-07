"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.credentials = exports.corsOptions = void 0;
const prodOrigins = [
    'https://peoplespow.com',
    'http://peoplespow.com',
    'https://www.peoplespow.com',
    'http://www.peoplespow.com',
    /\.peoplespow\.com$/,
    'http://localhost',
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'localho.st:3000',
];
exports.corsOptions = {
    origin: (origin, callback) => {
        if (prodOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by Cors"));
        }
    },
    optionsSuccessStatus: 200,
    credentials: true
};
const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if (prodOrigins.includes(origin)) {
        res.header("Access-Control-Allow-Credetials", true);
    }
    next();
};
exports.credentials = credentials;
//# sourceMappingURL=cors.js.map