const express = require('express')
const router = express.Router()
const axios = require('axios')

router.route('/test')
    .get((req, res, next) => {
        res.json("Testando a primeira API do novo projeto")
    })

module.exports = router