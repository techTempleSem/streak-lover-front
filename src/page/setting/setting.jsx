import React, { useEffect, useState } from "react";
import axios from "axios";
import style from "./setting.module.scss"; // 스타일 적용
import { Button, Col, Container, Row } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PasswordChange from "components/passwordChange/passwordChange";
import Lnb from "components/lnb/lnb";
import UserInfo from "components/userInfo/userInfo";
import Inquiry from "components/inquiry/inquiry";
import { useAuth } from "App";

const Setting = () => {
  const {isLogin} = useAuth();
  const [activeTab, setActiveTab] = useState("password");
  const navigate = useNavigate();

  useEffect(() => {
    if(!isLogin){
      alert("로그인을 진행해 주세요");
      navigate("/login")
    }
  },[])

  return (
    <div className={style.settings}>
      <Lnb onSelect={setActiveTab} active={activeTab} />
      <div className={style.settingsContent}>
        {activeTab === "password" && <PasswordChange />}
        {activeTab === "profile" && <UserInfo />}
        {activeTab === "inquiry" && <Inquiry />}
      </div>
    </div>
  );
};

export default Setting;
