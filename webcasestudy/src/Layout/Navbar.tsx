import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useAppSelector } from "../redux/redux-hooks";
import { logout } from "../redux/slices/authSlice";

function Header() {
  const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo);
  function handleLogout() {
    localStorage.clear();
    window.location.href = "/login"; // Tarayıcıyı /login adresine yönlendir
  }
  return (
    <Navbar expand="lg" className="bg-body-tertiary bg-opacity-50">
      <Container>
        <Navbar.Brand
          href="/"
          className="bg-secondary p-2 rounded bg-opacity-75"
        >
          <div className="d-flex justify-content-center">
            <div>WEB CASE STUDY</div>
            <div style={{ marginTop: "-5px", marginLeft: "2px" }}>
              <svg
                fill="#000000"
                height="25px"
                width="25px"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 512.003 512.003"
                xmlSpace="preserve"
              >
                <g>
                  <g>
                    <g>
                      <path
                        d="M76.802,409.602c-4.71,0-8.533,3.823-8.533,8.533s3.823,8.533,8.533,8.533h85.333c4.71,0,8.533-3.823,8.533-8.533
				s-3.823-8.533-8.533-8.533h-8.533v-204.8h8.533c4.71,0,8.533-3.823,8.533-8.533s-3.823-8.533-8.533-8.533H76.802
				c-4.71,0-8.533,3.823-8.533,8.533s3.823,8.533,8.533,8.533h8.533v204.8H76.802z M102.402,204.802h34.133v204.8h-34.133V204.802z"
                      />
                      <path
                        d="M8.535,170.668h494.933c3.814,0,7.159-2.526,8.209-6.195c1.041-3.661-0.469-7.578-3.712-9.591L260.499,1.282
				c-2.756-1.707-6.238-1.707-8.994,0L4.038,154.882c-3.243,2.014-4.753,5.931-3.712,9.591
				C1.375,168.142,4.721,170.668,8.535,170.668z M256.002,18.579l217.54,135.023H38.461L256.002,18.579z"
                      />
                      <path
                        d="M34.135,452.268c0,4.71,3.823,8.533,8.533,8.533h426.667c4.71,0,8.533-3.823,8.533-8.533c0-4.71-3.823-8.533-8.533-8.533
				H42.668C37.958,443.735,34.135,447.558,34.135,452.268z"
                      />
                      <path
                        d="M503.468,477.868H8.535c-4.71,0-8.533,3.823-8.533,8.533v17.067c0,4.71,3.823,8.533,8.533,8.533s8.533-3.823,8.533-8.533
				v-8.533h477.867v8.533c0,4.71,3.823,8.533,8.533,8.533s8.533-3.823,8.533-8.533v-17.067
				C512.002,481.691,508.179,477.868,503.468,477.868z"
                      />
                      <path
                        d="M213.335,409.602c-4.71,0-8.533,3.823-8.533,8.533s3.823,8.533,8.533,8.533h85.333c4.71,0,8.533-3.823,8.533-8.533
				s-3.823-8.533-8.533-8.533h-8.533v-204.8h8.533c4.71,0,8.533-3.823,8.533-8.533s-3.823-8.533-8.533-8.533h-85.333
				c-4.71,0-8.533,3.823-8.533,8.533s3.823,8.533,8.533,8.533h8.533v204.8H213.335z M238.935,204.802h34.133v204.8h-34.133V204.802z
				"
                      />
                      <path
                        d="M349.868,409.602c-4.71,0-8.533,3.823-8.533,8.533s3.823,8.533,8.533,8.533h85.333c4.71,0,8.533-3.823,8.533-8.533
				s-3.823-8.533-8.533-8.533h-8.533v-204.8h8.533c4.71,0,8.533-3.823,8.533-8.533s-3.823-8.533-8.533-8.533h-85.333
				c-4.71,0-8.533,3.823-8.533,8.533s3.823,8.533,8.533,8.533h8.533v204.8H349.868z M375.468,204.802h34.133v204.8h-34.133V204.802z
				"
                      />
                    </g>
                  </g>
                </g>
              </svg>
            </div>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
        <button
          className="btn btn-danger bg-danger bg-opacity-75"
          onClick={() => handleLogout()}
          hidden={basicUserInfo ? false : true}
        >
          Log Out
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-x-circle"
            viewBox="0 0 16 16"
            style={{marginTop:'-2px', marginLeft:'4px'}}
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
          </svg>
        </button>
      </Container>
    </Navbar>
  );
}

export default Header;
