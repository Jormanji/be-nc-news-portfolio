const db = require("../db/connection")

exports.updateArticleVotes = (articleId, incVotes) => {
    return db.query(`
    UPDATE articles 
    SET votes = votes + $1 
    WHERE article_id = $2 
    RETURNING *`, [incVotes, articleId])
        .then((result) => {
            if (result.rows.length === 0) {
                return Promise.reject({ status: 404, message: "Not found" });
            } else {
                return result.rows[0];
            }
        });
};