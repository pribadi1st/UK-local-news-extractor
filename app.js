const port = 9000;
const express = require("express");
const scrapper = require("./scrapper");
const app = express();
const path = require("path");
const router = express.Router();

router.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/views/index.html"));
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use("/", router);

app.post("/search", async (req, res) => {
  const result = await scrapper.scrapSite(req.body.keyword);
  res.send({
    result
  });
});

router.get("/test", async (req, res) => {
  res.send(result);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
