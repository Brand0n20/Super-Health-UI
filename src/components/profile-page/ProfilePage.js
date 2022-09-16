/* eslint-disable max-len */
import { React, useState } from 'react';
import {
  Tabs, TabList, Tab, TabPanel
} from 'react-tabs';
import { ReturnToProducts, getPurchaseHistory, putProfileData } from './ProfilePageService';
import 'react-tabs/style/react-tabs.css';
import styles from './ProfilePage.module.css';
import PurchaseHistoryTable from './PurchaseHistoryTable';
import RenderShippingAddress from './RenderShippingAddress';
import constants from '../../utils/constants';
import { getErrorsObject, errorsObjectIsNullOrEmpty, ValidateProfileAccount } from '../form/validation/orchestrators';

/**
 * @name ProfilePage
 * @description - Display the profile page
 * @returns - Profile Page - JSX template component
 */
const ProfilePage = ({ setUser }) => {
  const storage = JSON.parse(sessionStorage.getItem('user'));
  const [purchaseHistory, setPurchaseHistory] = useState();
  const [ApiError, setApiError] = useState();
  const [errorMessages, setErrorMessages] = useState({});

  const date = new Date();
  const yyyy = date.getFullYear();
  let mm = date.getMonth() + 1; // Months start at 0!
  let dd = date.getDate();
  const minute = date.getMinutes();
  const ss = date.getSeconds();
  if (mm < 10) mm = `0${mm}`;
  if (dd < 10) dd = `0${dd}`;
  const updateDate = `${yyyy}/${mm}/${dd}/${minute}min/${ss}s`;

  const initialState = {
    userId: storage.user.id,
    email: storage.user.email,
    firstName: storage.user.firstName,
    lastName: storage.user.lastName,
    street: storage.user.street,
    city: storage.user.city,
    state: storage.user.state,
    zip: storage.user.zip,
    date: updateDate
  };

  const [profileData, setProfileData] = useState(initialState);
  /**
   * @name onProfileChange
   * @Description set changes to profile data
   */
  const onProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.id]: e.target.value });
  };

  /**
   * Gets a users purchase history from the databae and sets
   * purchaseHistory state with the returned response
   */
  const onPurchaseHistory = async () => {
    try {
      const purchaseHisttoryResponse = await getPurchaseHistory(profileData.email);
      setPurchaseHistory(purchaseHisttoryResponse);
    } catch (error) {
      setPurchaseHistory([]);
    }
  };

  /**
   * @name handleSubmit
   * @description - this async function will update the user in the purchases table once the Save button is clicked and there are no validation errors
   */
  const handleSubmit = async () => {
    ValidateProfileAccount(profileData);
    setErrorMessages(getErrorsObject());
    if (errorsObjectIsNullOrEmpty()) {
      await putProfileData(profileData, setApiError, profileData.userId);
      setUser(profileData);
    }
  };

  const handleCancel = () => {
    setProfileData(initialState);
  };

  if (storage.user) {
    return (
      <div>
        <div>
          { ApiError && (
          <p className={styles.errMsg} data-testid="errMsg">
            {constants.API_ERROR}
          </p>
          ) }
        </div>
        <h1>Profile Page</h1>
        <Tabs>
          <TabList>
            <Tab>Profile</Tab>
            <Tab onClick={onPurchaseHistory}>Purchase History</Tab>
          </TabList>
          <TabPanel>
            <RenderShippingAddress
              onChange={onProfileChange}
              profileData={profileData}
              handleSubmit={handleSubmit}
              handleCancel={handleCancel}
              errorMessages={errorMessages}
              errorsObjectIsNullOrEmpty={errorsObjectIsNullOrEmpty}
            />
          </TabPanel>
          <TabPanel className={styles.tableMargin}>
            <h2>Purchase History</h2>
            <PurchaseHistoryTable
              purchaseHistory={purchaseHistory}
            />
          </TabPanel>
        </Tabs>
      </div>
    );
  }
  return (
    <>
      <ReturnToProducts />
    </>
  );
};

export default ProfilePage;
