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
