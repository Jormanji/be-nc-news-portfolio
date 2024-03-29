const db = require("../db/connection")

exports.uploadArticleComment = (articleId, username, body) => {
    return db.query(
        `INSERT INTO comments (article_id, author, body)
        VALUES
        ($1, $2, $3)
        RETURNING *`, [articleId, username, body] 
    )
    .then((result) => {
        return result.rows[0]
    })
}
