import React, { PureComponent } from 'react';
//import { Test } from './MyNavbar.styles';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Image, Nav, Navbar } from 'react-bootstrap';
import Logo from '../../images/nike-logo-png-21192.png';

class NavigationBar extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return (
        <div className="card">
          <Navbar bg="light" variant="light">
          <Image src={Logo} width="200px" height="70px" />
          <Container>
            <Navbar.Brand href="/home">Home</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/user">Users</Nav.Link>
              <Nav.Link href="/categories">Categories</Nav.Link>
              <Nav.Link href="/group">Groups</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        </div>
    );
  }
}

NavigationBar.propTypes = {
  // bla: PropTypes.string,
};

NavigationBar.defaultProps = {
  // bla: 'test',
};

export default NavigationBar;
