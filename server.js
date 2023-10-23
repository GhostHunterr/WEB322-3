/********************************************************************************
*  WEB322 – Assignment 03
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Farhan Sarang Student ID: 172963217 Date: 29/09/10
*
*  Published URL: 
*
********************************************************************************/

const express = require("express");
const legoData = require("./modules/legoSets");

const app = express();
const PORT = 8080;

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/view/home.html");
});

app.get("/lego/sets", (req, res) => {
  const theme = req.query.theme;
  if (theme) {
    legoData
      .getSetsByTheme(theme)
      .then((sets) => res.json(sets))
      .catch((error) => res.status(404).json({ error: error.message }));
  } else {
    legoData
      .getAllSets()
      .then((sets) => res.json(sets))
      .catch((error) => res.status(404).json({ error: error.message }));
  }
});

app.get("/lego/sets/:set_num", (req, res) => {
  const set_num = req.params.set_num;
  legoData
    .getSetByNum(set_num)
    .then((set) => res.json(set))
    .catch((error) => res.status(404).json({ error: error.message }));
});

app.get("/lego/sets/num-demo", (req, res) => {
  legoData
    .getSetByNum("001-1")
    .then((set) => res.json(set))
    .catch((error) => res.status(404).json({ error: error.message }));
});

app.get("/about", (req, res) => {
  res.sendFile(__dirname + "/view/about.html");
});

app.use((req, res) => {
  res.status(404).sendFile(__dirname + "/view/404.html");
});

legoData
  .initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.error("Error initializing Lego data:", error));
