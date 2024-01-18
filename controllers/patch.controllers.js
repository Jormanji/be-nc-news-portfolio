const {patchVoteCount, updateArticleVotes} = require("../models/patch.models")
const {fetchArticleById} = require("../models/get.models")

exports.updateVoteCount = (req, res, next) => {
    const article_id = req.params.article_id
    const {inc_votes} = req.body

    fetchArticleById(article_id).then((existingArticle) => {
        if(!existingArticle) {
            return res.status(404).send({ message: "Article not found"})
        }
        return updateArticleVotes(article_id, inc_votes)
    }).then((updatedArticle) => {
        res.status(200).send({ article: updatedArticle})
    }).catch((err) => {
        next(err)
    })
}