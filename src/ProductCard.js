import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardBlock,
  CardTitle,
  Button,
  ListGroup,
  ListGroupItem,
  CardDeck
} from "reactstrap";
import "./style.css";

class ProductCard extends Component {
  render() {
    let {
      id,
      name,
      product_main_image,
      parent_id,
      department,
      style_id
    } = this.props.product;
    let deleteToggle = this.props.currentUser.user_id.user_group_id;
    return (
      <div>
        <CardDeck>
          <Card
            bg="light"
            raised
            className="CardItem-main-card"
            onClick={() => this.props.enterProduct(id)}
          >
            <CardImg
              top
              width="100%"
              src={product_main_image}
              alt="Card image cap"
              className="ProductCard-img"
            />
            <CardBlock>
              <CardTitle>{name}</CardTitle>
              <ListGroup className="list-group-flush">
                <ListGroupItem>Product ID: {parent_id}</ListGroupItem>
                <ListGroupItem>Department: {department}</ListGroupItem>
                <ListGroupItem>Style ID: {style_id}</ListGroupItem>
              </ListGroup>
              {deleteToggle === 1 && (
                <Button
                  color="danger"
                  onClick={() => this.props.removeProduct(id)}
                >
                  Delete
                </Button>
              )}
            </CardBlock>
          </Card>
        </CardDeck>
      </div>
    );
  }
}

export default ProductCard;
