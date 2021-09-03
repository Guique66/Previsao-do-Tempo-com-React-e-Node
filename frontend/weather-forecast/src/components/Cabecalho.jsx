import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

function Cabecalho({ titulo, subtitulo, imagem }) {
  return (
    <React.Fragment>
      <Row  className="text-center">
        <Col>
          <Image src={imagem} fluid/>
        </Col>
        </Row>
        <Row className="text-center">
        <Col>
          <h1>{titulo}</h1>
          <h2>{subtitulo}</h2>
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default Cabecalho;
