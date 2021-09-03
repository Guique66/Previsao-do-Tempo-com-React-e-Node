import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Cabecalho from './components/Cabecalho'
import Estados from './components/Estados'
import Municipios from './components/Municipios';
import PrevisaoDoTempo from './components/PrevisaoDoTempo';

function App() {
  const [estadoSelecionado, setEstadoSelecionado] = useState(undefined)
  const [municipioSelecionado, setMunicipioSelecionado] = useState(undefined)
  console.log('MunicipioSelecionado ', municipioSelecionado)
  return (
    <Container>
      <Cabecalho titulo="Previsão do tempo com React, Node, Axios e Bootstrap" subtitulo="Projeto exemplo consumindo APIs do IBGE e do INMET"
        imagem="https://png.vector.me/files/images/6/8/688667/weather_icon_sunny_to_cloudy_preview" />
      <Estados estadoSelecionado={(dados) => setEstadoSelecionado(dados)} />
      <Municipios municipioSelecionado={(dados) => setMunicipioSelecionado(dados)} UF={estadoSelecionado} />
      <PrevisaoDoTempo municipio={municipioSelecionado} />
    </Container>
  );
}

export default App;
