import { Col } from 'react-bootstrap';
import React from 'react';

const Item = ({item, idx}) => {
  return (
    <Col className="col-md-4">
      <img src={process.env.PUBLIC_URL + '/img/shoes'+ (idx + 1) +'.jpg'} style={{width : "80%"}} alt=""/>
      <h4>{item.title}</h4>
      <p>{item.content}</p>
      <p>{item.price}</p>
  </Col>
  );
};

export default Item;