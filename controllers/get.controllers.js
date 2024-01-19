const articles = require("../db/data/test-data/articles");
const {fetchTopics, fetchApiEndpoints, fetchArticleById, fetchArticles, fetchArticleComments, fetchUsers} = require("../models/get.models")
const {fetchCommentCount} = require("../db/seeds/utils")

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
        return fetchCommentCount(articleId)
        .then((commentCount) => {
            const numberCommentCount = Number(commentCount)
            const articleWithCommentCount = {
                ...article, comment_count: numberCommentCount
            }
            res.status(200).send(articleWithCommentCount)
        })
    }).catch((err) => {
        next(err)
    })
}

exports.getArticles = (req, res, next) => {
    const { topic } = req.query

    fetchArticles(topic).then((articles) => {
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

exports.getUsers = (req, res, next) => {
    fetchUsers().then((users) => {
        res.status(200).send({users})
    }).catch((err) => {
        next(err)
    })
}