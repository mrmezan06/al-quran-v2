import { LinkContainer } from 'react-router-bootstrap';
import { Container, Nav, Navbar, NavDropdown, Toast } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../constants/BASE_URL';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const Header = () => {
  const user = useSelector((state) => state.userinfo.user);

  const navigate = useNavigate();
  const handleLogout = async () => {
    await axios
      .get(`${BASE_URL}/user/logout/${user?._id}`)
      .then((res) => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/user/login', { replace: true });
        toast.success('Logout Successfully');
      })
      .catch((err) => {
        Toast.error('Something went wrong');
      });
  };

  return (
    <header>
      <Toaster />
      <Navbar bg="info" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          {/* Al Quran */}
          <LinkContainer to="/">
            <Navbar.Brand>
              <i class="fas fa-book-open" style={{ color: 'white' }}></i> Al
              Quran
            </Navbar.Brand>
          </LinkContainer>

          {/* Hadith Dropdown */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              {/* <NavDropdown title="Hadith" id="hadithMenu">
                {index &&
                  index.map((item) => (
                    <LinkContainer
                      to={`/hadith/index/${item?.book_key}`}
                      key={item?.book_key}
                    >
                      <NavDropdown.Item className="text-capitalize">
                        {item?.nameEnglish}
                      </NavDropdown.Item>
                    </LinkContainer>
                  ))}
                <NavDropdown.Divider variant="dark" />
                <LinkContainer to="/hadith/index">
                  <NavDropdown.Item>Hadith Index</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown> */}
              {/* Video Section */}
              <NavDropdown title="Video" id="videoMenu">
                <LinkContainer to="/quran-video">
                  <NavDropdown.Item>AL Quran Video</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/hadith-video">
                  <NavDropdown.Item>Hadith Video</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/history-video">
                  <NavDropdown.Item>Islamic History Video</NavDropdown.Item>
                </LinkContainer>

                <NavDropdown.Divider variant="dark" />
                <LinkContainer to="/index-video">
                  <NavDropdown.Item>Video Index</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
              {/* PDF COLLECTION */}
              <NavDropdown title="PDF Collection" id="pdfMenu">
                <LinkContainer to="/Quran">
                  <NavDropdown.Item>AL Quran PDF</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/Hadith">
                  <NavDropdown.Item>Hadith PDF</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/History">
                  <NavDropdown.Item>Islamic History PDF</NavDropdown.Item>
                </LinkContainer>

                <NavDropdown.Divider variant="dark" />
                <LinkContainer to="/index-pdf">
                  <NavDropdown.Item>PDF Index</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>

              {/* About Us */}
              <LinkContainer to="/about">
                <Nav.Link>About US</Nav.Link>
              </LinkContainer>
              {/* Login */}

              {/* if user not then only login else Navdropdown show with Dashboard, Profile, Logout */}
              {!user && (
                <LinkContainer to="/user/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
              )}
              {user && user?.role === 'admin' && (
                <NavDropdown title="Profile" id="userMenu">
                  <LinkContainer to="/user/upload">
                    <NavDropdown.Item>Upload</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/user/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/user/dashboard">
                    <NavDropdown.Item>Dashboard</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/user/manage">
                    <NavDropdown.Item>Manage User</NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Divider variant="dark" />
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )}
              {user && user?.role === 'uploader' && (
                <NavDropdown title="Profile" id="userMenu">
                  <LinkContainer to="/user/upload">
                    <NavDropdown.Item>Upload</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/user/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/user/dashboard">
                    <NavDropdown.Item>Dashboard</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider variant="dark" />
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
