import React, {useState, useEffect} from 'react'
import api from '../services/api'
import Form from 'react-bootstrap/Form'

function Estados() {
    const [estados, setEstados] = useState([])
    console.log("Chegou na parada")
    useEffect(()=>{
        api.get(`/estados`)
        .then(response =>{
            setEstados(
                response.data.map(estado => {
                    return (
                        <option key={estado.id} value={estado.id}>{estado.nome} - {estado.sigla}</option>
                        )
                    })
                )
                console.log('Alterou o lance')  
            }).catch(error => {
                console.log(error)
            })
        },[])
        return (    
            <Form.Select aria-label="Default select example">
                <option>Open this select menu</option>
                {estados}
            </Form.Select>
        )
    }
  
export default Estados;
