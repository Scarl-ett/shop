import { useState } from 'react';
import { Container, Nav, Navbar, Row } from 'react-bootstrap';
import './App.css';
import bg from './img/bg.png';
import data from './data.js';
import Item from './pages/Item';
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom'
import Detail from './pages/Detail';
import Event from './Event';

const App = () => {
  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate();

  return (
    <div className="App">
      {/* <Button variant="primary">Primary</Button> */}
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">React Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => {navigate('/')}}>Home</Nav.Link>
            <Nav.Link onClick={() => {navigate('/detail')}}>Detail</Nav.Link>
            <Nav.Link onClick={() => {navigate('/about')}}>About</Nav.Link>
            <Nav.Link onClick={() => {navigate('/event')}}>Event</Nav.Link>
            <Nav.Link onClick={() => {navigate(-1)}}>뒤로가기</Nav.Link>
          </Nav>
          {/* <Link to="/detail">상세페이지</Link>     */}
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<>      
        <div className='main-bg' style={{backgroundImage : 'url(' + bg + ')' }}></div>
          <br/><br/><br/>
          <Container>
            <Row>
              {data.map((item, idx) => {
                return <Item item={item} idx={idx} key={idx} />
              })}
            </Row>
          </Container>
          </>
        } />
        <Route path="/detail" element={<Detail />} />
        <Route path="/about" element={<About />}>
          <Route path="member" element={<div>회사멤버임</div>} />
          <Route path="location" element={<div>회사위치임</div>} />
        </Route>
        <Route path="/event" element={<Event />}>
          <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>} />
          <Route path="two" element={<div>생일기념 쿠폰받기</div>} />
        </Route>
        {/* <Route path="/about/member" element={<About />} />
        <Route path="/about/location" element={<About />} /> */}
        <Route path="*" element={<div>404 없는 페이지입니다.</div>} />
      </Routes>


    </div>
  );
}

function About () {
  return (
    <div>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
    </div>
  );
}

export default App;
