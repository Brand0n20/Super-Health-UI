/* eslint-disable react-hooks/exhaustive-deps */
import { React, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ShareIcon from '@material-ui/icons/Share';
import StarIcon from '@material-ui/icons/Star';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import styles from './ProductCard.module.css';
import { useCart } from '../checkout-page/CartContext';
import { fetchRatingAverageByProductId } from '../product-page/ReviewService';
import customToast from '../customizable-toast/customToast';

/**
 * @name useStyles
 * @description Material-ui styling for ProductCard component
 * @return styling
 */
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: '56.25%'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

/**
 * @name ProductCard
 * @description displays single product card component
 * @param {*} props product
 * @return component
 */
const ProductCard = ({
  product, setProductInfo, setIsOpen, updateUserTime
}) => {
  const classes = useStyles();
  const [ratingAverage, setRatingAverage] = useState(null);
  const [apiError, setApiError] = useState();
  const { dispatch } = useCart();
  const onAdd = () => {
    updateUserTime();
    customToast('The product is successfully added to cart!', 'success');
    dispatch({
      type: 'add',
      product: {
        id: product.id,
        title: product.name,
        price: product.price,
        imageSrc: product.imageSrc,
        description: product.description,
        quantity: 1
      }
    });
  };

  const modalAction = () => {
    setProductInfo(product);
    setIsOpen(true);
  };

  useEffect(() => {
    fetchRatingAverageByProductId(product.id, setRatingAverage, setApiError);
  }, []);

  return (
    <Card className={classes.root}>
      <div
        className={styles.modalAction}
        onClick={modalAction}
        role="button"
        tabIndex="0"
        onKeyPress={modalAction}
      >
        <CardHeader
          avatar={(
            <Avatar
              aria-label="demographics"
              className={classes.avatar}
            >
              {product.demographic.charAt(0)}
            </Avatar>
          )}
          action={(
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          )}
          title={product.name}
          subheader={`${product.demographic} ${product.category} ${product.type}`}
        />
        <CardMedia
          className={classes.media}
          image={product.imageSrc}
          title="placeholder"
        />
        <CardContent>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {product.description}
          </Typography>
          <br />
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
          >
            Price: $
            {product.price.toFixed(2)}
          </Typography>
        </CardContent>
      </div>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          aria-label="add to shopping cart"
          data-testid="addToCart"
          onClick={onAdd}
        >
          <AddShoppingCartIcon />
        </IconButton>
        {!apiError && ratingAverage !== null && (
          <Link
            to={`/products/${product.id}`}
            className={styles.link}
          >
            <IconButton className={styles['review-button']}>
              <StarIcon />
              <span className={styles['review-number']}>{ratingAverage}</span>
            </IconButton>
          </Link>
        )}
      </CardActions>
    </Card>
  );
};

export default ProductCard;
