import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

/**
 * Creates a purchase object from the purchases forms data
 * @param {*} productData - An array of products
 * @param {*} deliveryAddress - Delivery Address form data
 * @param {*} billingAddress - Billing Address form data
 * @param {*} creditCard - Credit Card form data
 * @returns - A DTO used to make a post to purchases
 */
export const createPurchaseObject = (productData, deliveryAddress, billingAddress, creditCard) => {
  const storage = JSON.parse(sessionStorage.getItem('user'));
  const products = productData.map(({ id, quantity }) => ({ product: { id }, quantity }));

  let userEmail = '';

  const date = new Date();
  const yyyy = date.getFullYear();
  let mm = date.getMonth() + 1; // Months start at 0!
  let dd = date.getDate();
  if (mm < 10) mm = `0${mm}`;
  if (dd < 10) dd = `0${dd}`;
  const purchaseDate = `${mm}/${dd}/${yyyy}`;

  if (storage.user) {
    userEmail = storage.user.email;
  }
  const purchaseObject = {
    products,
    deliveryAddress: {
      firstName: deliveryAddress.firstName,
      lastName: deliveryAddress.lastName,
      deliveryStreet: deliveryAddress.street,
      deliveryStreet2: deliveryAddress.street2,
      deliveryCity: deliveryAddress.city,
      deliveryState: deliveryAddress.state,
      deliveryZip: deliveryAddress.zip
    },
    billingAddress: {
      billingStreet: billingAddress.street,
      billingStreet2: billingAddress.street2,
      billingCity: billingAddress.city,
      billingState: billingAddress.state,
      billingZip: billingAddress.zip,
      email: billingAddress.email,
      phone: billingAddress.phone
    },
    creditCard: {
      cardNumber: creditCard.cardNumber,
      cvv: creditCard.cvv,
      expiration: creditCard.expiration,
      cardholder: creditCard.cardholder
    },
    purchaseDate,
    userEmail
  };
  return purchaseObject;
};

/**
 *
 * @name makePayment
 * @description sends a purchase request
 * @param {*} cartContents items to purchase
 * @returns payment confirmation response
 */
const makePurchase = async (products, deliveryAddress, billingAddress, creditCard) => {
  const fetchPromise = await HttpHelper(Constants.PURCHASE_ENDPOINT, 'POST', createPurchaseObject(products, deliveryAddress, billingAddress, creditCard))
    .then((response) => response.json()).catch(() => {
    });
  return fetchPromise;
};
export default makePurchase;
