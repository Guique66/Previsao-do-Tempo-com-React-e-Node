const express = require('express')
const router = express.Router()
const axios = require('axios')

axiosLocalidades = axios.create({
    baseURL: 'https://servicodados.ibge.gov.br/api/v1/localidades/',
})

axiosPrevisaoDotempo = axios.create({
    baseURL: 'https://apiprevmet3.inmet.gov.br/previsao/',
})

router.route('/test')
    .get((req, res, next) => {
        res.json("Testando a primeira API do novo projeto")
    })

router.route('/municipios')
    .get((req, res, next) => {
        console.log('Chegou ', req.query.orderBy, req.query.filterField)
        let orderBy = req.query.orderBy
        let filterField = req.query.filterField
        let endpoint = ''
        if (orderBy == undefined)
            orderBy = 'nome'
        switch (filterField) {
            case "estados":
                endpoint = `${req.query.filterField}/${req.query.filterContent}/municipios`
                break
            default:
                endpoint = 'municipios'
                break
        }

        axiosLocalidades.get(endpoint, {
                params: {
                    orderBy: orderBy
                }
            })
            .then(response => {
                console.log('Chegou na resposta ', response.data.length)
                res.json(response.data)
            }).catch(error => {
                res.status(500).json(error)
            })
    })

router.route('/estados')
    .get((req, res, next) => {

        axiosLocalidades.get(`estados`)
            .then(response => {
                console.log('Chegou na resposta ', response.data.length)
                res.json(response.data)
            }).catch(error => {
                res.status(500).json(error)
            })
    })

router.route('/forecast')
    .get((req, res, next) => {
        let localidade = req.query.localidade
        if (localidade == undefined)
            res.status(500).json('Informe a localidade de acordo como padrao do IBGE.')
        axiosPrevisaoDotempo.get(`${localidade}`)
            .then(response => {
                let days = Object.keys(response.data[localidade])
                console.log('Teste ', days)
                let formatedResponse = {
                    dia: days[1],
                    uf: response.data[localidade][days[1]].manha.uf,
                    entidade: response.data[localidade][days[1]].manha.entidade,
                    previsao: {
                        manha: {
                            resumo: response.data[localidade][days[1]].manha.resumo
                        },
                        tarde: {
                            resumo: response.data[localidade][days[1]].tarde.resumo
                        }
                    }
                }
                res.json(formatedResponse)
            }).catch(error => {
                res.status(500).json(error)
            })
    })

module.exports = router