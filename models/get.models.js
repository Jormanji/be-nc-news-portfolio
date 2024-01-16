const db = require("../db/connection")
const fs = require("fs/promises")

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
    return db.query('SELECT * FROM articles WHERE article_id = $1', [articleId])
    .then((result) => {
        if(result.rows.length === 0){
           return Promise.reject("Not found")
        } else {
        return result.rows[0]}
    })
}