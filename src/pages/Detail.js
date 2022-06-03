import React, { useContext, useEffect, useState } from 'react';
import { Nav } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { addWatched } from '../store.js';
import { insert } from '../store/cartSlice.js';
import {Context1} from './../App.js';

const YellowBtn = styled.button`
  background : ${props => props.bg};
  color : ${props => props.bg == 'blue' ? 'white' : 'black'};
  padding : 10px;
`;

const NewBtn = styled(YellowBtn)`
  padding : 20px;
`;

const Box = styled.div`
  background: gray;
  padding : 20px;
`;

// class Detail2 extends React.Component {
//   componentDidMount() {

//   }
//   componentDidUpdate() {

//   }
//   componentWillUnmount() {

//   }
// }


// const TabContent = (props) => {
//   /*일반 if 조건문 */
//   if (props.tab == 0) {
//     return <div>내용0</div>
//   } 
//   if (props.tab == 1) {
//     return <div>내용1</div>
//   }
//   if (props.tab == 2) {
//     return <div>내용2</div>
//   }
// }

const TabContent = ({tab}) => {
  // /*일반 if 조건문 */
  // if (tab == 0) {
  //   return <div>내용0</div>
  // } 
  // if (tab == 1) {
  //   return <div>내용1</div>
  // }
  // if (tab == 2) {
  //   return <div>내용2</div>
  // }
  
  let [fade, setFade] = useState('');
  let {재고} = useContext(Context1);
  
  // 리액트 automatic batching 기능으로 state 똑같은 변경함수가 여러개 있을때 재랜더링은 마지막 한개만 재랜더링한다.
  useEffect(() => {
    let a = setTimeout(() => {setFade('end');}, 100)
    return () => {
      clearTimeout(a);
      setFade('');
    }
  }, [tab]);
  
  return (
    <div className={`start ${fade}`}>
      {[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tab]}
    </div>
  );  
}

const Detail = (props) => { 
  let dispatch = useDispatch();

  const params = useParams();

  const data = props.shoes.find((x) => {
    return x.id == params.id;
  });

  let {재고} = useContext(Context1);

  const [count, setCount] = useState(0);
  const [alert, setAlert] = useState(true);
  const [val, setVal] = useState('');
  const [check, setCheck] = useState(true);
  const [tab, setTab] = useState(0);
  let [fade, setFade] = useState('');

  useEffect(() => {
    let set = new Set(JSON.parse(localStorage.getItem('watched'))); 
    set.add(data.id);
    localStorage.setItem('watched', JSON.stringify([...set]));

    setFade('end');
    return () => {
      setFade('');
    }
  }, [])

  // html이 다 렌더링되고 useEffect 내용이 실행됨

  // useEffect 사용이유
  // 1. 재랜더링마다 코드 실행하고 싶으면 
  useEffect(() => {})
  // 2. mount시 1회 코드 실행하고 싶으면, []안에 변수 넣으면 그 상태가 변경될때마다 실행
  useEffect(() => {}, [])
  // 3. unmount시 1회 코드실행하고 싶으면
  useEffect(() => {
   return () => {} 
  })

  useEffect(() => {
    // mount, update 시 여기 코드 실행됨
    // 1. 실행이 오래걸리는 코드를 여기서 실행시키도록 한다.
    // 2. 서버에서 데이터 가져오는 작업
    // 3. 타이머 장착하는것

    // for (var i = 0; i < 10000; i++) {
    //   console.log(1);
    // }
    const a = setTimeout(() => {setAlert(false)}, 2000);
    // console.log(2);

    return () => {
      // useEffect 동작 전에 실행되는 코드
      // ex) clean up function - 기존 타이머는 제거
      // 비효율적인 코드를 삭제

      // mount시 실행안됨
      // unmount시 실행됨
      // console.log(1);
      clearTimeout(a);
    }
  });

  useEffect(() => {
    isNaN(val) === true ? setCheck(true) : setCheck(false);
  }, [val])

  return (
    <div className={`container start ${fade}`}>
      {alert == true ? <div className='alert alert-warning'>
        2초이내 구매시 할인
      </div> : null}
      {/* <Box></Box> */}
      {/* <YellowBtn bg={'yellow'}>버튼</YellowBtn>
      <YellowBtn bg={'blue'}>버튼</YellowBtn>
      <NewBtn bg={'orange'}>버튼</NewBtn> */}

      {/* {count} 
      <button onClick={() => {setCount(count+1)}}>버튼</button> */}
      <div className="row">
        <div className="col-md-6">
          <img src={`${process.env.PUBLIC_URL}/img/shoes${parseInt(data.id + 1)}.jpg`} width="100%" alt="" />
        </div>
        {/* {check === true ? <div>경고 : 숫자만 입력하세요</div> : null}
        <input type="text" onChange={(e) => {
          setVal(e.target.value);
        }}/> */}
        <div className="col-md-6">
          <h4 className="pt-5">{data.title}</h4>
          <p>{data.content}</p>
          <p>{data.price}원</p>
          <button className="btn btn-danger" onClick={() => {dispatch(insert({id : data.id, name : data.title, count : 1}))}}>주문하기</button> 
        </div>
      </div>
      <br/>
      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link onClick={() => {setTab(0)}} eventKey="link0">버튼0</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => {setTab(1)}} eventKey="link1">버튼1</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => {setTab(2)}} eventKey="link2">버튼2</Nav.Link>
        </Nav.Item>
      </Nav>
      <br/>
      {/* {tab === 0 ? <div>내용0</div> : null}
      {tab === 1 ? <div>내용1</div> : null}
      {tab === 2 ? <div>내용2</div> : null} */}
      <TabContent tab={tab}/>
  </div>
  );
};

export default Detail;