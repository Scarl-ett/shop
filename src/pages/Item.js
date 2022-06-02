import { Col } from 'react-bootstrap';
import React from 'react';
import { Link } from 'react-router-dom';

const Item = ({item, idx}) => {
  return (
    <Col className="col-md-4">
      <Link to={`/detail/${idx}`}>
        <img src={process.env.PUBLIC_URL + '/img/shoes'+ (idx + 1) +'.jpg'} style={{width : "80%"}} alt=""/>
      </Link>
      <h4>{item.title}</h4>
      <p>{item.content}</p>
      <p>{item.price}</p>
  </Col>
  );
};

export default Item;