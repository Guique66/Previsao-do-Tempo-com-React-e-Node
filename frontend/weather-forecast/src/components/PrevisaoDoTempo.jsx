import React, { useState, useEffect } from 'react'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import api from '../services/api'
import TabPane from 'react-bootstrap/esm/TabPane'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'

function PrevisaoDoTempo({ municipio }) {
  const [previsao, setPrevisao] = useState(undefined)
  useEffect(() => {
    console.log('Vai chamar a API ', municipio)
    api.get(`/forecast`, {
      params: {
        localidade: municipio
      }
    }).then(response => {
      console.log('Resposta ', response.data)
      setPrevisao(response.data)
    }).catch(error => {
      console.log(error)
    })
  }, [municipio])

  return (
    <React.Fragment>
      <Tabs
        defaultActiveKey="0"
        transition={false}
        id="noanim-tab-example"
        className="m-3">
        {!previsao ? <div></div> :
          previsao.map((dias, index) => {
            return (
              <Tab key={dias.dia} eventKey={index} title={dias.dia}>
                <TabPane>
                  <Row>
                    <Col>
                      <h5>Manhã:</h5>
                      <p><img src={dias.previsao.manha.icone} alt="Previsao do tempo" />{dias.previsao.manha.resumo}</p>
                      <p>Temperatura: {dias.previsao.manha.temp_min} min {dias.previsao.manha.temp_max} max</p>
                      <p>Umidade: {dias.previsao.manha.umid_min} min {dias.previsao.manha.umid_max} max</p>
                    </Col>
                    <Col>
                      <img src={dias.previsao.tarde.icone} alt="Previsao do tempo" />
                      <strong>Tarde:</strong> {dias.previsao.tarde.resumo} <br></br>
                      Min: {dias.previsao.tarde.temp_min} Max: {dias.previsao.tarde.temp_max}<br></br>
                    </Col>
                    <Col>
                      <img src={dias.previsao.noite.icone} alt="Previsao do tempo" />
                      <strong>Noite:</strong>{dias.previsao.noite.resumo} <br></br>
                      Min: {dias.previsao.noite.temp_min} Max: {dias.previsao.noite.temp_max}
                    </Col>
                  </Row>
                </TabPane>
              </Tab>
            )
          })}
      </Tabs>
    </React.Fragment>
  );
}

export default PrevisaoDoTempo;



