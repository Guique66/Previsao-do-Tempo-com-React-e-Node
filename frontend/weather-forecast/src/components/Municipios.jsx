import React, {useState, useEffect} from 'react'
import api from '../services/api'
import Form from 'react-bootstrap/Form'

function Municipios() {
    const [municipios, setMunicipios] = useState([])
    console.log("Chegou na parada")
    useEffect(()=>{
        api.get(`/municipios`)
        .then(response =>{
            console.log('response ', response.data[1])
            setMunicipios(
                response.data.map(municipio => {
                    return (
                        <option key={municipio.id} value={municipio.id}>{municipio.nome} - {municipio.uf}</option>
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
                {municipios}
            </Form.Select>
        )
    }
  
export default Municipios;
