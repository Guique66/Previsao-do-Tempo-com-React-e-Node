import React, { useState, useEffect } from 'react'
import api from '../services/api'
import Form from 'react-bootstrap/Form'
import GlobalSpinner from './GlobalSpinner'

function Municipios({ UF, municipioSelecionado }) {
    const [municipios, setMunicipios] = useState(null)
    console.log('UF dentro do Municipio ', UF)
    useEffect(() => {
        api.get(`/municipios`)
            .then(response => {
                setMunicipios(response.data)
            }).catch(error => {
                console.log(error)
            })
    }, [])

    if (!municipios)
        return (
                <GlobalSpinner/>
        )
    else
        return (
            <React.Fragment>
                <br></br>
                <Form>
                    <Form.Group>
                        <Form.Label>Município:</Form.Label>
                        <Form.Select aria-label="Default select example" onChange={(event) => { municipioSelecionado(event.target.value) }}>
                            <option value={undefined}>Selecione o município</option>
                            {!UF ? municipios.map(municipio => {
                                return (
                                    <option key={municipio.id} value={municipio.id}>{municipio.nome} - {municipio.microrregiao.mesorregiao.UF.sigla}</option>
                                )
                            }) : municipios.filter(municipio => municipio.microrregiao.mesorregiao.UF.sigla === UF).map(municipio => {
                                return (
                                    <option key={municipio.id} value={municipio.id}>{municipio.nome} - {municipio.microrregiao.mesorregiao.UF.sigla}</option>
                                )
                            })}
                        </Form.Select>
                    </Form.Group>
                </Form>
            </React.Fragment>
        );
}

export default Municipios;



