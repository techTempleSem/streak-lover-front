import axios from "axios";
import StreakContainer from "../../components/streakContainer/streakContainer";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../App";
import style from "./login.module.scss"

function Login() {
  const {isLogin, setIsLogin} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = async (event) => {
    event.preventDefault(); // 페이지 리로드 방지

    const data = await axios.post('http://localhost:8080/open-api/user/login',{
      "name" : email,
      "password" : password
    })

    if(data.data == 'YES') {
      setIsLogin(email);
      navigate("/")
    }
  };

  return (
    <Container className={style.loginContext}>
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

            <Button variant="primary" type="submit" className="w-100 mt-3">
              로그인
            </Button>
            <div className={style.password}>
              <a href="/password">비밀번호을 잊었나요?</a>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;