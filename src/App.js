import { createContext, useEffect, useState } from 'react';
import { Container, Nav, Navbar, Row } from 'react-bootstrap';
import './App.css';
import bg from './img/bg.png';
import data from './data.js';
import Item from './pages/Item';
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom'
import Detail from './pages/Detail';
import Event from './Event';
import axios from 'axios';
import Cart from './pages/Cart';
import styled from 'styled-components';
import { useQueries, useQuery } from 'react-query';

// context = state 보관함
export let Context1 = createContext();

const Watched = styled.div`
  background-color: lightgray;
  padding : 10px;
`;

const App = () => {
  // let obj = {name : 'kim'};
  // localStorage.setItem('data', JSON.stringify(obj));
  // let 꺼낸거 = localStorage.getItem('data');
  // console.log(JSON.parse(꺼낸거).name);

  let [shoes, setShoes] = useState(data);
  let [재고, 재고변경] = useState([10, 11, 12]);
  let [count, setCount] = useState(2);
  let navigate = useNavigate();
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('watched') === null) {
      localStorage.setItem('watched', JSON.stringify([]))
    }
  }, []);

  // 성공/실패/로딩중 쉽게 파악가능
  let result = useQuery('name', () => {
    axios.get('https://codingapple1.github.io/userdata.json').then((response) => {
      return response.data
    });
  });

  result.data
  result.isLoading
  result.error 

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
            <Nav.Link onClick={() => {navigate('/cart')}}>Cart</Nav.Link>
            <Nav.Link onClick={() => {navigate(-1)}}>뒤로가기</Nav.Link>
          </Nav>
          {/* <Link to="/detail">상세페이지</Link>     */}
          <Nav className='ms-auto' style={{color : 'white'}}>반가워요 Kim</Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={
        <>      
          <div className='main-bg' style={{backgroundImage : 'url(' + bg + ')' }}></div>
          <br/><br/><br/>
          <div>
            <h5>최근 본 상품</h5>
            {JSON.parse(localStorage.getItem('watched')) && JSON.parse(localStorage.getItem('watched')).map((id) => {
              let idx = shoes.findIndex((x) => x.id === id);
              return <Watched>{shoes[idx].title}</Watched>
            })}
          <br/><br/><br/>
          </div>
          <Container>
            <Row>
              {shoes.map((item, idx) => {
                return <Item item={item} idx={idx} key={idx}/>
              })}
            </Row>
          </Container>
          {loading === true ? <div>로딩중</div> : null}
          <button onClick={() => {
            count > 3 ? alert('더보기 할 상품이 없습니다.') : 
              setLoading(true);
              axios.get(`https://codingapple1.github.io/shop/data${count}.json`).then((response) => {
                const copy = [...shoes, ...response.data];
                // setShoes(shoes.concat(response.data));
                setShoes(copy);
                setCount(count + 1);
                setLoading(false);
              }).catch(() => {
                console.log('실패함');
                setLoading(false);
              });

              // 서버로 데이터전송하는 post 요청
              // axios.post('/url', {name : 'park'});

              // ajax 요청을 여러개 - 두개다 성공했을때 then문 실행
              // Promise.all([axios.get('/url1'), axios.get('/url2')]).then(() => {});
          }}>더보기</button>
        </>
        } />
        <Route path="/detail/:id" element={
          <Context1.Provider value={{재고}}>
            <Detail shoes={shoes}/>
          </Context1.Provider>
        } />
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
        <Route path="/cart" element={<Cart />}></Route>
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
