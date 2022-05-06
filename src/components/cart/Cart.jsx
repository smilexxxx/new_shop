import React from "react";
import { Container, Typography, Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";

import useStyles from "./styles";
import CartItem from "./cartitem/CartItem";

const Cart = ({
  cart,
  handleUpdateCartQty,
  handleRemoveFromCart,
  handleEmptyCart,
}) => {
  const classes = useStyles();

  const EmptyCart = () => (
    <Typography variant="subtitle1">
      You have nothing in your cart,{" "}
      <Link to="/" className={classes.link}>
        start adding some
      </Link>
      !
    </Typography>
  );
  const FilledCart = () => (
    <>
      <Grid container spacing={3}>
        {cart.line_items.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
            <CartItem
              item={item}
              onUpdateCartQty={handleUpdateCartQty}
              onRemoveFromCart={handleRemoveFromCart}
            />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant="h5">
          Subtotal: {cart.subtotal.formatted_with_symbol}
        </Typography>
        <div>
          <Button
            className={classes.emptyButton}
            size="large"
            type="button"
            variant="contained"
            color="secondary"
            onClick={handleEmptyCart}
          >
            Empty Cart
          </Button>
          <Button
            component={Link}
            to="/checkout"
            className={classes.checkoutButton}
            size="large"
            type="button"
            variant="contained"
            color="primary"
          >
            Checkout
          </Button>
        </div>
      </div>
    </>
  );

  if (!cart.line_items) return "loading...";
  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h5" gutterBottom>
        See what is in your cart
      </Typography>
      {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
};

export default Cart;
