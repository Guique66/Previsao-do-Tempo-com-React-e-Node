import Container from 'react-bootstrap/Container';
import Test from './components/Test'
import Estados from './components/Estados'
import Municipios from './components/Municipios'

function App() {
  return (
    <Container>
      <Test titulo="Este e o titulo" texto="Este e um texto qualquer. Veremos se vai pegar a formatacao do Bootstrap"/> 
      <Estados />
      <Municipios/>
    </Container>
    
  );
}

export default App;
