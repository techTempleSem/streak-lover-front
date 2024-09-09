import axios from "axios";
import Header from "./components/header/header";
import Login from "./page/login/login";
import Streak from "./page/streak/streak";
import Container from 'react-bootstrap/Container';
import { Route, Routes } from 'react-router-dom';

function App() {
  axios.defaults.withCredentials = true;

  return (
    <div>
      <Header></Header>
      <Container>
        <Routes>
          <Route path='/' element={<Streak/>} />
          <Route path='/login' element={<Login/>} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
