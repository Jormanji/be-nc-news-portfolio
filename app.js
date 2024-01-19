const express = require("express")
const app = express()
const {getTopics, getApiEndpoints, getArticleById, getArticles, getArticleComments} = require("./controllers/get.controllers")
const {postArticleComment} = require("./controllers/post.controllers")
const {updateVoteCount} = require("./controllers/patch.controllers")
const {deleteCommentById} = require("./controllers/delete.controllers")

app.use(express.json())


app.get("/api/topics", getTopics)

app.get("/api", getApiEndpoints)

app.get("/api/articles/:article_id", getArticleById)

app.get("/api/articles", getArticles)

app.get("/api/articles/:article_id/comments", getArticleComments)

app.post("/api/articles/:article_id/comments", postArticleComment)

app.patch("/api/articles/:article_id", updateVoteCount)

app.delete("/api/comments/:comment_id", deleteCommentById)

app.all("*", (req, res) => {
  res.status(404).send({message : "Not found"})
})


app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ message: "Bad request" });
  } else {
    next(err);
  }
});
app.use((err, req, res, next) => {
  if (err.status && err.message) {
    res.status(err.status).send({ message: err.message });
  } else {
    next(err);
  }
});
app.use((err, req, res, next) => {
  if (err.code === "23503") {
    res.status(404).send({ message: "Not found" });
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