import Header from "./components/header/header";
import Streak from "./page/streak/streak";
import Container from 'react-bootstrap/Container';

function App() {
  return (
    <div>
      <Header></Header>
      <Container>
        <Streak></Streak>
      </Container>
    </div>
  );
}

export default App;
