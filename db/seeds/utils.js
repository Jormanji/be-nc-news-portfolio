const db = require("../connection")
const topics = require("../data/test-data/topics")

exports.convertTimestampToDate = ({ created_at, ...otherProperties }) => {
  if (!created_at) return { ...otherProperties };
  return { created_at: new Date(created_at), ...otherProperties };
};

exports.createRef = (arr, key, value) => {
  return arr.reduce((ref, element) => {
    ref[element[key]] = element[value];
    return ref;
  }, {});
};

exports.formatComments = (comments, idLookup) => {
  return comments.map(({ created_by, belongs_to, ...restOfComment }) => {
    const article_id = idLookup[belongs_to];
    return {
      article_id,
      author: created_by,
      ...this.convertTimestampToDate(restOfComment),
    };
  });
};

exports.getCommentById = (comment_id) => {
  return db.query(`
  SELECT * 
  FROM comments
  WHERE comment_id = $1`, [comment_id])
  .then((result) => {
    if(result.rows.length === 0){
      return Promise.reject({status: 404, message: "Not found"})
    } else {
    return result.rows[0]}
  })
}

exports.doesTopicExist = (targetTopic) => {
  for (const topic of topics) {
    if (topic.slug === targetTopic){
      return true
    } 
  }
  return false
}