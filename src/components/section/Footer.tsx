import { Container, Row, Col } from "react-bootstrap";
import './Footer.css';

function Footer() {
  return (
    <footer className="footer mt-5 py-4">
      <Container>
        <Row className="text-center text-md-start">
          
          <Col md={4} className="mb-3">
            <h5 className="fw-bold">pet-bit</h5>
            <p className="mb-0">
              귀여운 동물 피규어를 모아놓은 쇼핑몰 프로젝트입니다.
            </p>
            <p className="mb-0">
              본 사이트는 React로 제작되었습니다.
            </p>
          </Col>

          <Col md={4} className="mb-3">
            <h5 className="fw-bold">Contact</h5>
            <p className="mb-0">Email : xcyui@naver.com</p>
            <p className="mb-0">
              GitHub :
              <a 
                href="https://github.com/Jonghun-96" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-decoration-none text-reset ms-1"
              >
                github.com/Jonghun-96
              </a>
            </p>

            <h5 className="fw-bold mt-3">Tech Stack</h5>
            <p className="mb-0">
              React · Redux Toolkit · React Router · Bootstrap
            </p>
          </Col>

          <Col md={4} className="mb-3 text-md-end">
            <h5 className="fw-bold">Copyright</h5>
            <p className="mb-0">© 2026 pet-bit. All rights reserved.</p>
            <p className="mb-0">Made with ❤️ by JH</p>
          </Col>

        </Row>
      </Container>
    </footer>
  );
}

export default Footer;