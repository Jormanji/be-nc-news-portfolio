const db = require("../db/connection")
const fs = require("fs/promises")
const { doesTopicExist } = require("../db/seeds/utils")

exports.fetchTopics = () => {
    return db.query("SELECT * FROM topics").then((result) => {
        return result.rows
    })
}

exports.fetchApiEndpoints = () => {
    return fs.readFile(`${__dirname}/../endpoints.json`, "utf-8")
    .then((endpointsDescription) => {
        return JSON.parse(endpointsDescription);
    })
}

exports.fetchArticleById = (articleId) => {
    return db.query('SELECT *, to_char(created_at, \'Dy Mon DD YYYY HH24:MI:SS\') AS created_at FROM articles WHERE article_id = $1', [articleId])
    .then((result) => {
        if(result.rows.length === 0){
           return Promise.reject({status: 404, message: "Not found"})
        } else {
        return result.rows[0]}
    })
}

exports.fetchArticles = (topic) => {
    return doesTopicExist(topic)
    .then(topicExists => {
        if (topic && !topicExists) {
            return Promise.reject({ status: 404, message: "Not found" });
        }

    let query = `
    SELECT 
    articles.author, 
    articles.title,
    articles.article_id, 
    articles.topic, 
    to_char(articles.created_at, 'Dy Mon DD YYYY HH24:MI:SS') AS created_at, 
    articles.votes, 
    articles.article_img_url, 
    COUNT(comments.comment_id)::INT AS comment_count
    FROM articles
    LEFT JOIN comments ON articles.article_id = comments.article_id
    `;

    const queryParameters = [];

    if(topic){
        query+= `WHERE articles.topic = $1`
        queryParameters.push(topic)
    }

    query +=
    `GROUP BY articles.article_id
    ORDER BY created_at DESC`
    
    return db.query(query, queryParameters).then((result) => {
        return result.rows
        })
    })
}

exports.fetchArticleComments = (articleId) => {
    return db.query(`
        SELECT *
        FROM articles
        WHERE article_id = $1`, [articleId]
    ).then((articleResult) => {
        if (articleResult.rows.length === 0){
            return Promise.reject({ status: 404, message: "Not found"})
        }

    return db.query(
        `SELECT *
        FROM comments
        WHERE article_id = $1
        ORDER BY created_at DESC`,
        [articleId]
    ).then((result) => {
    if(result.rows.length === 0){
        return []
    } else {
        return result.rows}
    })
})
}

exports.fetchUsers = () => {
    return db.query("SELECT * FROM users").then((result) => {
        return result.rows
    })
}

