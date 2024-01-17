const request = require("supertest");
const app = require("../app")
const db = require("../db/connection")
const seed = require("../db/seeds/seed")
const {topicData, userData, articleData, commentData} = require("../db/data/test-data/index");
const endpointsData = require("../endpoints.json");



beforeEach(() => seed({topicData, userData, articleData, commentData}))
afterAll(() => db.end())


describe("/api", () => {
    describe("/topics", () => {
        describe("GET", () => {
            test("200: sends an array of topics to the client", () => {
                return request(app)
                .get('/api/topics')
                .expect(200)
                .then((response) => {
                    expect(response.body.topics.length).toBe(3);
                    response.body.topics.forEach((topic) => {
                        expect(typeof topic.slug).toBe("string")
                        expect(typeof topic.description).toBe("string")
                    })
                })
            })
            test("404: returns a 404 'not found' message when endpoint is incorrectly spelt", () => {
                return request(app)
                .get('/api/topacs')
                .expect(404)
                .then((response) => {
                    expect(response.body.message).toBe("Not found")
                })
            })
        })
    })
    describe("GET", () => {
        test("200: sends an object describing all the available endpoints on the API", () => {
            return request(app)
            .get('/api')
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(endpointsData)
            })
        })
    })
    describe("/articles", () => {
        describe("/:article_Id", () => {
            test("200: sends an object containing the properties of the selected article", () => {
                return request(app)
                .get("/api/articles/1")
                .expect(200)
                .then((response) => {
                    expectedOutput = {
                        article_id: 1,
                        title: "Living in the shadow of a great man",
                        topic: "mitch",
                        author: "butter_bridge",
                        body: "I find this existence challenging",
                        created_at: "2020-07-09T20:11:00.000Z",
                        votes: 100,
                        article_img_url:
                          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
                      }
                    expect(response.body).toEqual(expectedOutput)
                })
            })
            test("400: send a 400 bad request when given an invalid data type in the id", () => {
                return request(app)
                .get("/api/articles/banana")
                .expect(400)
                .then((response) => {
                    expect(response.body.message).toBe("Bad request")
                })
            })
            test("404: send a 404 'not found' when given an id which doesn't currently exist", () => {
                return request(app)
                .get("/api/articles/100")
                .expect(404)
                .then((response) => {
                    expect(response.body.message).toBe("Not found")
                })
            })
        })
        describe("GET", () => {
            test("200: sends an array of article objects in descending order by date", () => {
                return request(app)
                .get("/api/articles")
                .expect(200)
                .then(( { body: {articles} } ) => {
                    expect(Array.isArray(articles)).toBe(true)
                    expect(articles).toBeSortedBy("created_at", {descending: true})
                    expect(articles.length).toEqual(13)
                    articles.forEach((article) => {
                        expect(typeof article.author).toBe("string")
                        expect(typeof article.title).toBe("string")
                        expect(typeof article.article_id).toBe("number")
                        expect(typeof article.topic).toBe("string")
                        expect(typeof article.created_at).toBe("string")
                        expect(typeof article.votes).toBe("number")
                        expect(typeof article.article_img_url).toBe("string")
                        expect(typeof article.comment_count).toBe("number")
                        expect(article).not.toHaveProperty("body")
                    })
                })
            })
        })
        describe("/:article_id", () => {
            describe("/comments", () => {
                describe("GET", () => {
                    test.only("200: responds with an array of comments for the given article_id", () => {
                        return request(app)
                        .get("/api/articles/3/comments")
                        .expect(200)
                        .then(({ body: {comments}}) => {
                            console.log(comments)
                            expect(comments).toBeSortedBy("created_at", {descending: true})
                            comments.forEach((comment) => {
                                expect(typeof comment.comment_id).toBe("number")
                                expect(typeof comment.votes).toBe("number")
                                expect(typeof comment.created_at).toBe("string")
                                expect(typeof comment.author).toBe("string")
                                expect(typeof comment.body).toBe("string")
                                expect(typeof comment.article_id).toBe("number")
                            })
                        })
                    })
                    test("400: responds with a bad request if given invalid id type", () => {
                        return request(app)
                        .get("/api/articles/banana/comments")
                        .expect(400)
                        .then((response) => {
                            expect(response.body.message).toBe("Bad request")
                        })
                    })
                    test("404: responds with a 'Not found' when given valid id type but article doesn't exist", () => {
                        return request(app)
                        .get("/api/articles/1000/comments")
                        .expect(404)
                        .then((response) => {
                            expect(response.body.message).toBe("Not found")
                        })
                    })
                    test("200: responds with an empty array when given a valid article but it contains no comments", () => {
                        return request(app)
                        .get("/api/articles/2/comments")
                        .expect(200)
                        .then(({ body: {comments}}) => {
                            expect(comments.length).toBe(0)
                        })
                    })
                })
            })
        })
    })
})