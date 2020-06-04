"use strict";

var _express = _interopRequireDefault(require("express"));

var _config = _interopRequireDefault(require("./config"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _userRoutes = _interopRequireDefault(require("./routes/userRoutes"));

var _productRoutes = _interopRequireDefault(require("./routes/productRoutes"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _orderRoutes = _interopRequireDefault(require("./routes/orderRoutes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var mongodb_URL = _config["default"].MONGODB_URL;

_mongoose["default"].connect(mongodb_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})["catch"](function (error) {
  return console.log(error.reason);
});

var app = (0, _express["default"])();
app.use(_bodyParser["default"].json());
app.use("/api/users", _userRoutes["default"]);
app.use("/api/products", _productRoutes["default"]);
app.use("/api/orders", _orderRoutes["default"]);
app.get("/api/config/paypal", function (req, res) {
  res.send(_config["default"].PAPPAL_CLIENT_ID);
});
app.listen(5000);