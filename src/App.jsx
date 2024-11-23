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
import ExplanationPage from "page/explanationPage/explanationPage";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
// import { messaging } from './firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDHN-PdAwQaePOBreDNzgLDT8tTy4p3beY",
  authDomain: "streak-397c4.firebaseapp.com",
  projectId: "streak-397c4",
  storageBucket: "streak-397c4.firebasestorage.app",
  messagingSenderId: "1047481981982",
  appId: "1:1047481981982:web:49f5e1a1e1f002d421620f"
};

const app = initializeApp(firebaseConfig);

const requestPermission = async () => {
  try {
    console.log("get message")
    const messaging = getMessaging(app); // 안전하게 초기화 후 가져옴

    navigator.serviceWorker
    .register('/firebase-messaging-sw.js')
    .then((registration) => {
      console.log('Service Worker registered successfully.');
    })
    .catch((error) => {
      console.error('Service Worker registration failed:', error);
    });

    await Notification.requestPermission();
    const token = await getToken(messaging, { vapidKey: "BLBbeLXzxa8lidDhLc9x9hxpQoa7NnKolSKKDJxGRaDm2LPukgXPElGO1egwrF3rkyJBk9Qcwb9oZ3VlrM-8qxQ" });
    console.log("FCM Token:", token);
    const data = await axios.post('http://localhost:8080/api/user/firebase-token',{
      "token": token
    })
  } catch (error) {
    console.error("Error getting FCM token", error);
  }
};

const LoginContext = createContext(null);
function App() {
  axios.defaults.withCredentials = true;
  const [isLogin, setIsLogin] = useState("");

  useEffect(() => {
    if(isLogin){
      requestPermission()
    }
  },[isLogin])

  useEffect(() => {
    const user = async () => {
      const data = await axios.get('http://localhost:8080/api/user/user')
      setIsLogin(data.data.name ?? "");
      console.log(data.data.name)
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
            <Route path='/streak-edit/:id' element={<StreakRegister/>} />
            <Route path='/explanation' element={<ExplanationPage/>} />
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
