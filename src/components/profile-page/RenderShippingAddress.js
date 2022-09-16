/* eslint-disable react/button-has-type */
import { React, useState } from 'react';
import FormItem from '../form/FormItem';
import FormItemDropdown from '../form/FormItemDropdown';
import styles from './ProfilePage.module.css';

/**
* @name renderShippingAddress
* @description - Display the Shipping information for the user if they have made a purchase
* @returns - If no purchase history, a warning telling the user to make a purchase.
* If user has a purchase history, their shipping address will be displayed.
*/
const RenderShippingAddress = ({
  onChange, profileData, handleSubmit, handleCancel, errorMessages, errorsObjectIsNullOrEmpty
}) => {
  const storage = JSON.parse(sessionStorage.getItem('user'));
  const [edit, setEdit] = useState(true);

  const handleSave = () => {
    if (errorsObjectIsNullOrEmpty()) {
      setEdit(!edit);
    }
  };

  const bothSaveAndSubmit = () => {
    handleSubmit();
    handleSave();
  };

  const cancelAndGoBack = () => {
    handleCancel();
    setEdit(!edit);
  };

  const usStates = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Federated States of Micronesia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

  if (storage.user) {
    if (edit) {
      if (profileData.street || profileData.city || profileData.state || profileData.zip) {
        return (
          <>
            <div className={styles.container}>
              <div className={styles.greeting}>
                <img className={styles.circle} src="assets/user.svg" alt="user" />
                <h2>
                  {`Hello, ${profileData.firstName}`}
                </h2>
              </div>

              <h4>First Name:</h4>
              {profileData.firstName}
              <h4>Last Name: </h4>
              {profileData.lastName}
              <div>
                <h4>Shipping Address</h4>
                <h4>Street: </h4>
                {profileData.street}
                <h4>City: </h4>
                {profileData.city}
                <h4>State: </h4>
                {profileData.state}
                <h4>Zip: </h4>
                {profileData.zip}
              </div>
              <div className={styles.buttonBlock}>
                <button className={styles.button} onClick={() => setEdit(!edit)}>Edit</button>
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
                {`Hello, ${profileData.firstName}`}
              </h2>
            </div>
            <h4>First Name:</h4>
            {profileData.firstName}
            <h4>Last Name: </h4>
            {profileData.lastName}
            <p>Please Update Your Shipping Address</p>
            <div className={styles.buttonBlock}>
              <button className={styles.button} onClick={() => setEdit(!edit)}>Edit</button>
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
              {`Hello, ${profileData.firstName}`}
            </h2>
          </div>
          <h4>First Name:</h4>
          <FormItem
            type="text"
            id="firstName"
            value={profileData.firstName || ''}
            onChange={onChange}
            errorMessage={errorMessages.firstName}
            isError={errorMessages.firstNameIsError}
          />
          <h4>Last Name: </h4>
          <FormItem
            type="text"
            id="lastName"
            value={profileData.lastName || ''}
            onChange={onChange}
            errorMessage={errorMessages.lastName}
            isError={errorMessages.lastNameIsError}
          />
          <div>
            <h4>Shipping Address</h4>
            <h4>Street: </h4>
            <FormItem
              type="text"
              id="street"
              value={profileData.street || ''}
              onChange={onChange}
              errorMessage={errorMessages.street}
              isError={errorMessages.streetIsError}
            />
            <h4>City: </h4>
            <FormItem
              type="text"
              id="city"
              value={profileData.city || ''}
              onChange={onChange}
              errorMessage={errorMessages.city}
              isError={errorMessages.cityIsError}
            />
            <h4>State: </h4>
            <FormItemDropdown
              id="state"
              onChange={onChange}
              value={profileData.state}
              options={usStates}
              errorMessage={errorMessages.state}
              isError={errorMessages.stateIsError}
            />
            <h4>Zip: </h4>
            <FormItem
              type="text"
              id="zip"
              value={profileData.zip || ''}
              onChange={onChange}
              errorMessage={errorMessages.zip}
              isError={errorMessages.zipIsError}
            />
          </div>
          <div className={styles.buttonBlock}>
            <button className={styles.button} onClick={bothSaveAndSubmit}>Save</button>
            <button className={styles.button} onClick={cancelAndGoBack}>Cancel</button>
          </div>
        </div>
      </>
    );
  }
  return (<></>);
};

export default RenderShippingAddress;
