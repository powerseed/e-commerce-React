"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost/e-commerce',
  JWT_SECRET: process.env.JWT_SECRET || "somethingsecret",
  PAPPAL_CLIENT_ID: process.env.PAPPAL_CLIENT_ID || "sb"
};
exports["default"] = _default;