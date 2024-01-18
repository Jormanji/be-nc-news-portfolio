const {uploadArticleComment} = require("../models/post.models")

exports.postArticleComment = (req, res, next) => {
    const article_id = req.params.article_id
    const username = req.body.author
    const body = req.body.body
    if (username.length === 0 || body.length === 0){
        return res.status(400).send({ message: "Bad request"})
    } else {
    uploadArticleComment(article_id, username, body)
.then(comment => {
    res.status(201).send(comment);
})
.catch((err) => {
    next(err)
    })
}}


