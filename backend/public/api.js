const express = require('express')
const router = express.Router()
const axios = require('axios')

axiosLocalidades = axios.create({
    baseURL: 'https://servicodados.ibge.gov.br/api/v1/localidades/',
})

axiosPrevisaoDoTempo = axios.create({
    baseURL: 'https://apiprevmet3.inmet.gov.br/previsao/',
})

router.route('/test')
    .get((req, res, next) => {
        res.json("Testando a primeira API do novo projeto")
    })

router.route('/municipios')
    .get((req, res, next) => {
        axiosLocalidades.get('municipios', {
                params: {
                    orderBy: 'nome'
                }
            })
            .then(response => {
                res.json(response.data)
            }).catch(error => {
                res.status(500).json(error)
            })
    })

router.route('/estados')
    .get((req, res, next) => {
        axiosLocalidades.get('estados', {
                params: {
                    orderBy: 'nome'
                }
            })
            .then(response => {
                res.json(response.data)
            }).catch(error => {
                res.status(500).json(error)
            })
    })

router.route('/forecast')
    .get((req, res, next) => {
        let localidade = req.query.localidade
        if (localidade === undefined) {
            res.status(500).json('Informe a localidade de acordo com o padrao do IBGE.')
            return
        }

        axiosPrevisaoDoTempo.get(`${localidade}`)
            .then(response => {
                let days = Object.keys(response.data[localidade])
                formatedResponse = []
                days.forEach(element => {
                    if (response.data[localidade][element].manha !== undefined) {
                        let temp = {
                            dia: element,
                            uf: response.data[localidade][element].manha.uf,
                            entidade: response.data[localidade][element].manha.entidade,
                            previsao: {
                                manha: {
                                    resumo: response.data[localidade][element].manha.resumo,
                                    temp_min: response.data[localidade][element].manha.temp_min,
                                    temp_max: response.data[localidade][element].manha.temp_max,
                                    umid_max: response.data[localidade][element].manha.umidade_max,
                                    umid_min: response.data[localidade][element].manha.umidade_min,
                                    icone: response.data[localidade][element].manha.icone,
                                },
                                tarde: {
                                    resumo: response.data[localidade][element].tarde.resumo,
                                    temp_min: response.data[localidade][element].tarde.temp_min,
                                    temp_max: response.data[localidade][element].tarde.temp_max,
                                    umid_max: response.data[localidade][element].tarde.umidade_max,
                                    umid_min: response.data[localidade][element].tarde.umidade_min,
                                    icone: response.data[localidade][element].tarde.icone,
                                },
                                noite: {
                                    resumo: response.data[localidade][element].noite.resumo,
                                    temp_min: response.data[localidade][element].noite.temp_min,
                                    temp_max: response.data[localidade][element].noite.temp_max,
                                    umid_max: response.data[localidade][element].noite.umidade_max,
                                    umid_min: response.data[localidade][element].noite.umidade_min,
                                    icone: response.data[localidade][element].noite.icone,
                                }
                            }
                        }
                        formatedResponse.push(temp)
                    }
                })
                res.json(formatedResponse)
            }).catch(error => {
                console.log('Error ', error)
                res.status(500).json(error)
            })
    })

module.exports = router