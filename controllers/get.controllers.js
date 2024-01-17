const articles = require("../db/data/test-data/articles");
const {fetchTopics, fetchApiEndpoints, fetchArticleById, fetchArticles, fetchArticleComments} = require("../models/get.models")

exports.getTopics = (req, res, next) => {
    fetchTopics().then((topics) => {
        res.status(200).send({ topics });
    }).catch((err) => {
        next(err)
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
    }).catch((err) => {
        next(err)
    })
}

exports.getArticles = (req, res, next) => {
    fetchArticles().then((articles) => {
        res.status(200).send({articles})
    }).catch((err) => {
        next(err)
    })
}

exports.getArticleComments = (req, res, next) => {
    const articleId = req.params.article_id
    fetchArticleComments(articleId).then((comments) => {
        res.status(200).send({comments})
    }).catch((err) => {
        next(err)
    })
}
