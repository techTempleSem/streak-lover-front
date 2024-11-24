import React, { useState } from "react";
import axios from "axios";
import style from "./setting.module.scss"; // 스타일 적용
import { Button, Col, Container, Row } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Setting = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const changeSetting = async (event) => {
    event.preventDefault(); // 페이지 리로드 방지

    try{
      const data = await axios.post('http://localhost:8080/api/user/change',{
        "current_password" : currentPassword,
        "new_password" : newPassword,
        "confirm_password": confirmPassword
      });

      console.log(data.data);

      if(data.data.result.resultCode == 200) {
        alert("변경이 완료되었습니다!");
        navigate("/")
      }
    } catch(e){
      alert(e.response.data.result.resultDescription)
    }
  };

  return (
    <Container className={style.loginContext}>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="text-center">비밀번호 변경</h2>
          <Form onSubmit={changeSetting}>
            <Form.Group controlId="formBasicPrevPassword" className={style.form}>
              <Form.Label>현재 비밀번호</Form.Label>
              <Form.Control
                type="password"
                placeholder="현재 비밀번호를 입력하세요"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicNextPassword" className={style.form}>
              <Form.Label>변경할 비밀번호</Form.Label>
              <Form.Control
                type="password"
                placeholder="변경할 비밀번호를 입력하세요"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicConfirmPassword" className={style.form}>
              <Form.Label>비밀번호 확인</Form.Label>
              <Form.Control
                type="password"
                placeholder="비밀번호를 한번 더 입력하세요"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mt-3">
              로그인
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Setting;
