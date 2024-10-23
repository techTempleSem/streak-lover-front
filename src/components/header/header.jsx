import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { useAuth } from '../../App';
import axios from 'axios';
import { ButtonGroup } from 'react-bootstrap';
import style from "./header.module.scss"

function Header() {
  const {isLogin, setIsLogin} = useAuth();
  const navigate = useNavigate();

  function login(){
    navigate("/login");
  }

  function register(){
    navigate("/register");
  }

  async function logout(){
    const data = await axios.get('http://localhost:8080/api/user/logout')
    alert("로그아웃 되었습니다!")
    setIsLogin("");
    navigate("/");
  }

  return (
    <Navbar expand="lg" className={`bg-body-tertiary ${style.headerContext}`} sticky="top">
      <Container>
        <Navbar.Brand href="/">Streak-Lover</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Streak</Nav.Link>
          </Nav>
          <Navbar.Text>
            {
              isLogin == "" ?
              (
                <>
                <ButtonGroup aria-label="Basic example">
                  <Button variant="primary" onClick={login}>로그인</Button>
                  <Button variant="primary" onClick={register}>회원가입</Button>
                </ButtonGroup>
                </>
              ) : (
                <>
                  {isLogin}
                  <Button variant="primary" onClick={logout} className={style.logout}>로그아웃</Button>
                </>
              )
            }
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;