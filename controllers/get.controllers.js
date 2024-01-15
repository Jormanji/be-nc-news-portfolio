const {fetchTopics, fetchApiEndpoints} = require("../models/get.models")

exports.getTopics = (req, res, next) => {
    fetchTopics().then((topics) => {
        res.status(200).send({ topics });
    })
}

exports.getApiEndpoints = (req, res, next) => {
    fetchApiEndpoints().then((endpointDescriptions) => {
        res.status(200).send(endpointDescriptions)
    })
}
