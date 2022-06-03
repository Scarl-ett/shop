import React from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { decrease, increase } from '../store/cartSlice';
import { changeAge, changeName } from '../store/userSlice';

const Cart = () => {
  // redux store 가져온다.
  let state = useSelector((state) => state);
  let cart = state.cart;

  // store.js에 요청을 보내주는 함수
  let dispatch = useDispatch();

  return (
    <div>
      <br/>
      <h2>{state.user.name}({state.user.age})님의 장바구니</h2>
      <button onClick={()=> {dispatch(changeAge(10))}}>나이먹기</button>
      <br/>
      <br/>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, idx) => {
            return (
              <tr key={item.id}>
                <td>{idx + 1}</td>
                <td>{item.name}</td>
                <td>{item.count}</td>
                <td>
                  <button onClick={() => {dispatch(decrease(item.id))}}>&nbsp;-&nbsp;</button>&nbsp;
                  <button onClick={() => {dispatch(increase(item.id))}}>+</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table> 
    </div>
  );
};

export default Cart;