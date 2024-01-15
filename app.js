const express = require("express")
const app = express()
const {getTopics} = require("./controllers/get.controllers")
const e = require("express")

app.use(express.json())


app.get("/api/topics", getTopics)



app.use((err, req, res, next) => {
    if (err.code === "22P02"){
      res.status(400).send({message : "Bad request"});
    } else {
      next(err)
    }
  })
  app.use((err, req, res, next) =>{
    if (err.message === "Bad request"){
      res.status(400).send({message: err.message})
    } else {
        next(err)
    }
  })
  app.use(( req, res) => {
    res.status(404).send({ message: "Not found"})
})

module.exports = app

// THINGS THAT COULD GO WRONG WITH AN API/TOPICS GET:
// - Mispelling of topics e.g. topacs.
// - 