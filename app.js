const express = require("express")
const app = express()
const {getTopics, getApiEndpoints, getArticleById, getArticles} = require("./controllers/get.controllers")

app.use(express.json())


app.get("/api/topics", getTopics)

app.get("/api", getApiEndpoints)

app.get("/api/articles/:article_id", getArticleById)

app.get("/api/articles", getArticles)

app.all("*", (req, res) => {
  res.status(404).send({message : "Not found"})
})


app.use((err, req, res, next) => {
  if (err.status && err.message) {
    res.status(err.status).send({ message: err.message });
  } else {
    next(err);
  }
});
app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ message: "Bad request" });
  } else {
    next(err);
  }
});
app.use((err, req, res, next) => {
  if (err.message === "Bad request") {
    res.status(400).send({ message: err.message });
  } else {
    next(err);
  }
});
app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).send({message: 'internal server error'})
})

module.exports = app