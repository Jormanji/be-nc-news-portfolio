const {fetchTopics, fetchApiEndpoints, fetchArticleById} = require("../models/get.models")

exports.getTopics = (req, res, next) => {
    fetchTopics().then((topics) => {
        res.status(200).send({ topics });
    })
}

exports.getApiEndpoints = (req, res, next) => {
    fetchApiEndpoints().then((endpointDescriptions) => {
        res.status(200).send(endpointDescriptions)
    })
}

exports.getArticleById = (req, res, next) => {
    const articleId = req.params.article_id
    fetchArticleById(articleId).then((article) => {
        res.status(200).send(article)
    })
}