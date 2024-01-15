const request = require("supertest");
const app = require("../app")
const db = require("../db/connection")
const seed = require("../db/seeds/seed")
const {topicData, userData, articleData, commentData} = require("../db/data/test-data/index");

beforeEach(() => seed({topicData, userData, articleData, commentData}))
afterAll(() => db.end())


describe("api", () => {
    describe("topics", () => {
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
})