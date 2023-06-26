"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rlphash = exports.ripemd160FromArray = exports.ripemd160FromString = exports.ripemd160 = exports.sha256FromArray = exports.sha256FromString = exports.sha256 = exports.keccakFromArray = exports.keccakFromHexString = exports.keccakFromString = exports.keccak256 = exports.keccak = void 0;
var keccak_1 = require("ethereum-cryptography/keccak");
var createHash = require('create-hash');
var rlp = __importStar(require("rlp"));
var bytes_1 = require("./bytes");
var helpers_1 = require("./helpers");
/**
 * Creates Keccak hash of a Buffer input
 * @param a The input data (Buffer)
 * @param bits (number = 256) The Keccak width
 */
exports.keccak = function (a, bits) {
    if (bits === void 0) { bits = 256; }
    helpers_1.assertIsBuffer(a);
    switch (bits) {
        case 224: {
            return keccak_1.keccak224(a);
        }
        case 256: {
            return keccak_1.keccak256(a);
        }
        case 384: {
            return keccak_1.keccak384(a);
        }
        case 512: {
            return keccak_1.keccak512(a);
        }
        default: {
            throw new Error("Invald algorithm: keccak" + bits);
        }
    }
};
/**
 * Creates Keccak-256 hash of the input, alias for keccak(a, 256).
 * @param a The input data (Buffer)
 */
exports.keccak256 = function (a) {
    return exports.keccak(a);
};
/**
 * Creates Keccak hash of a utf-8 string input
 * @param a The input data (String)
 * @param bits (number = 256) The Keccak width
 */
exports.keccakFromString = function (a, bits) {
    if (bits === void 0) { bits = 256; }
    helpers_1.assertIsString(a);
    var buf = Buffer.from(a, 'utf8');
    return exports.keccak(buf, bits);
};
/**
 * Creates Keccak hash of an 0x-prefixed string input
 * @param a The input data (String)
 * @param bits (number = 256) The Keccak width
 */
exports.keccakFromHexString = function (a, bits) {
    if (bits === void 0) { bits = 256; }
    helpers_1.assertIsHexString(a);
    return exports.keccak(bytes_1.toBuffer(a), bits);
};
/**
 * Creates Keccak hash of a number array input
 * @param a The input data (number[])
 * @param bits (number = 256) The Keccak width
 */
exports.keccakFromArray = function (a, bits) {
    if (bits === void 0) { bits = 256; }
    helpers_1.assertIsArray(a);
    return exports.keccak(bytes_1.toBuffer(a), bits);
};
/**
 * Creates SHA256 hash of an input.
 * @param  a The input data (Buffer|Array|String)
 */
var _sha256 = function (a) {
    a = bytes_1.toBuffer(a);
    return createHash('sha256').update(a).digest();
};
/**
 * Creates SHA256 hash of a Buffer input.
 * @param a The input data (Buffer)
 */
exports.sha256 = function (a) {
    helpers_1.assertIsBuffer(a);
    return _sha256(a);
};
/**
 * Creates SHA256 hash of a string input.
 * @param a The input data (string)
 */
exports.sha256FromString = function (a) {
    helpers_1.assertIsString(a);
    return _sha256(a);
};
/**
 * Creates SHA256 hash of a number[] input.
 * @param a The input data (number[])
 */
exports.sha256FromArray = function (a) {
    helpers_1.assertIsArray(a);
    return _sha256(a);
};
/**
 * Creates RIPEMD160 hash of the input.
 * @param a The input data (Buffer|Array|String|Number)
 * @param padded Whether it should be padded to 256 bits or not
 */
var _ripemd160 = function (a, padded) {
    a = bytes_1.toBuffer(a);
    var hash = createHash('rmd160').update(a).digest();
    if (padded === true) {
        return bytes_1.setLengthLeft(hash, 32);
    }
    else {
        return hash;
    }
};
/**
 * Creates RIPEMD160 hash of a Buffer input.
 * @param a The input data (Buffer)
 * @param padded Whether it should be padded to 256 bits or not
 */
exports.ripemd160 = function (a, padded) {
    helpers_1.assertIsBuffer(a);
    return _ripemd160(a, padded);
};
/**
 * Creates RIPEMD160 hash of a string input.
 * @param a The input data (String)
 * @param padded Whether it should be padded to 256 bits or not
 */
exports.ripemd160FromString = function (a, padded) {
    helpers_1.assertIsString(a);
    return _ripemd160(a, padded);
};
/**
 * Creates RIPEMD160 hash of a number[] input.
 * @param a The input data (number[])
 * @param padded Whether it should be padded to 256 bits or not
 */
exports.ripemd160FromArray = function (a, padded) {
    helpers_1.assertIsArray(a);
    return _ripemd160(a, padded);
};
/**
 * Creates SHA-3 hash of the RLP encoded version of the input.
 * @param a The input data
 */
exports.rlphash = function (a) {
    return exports.keccak(rlp.encode(a));
};
//# sourceMappingURL=hash.js.map