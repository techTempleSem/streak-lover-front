import axios from "axios";
import StreakContainer from "../../components/streakContainer/streakContainer";

function Login() {

  async function login(){
    const data = await axios.post('http://localhost:8080/open-api/user/login',{
      "name" : "qwer",
      "password" : "asdf"
    })
    console.log(data);
  }

  return (
    <>
      <button onClick={login}>로그인</button>
    </>
  );
}

export default Login;