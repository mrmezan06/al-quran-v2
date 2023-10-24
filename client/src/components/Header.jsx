import { LinkContainer } from 'react-router-bootstrap';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const Header = () => {
  const hadithIndex = useSelector((state) => state.hadithIndex);
  const { index } = hadithIndex;
  // console.log(index);

  return (
    <header>
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
                <LinkContainer to="/quran-pdf">
                  <NavDropdown.Item>AL Quran PDF</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/hadith-pdf">
                  <NavDropdown.Item>Hadith PDF</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/history-pdf">
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
              {/* About Us */}
              <LinkContainer to="/user/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
