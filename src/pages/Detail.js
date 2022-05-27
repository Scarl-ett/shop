import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const Detail = (props) => { 
  const params = useParams();

  const data = props.shoes.find((x) => {
    return x.id == params.id;
  });

  return (
    <div className="container">
    <div className="row">
      <div className="col-md-6">
        <img src={`https://codingapple1.github.io/shop/shoes${parseInt(data.id) + 1}.jpg`} width="100%" alt="" />
      </div>
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