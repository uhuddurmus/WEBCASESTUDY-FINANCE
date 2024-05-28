import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useAppSelector } from '../redux/redux-hooks';
import { logout } from "../redux/slices/authSlice";

function Header() {
  const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo);
  function handleLogout(){
    localStorage.removeItem("userInfo");
    window.location.href = '/login'; // Tarayıcıyı /login adresine yönlendir
  }
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">WEB CASE STUDY</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        </Navbar.Collapse>
        <button className='btn btn-danger' onClick={()=>handleLogout()} hidden={basicUserInfo? false:true}>
          Log Out
        </button>
      </Container>
    </Navbar>
  );
}

export default Header;