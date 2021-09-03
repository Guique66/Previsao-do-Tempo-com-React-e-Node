import React, { useState, useEffect } from 'react'
import api from '../services/api'
import Form from 'react-bootstrap/Form'
import GlobalSpinner from './GlobalSpinner'

function Estados({ estadoSelecionado }) {
    const [estados, setEstados] = useState(null)
    useEffect(() => {
        api.get(`/estados`)
            .then(response => {
                setEstados(response.data)
            }).catch(error => {
                console.log(error)
            })
    }, [])

    if (estados === null)
        return (
            <GlobalSpinner/>
        )
    else
        return (
            <React.Fragment>
                <br></br>
                <h3 className="text-center">Selecione o estado e o município para obter a previsão do tempo</h3>
                <Form variant="outlined">
                    <Form.Label>Estado:</Form.Label>
                    <Form.Group>
                        <Form.Select aria-label="Default select example" onChange={(event) => { estadoSelecionado(event.target.value) }}>
                            <option value={""}>Todos os estados</option>
                            {estados.map(estado => {
                                return (
                                    <option key={estado.id} value={estado.sigla}>{estado.nome} - {estado.sigla}</option>
                                )
                            })}
                        </Form.Select>
                    </Form.Group>
                </Form>
            </React.Fragment>
        );
}

export default Estados;



