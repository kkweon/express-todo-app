const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const todoRoutes = require("./routes/todos");
const sassMiddleware = require("node-sass-middleware");

app.engine("pug", require("pug").__express);
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  sassMiddleware({
    src: path.join(__dirname, "scss"),
    dest: path.join(__dirname, "public"),
    outputStyle: "compressed",
    debug: true,
  }),
);
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function(req, res) {
  res.render("./index.pug");
});

app.use("/api/todos", todoRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, function() {
  console.log(`App is running at port http://localhost:${PORT}`);
});
