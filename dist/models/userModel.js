"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var shippingSchema = {
  address: {
    type: String
  },
  city: {
    type: String
  },
  postal: {
    type: String
  },
  country: {
    type: String
  }
};
var userSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true,
    "default": false
  },
  shipping: shippingSchema
});

var userModel = _mongoose["default"].model("User", userSchema);

var _default = userModel;
exports["default"] = _default;