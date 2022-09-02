import React from 'react';
import styles from './ProfilePage.module.css';

/**
* @name renderShippingAddress
* @description - Display the Shipping information for the user if they have made a purchase
* @returns - If no purchase history, a warning telling the user to make a purchase.
* If user has a purchase history, their shipping address will be displayed.
*/
const RenderShippingAddress = () => {
  const storage = JSON.parse(sessionStorage.getItem('user'));
  if (storage.user) {
    if (storage.user.street || storage.user.city || storage.user.state || storage.user.zip) {
      return (
        <>
          <div className={styles.container}>
            <div className={styles.greeting}>
              <img className={styles.circle} src="assets/user.svg" alt="user" />
              <h2>
                {`Hello, ${storage.user.firstName}`}
              </h2>
            </div>
            <h4>First Name:</h4>
            {storage.user.firstName}
            <h4>Last Name: </h4>
            {storage.user.lastName}
            <div>
              <h4>Shipping Address</h4>
              <h4>Street: </h4>
              {storage.user.street}
              <h4>City: </h4>
              {storage.user.city}
              <h4>State: </h4>
              {storage.user.state}
              <h4>Zip: </h4>
              {storage.user.zip}
            </div>
          </div>
        </>
      );
    }
    return (
      <>
        <div className={styles.container}>
          <div className={styles.greeting}>
            <img className={styles.circle} src="assets/user.svg" alt="user" />
            <h2>
              {`Hello, ${storage.user.firstName}`}
            </h2>
          </div>
          <h4>First Name:</h4>
          {storage.user.firstName}
          <h4>Last Name: </h4>
          {storage.user.lastName}
          <p>Please Update Your Shipping Address</p>
        </div>
      </>
    );
  }
  return (<></>);
};

export default RenderShippingAddress;
