import React from 'react'
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert'
import Card from 'react-bootstrap/Card'


function Test(props) {
    return (
      <React.Fragment>
        <Alert>
        <Card>
          <Card.Body>
        <Card.Title>{props.titulo}</Card.Title>
        <Card.Text>{props.texto}</Card.Text>
          </Card.Body>
        </Card>
        <Button className="text-center" variant='primary'>Clique aqui</Button>
        </Alert>
      </React.Fragment>
    );
  }
  
  export default Test;
  