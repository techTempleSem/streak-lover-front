import axios from "axios";
import StreakContainer from "../../components/streakContainer/streakContainer";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../App";
import style from "./register.module.scss"

function Register() {
  const {isLogin, setIsLogin} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const navigate = useNavigate();

  const login = async (event) => {
    event.preventDefault(); // 페이지 리로드 방지
    if(password != passwordCheck) {
      alert("비밀번호를 다시 확인해 주세요")
      return;
    }

    const data = await axios.post('http://localhost:8080/open-api/user/register',{
      "name" : email,
      "password" : password
    })

    alert(data.data)

    if(data.data == '성공적으로 등록되었습니다!') {
      navigate("/login")
    }
  };

  return (
    <Container className={style.content}>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="text-center">로그인</h2>
          <Form onSubmit={login}>
            <Form.Group controlId="formBasicEmail" className={style.form}>
              <Form.Label>이메일</Form.Label>
              <Form.Control
                type="email"
                placeholder="이메일을 입력하세요"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className={style.form}>
              <Form.Label>비밀번호</Form.Label>
              <Form.Control
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className={style.form}>
              <Form.Label>비밀번호 확인</Form.Label>
              <Form.Control
                type="password"
                placeholder="비밀번호를 한번 더 입력하세요"
                value={passwordCheck}
                onChange={(e) => setPasswordCheck(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mt-3">
              회원가입
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;