const { getCommentById } = require("../db/seeds/utils")
const {removeCommentById} = require("../models/delete.models")

exports.deleteCommentById = (req, res, next) => {
    const comment_id = req.params.comment_id

    getCommentById(comment_id).then((existingComment) => {
        return removeCommentById(comment_id)
    }).then((updatedComments) => {
        res.status(204).send(updatedComments)
    })
    .catch((err) => {
        next(err)
    })
}
