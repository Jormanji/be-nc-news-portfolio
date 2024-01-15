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
        })
    })
})