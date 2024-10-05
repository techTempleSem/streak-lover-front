import axios from "axios";
import Header from "./components/header/header";
import Login from "./page/login/login";
import Streak from "./page/streak/streak";
import Container from 'react-bootstrap/Container';
import { Route, Routes } from 'react-router-dom';
import { createContext, useContext, useState } from "react";


const LoginContext = createContext(null);
function App() {
  axios.defaults.withCredentials = true;
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div>
      <LoginContext.Provider value={{isLogin, setIsLogin}}>
        <Header></Header>
        <Container>
          <Routes>
            <Route path='/' element={<Streak/>} />
            <Route path='/login' element={<Login/>} />
          </Routes>
        </Container>
      </LoginContext.Provider>
    </div>
  );
}

export const useAuth = () => {
  const context = useContext(LoginContext)
  if(context == null) {
    throw new Error("NOT AUTH")
  }
  console.log(context);
  return context;
}

export default App;
