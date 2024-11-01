import axios from "axios";
import Header from "./components/header/header";
import Login from "./page/login/login";
import Streak from "./page/streakDetail/streakDetail";
import Container from 'react-bootstrap/Container';
import { Route, Routes } from 'react-router-dom';
import { createContext, useContext, useEffect, useState } from "react";
import StreakMain from "./page/streakMain/streakMain";
import StreakDetail from "./page/streakDetail/streakDetail";
import Register from "./page/register/register";
import style from "./App.module.scss"
import StreakRegister from "./page/streakRegister/streakRegister";


const LoginContext = createContext(null);
function App() {
  axios.defaults.withCredentials = true;
  const [isLogin, setIsLogin] = useState("");

  useEffect(() => {
    const user = async () => {
      const data = await axios.get('http://localhost:8080/api/user/user')
      setIsLogin(data.data.name ?? "");
    }
    user();
  }, [])

  return (
    <div>
      <LoginContext.Provider value={{isLogin, setIsLogin}}>
        <Header></Header>
        <Container className={style.content}>
          <Routes>
            <Route path='/streak/:id' element={<StreakDetail/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/' element={<StreakMain/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/streak-register' element={<StreakRegister/>} />
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
  return context;
}

export default App;
