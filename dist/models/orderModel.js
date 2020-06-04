"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var shippingSchema = new _mongoose["default"].Schema({
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  postal: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  }
});
var orderItemSchema = new _mongoose["default"].Schema({
  qty: {
    type: Number,
    required: true
  },
  productId: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  }
});
var paymentSchema = {
  paymentMethod: {
    type: String,
    required: true
  }
};
var orderSchema = new _mongoose["default"].Schema({
  user: {
    type: _mongoose["default"].Schema.ObjectId,
    ref: "User",
    required: true
  },
  orderItems: [orderItemSchema],
  shipping: shippingSchema,
  payment: paymentSchema,
  total: {
    type: Number,
    required: true
  },
  isPaid: {
    type: Boolean,
    required: true,
    "default": false
  },
  paidAt: {
    type: Date
  },
  isDelivered: {
    type: Boolean,
    required: true,
    "default": false
  },
  deliveredAt: {
    type: Date
  }
}, {
  timestamps: true
});

var orderModel = _mongoose["default"].model("Order", orderSchema);

var _default = orderModel;
exports["default"] = _default;