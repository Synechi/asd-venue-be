"use strict";

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _User = _interopRequireDefault(require("./models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
const port = 4000;

const router = _express.default.Router();

_dotenv.default.config();

app.use((0, _cors.default)());
app.use(_bodyParser.default.json());

_mongoose.default.connect("mongodb+srv://" + process.env.USER_Name + ":" + process.env.PWORD + "@venuedb-yhi2b.mongodb.net/test?retryWrites=true&w=majority");

const connection = _mongoose.default.connection;
connection.once("open", () => {
  console.log("Connection to MongoDB established successfully");
});
router.route("/user/:id").get((req, res) => {
  _User.default.findByID(req.params.id, (err, user) => {
    if (err) console.log(err);else res.json(user);
  });
});
app.use("/", router);
app.listen(port, () => console.log("Express sever running on port " + port));