import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

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

const Detail = (props) => { 
  const [count, setCount] = useState(0);
  const [alert, setAlert] = useState(true);
  const [val, setVal] = useState('');
  const [check, setCheck] = useState(true);

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
    console.log(2);

    return () => {
      // useEffect 동작 전에 실행되는 코드
      // ex) clean up function - 기존 타이머는 제거
      // 비효율적인 코드를 삭제

      // mount시 실행안됨
      // unmount시 실행됨
      console.log(1);
      clearTimeout(a);
    }
  });

  useEffect(() => {
    isNaN(val) === true ? setCheck(true) : setCheck(false);
  }, [val])

  const params = useParams();

  const data = props.shoes.find((x) => {
    return x.id == params.id;
  });

  return (
    <div className="container">
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
          <img src={`https://codingapple1.github.io/shop/shoes${parseInt(data.id) + 1}.jpg`} width="100%" alt="" />
        </div>
        {check === true ? <div>경고 : 숫자만 입력하세요</div> : null}
        <input type="text" onChange={(e) => {
          setVal(e.target.value);
        }}/>
        <div className="col-md-6">
          <h4 className="pt-5">{data.title}</h4>
          <p>{data.content}</p>
          <p>{data.price}원</p>
          <button className="btn btn-danger">주문하기</button> 
        </div>
      </div>
  </div>
  );
};

export default Detail;