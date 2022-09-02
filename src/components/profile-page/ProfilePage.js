import React from 'react';
import {
  Tabs, TabList, Tab, TabPanel
} from 'react-tabs';
import { ReturnToProducts, getPurchaseHistory } from './ProfilePageService';
import 'react-tabs/style/react-tabs.css';
import styles from './ProfilePage.module.css';
import PurchaseHistoryTable from './PurchaseHistoryTable';
import RenderShippingAddress from './RenderShippingAddress';

/**
 * @name ProfilePage
 * @description - Display the profile page
 * @returns - Profile Page - JSX template component
 */
const ProfilePage = () => {
  const storage = JSON.parse(sessionStorage.getItem('user'));
  const [purchaseHistory, setPurchaseHistory] = React.useState();

  /**
   * Gets a users purchase history from the databae and sets
   * purchaseHistory state with the returned response
   */
  const onPurchaseHistory = async () => {
    try {
      const purchaseHisttoryResponse = await getPurchaseHistory(storage.user.email);
      setPurchaseHistory(purchaseHisttoryResponse);
    } catch (error) {
      setPurchaseHistory([]);
    }
  };

  if (storage.user) {
    return (
      <div>
        <h1>Profile Page</h1>
        <Tabs>
          <TabList>
            <Tab>Profile</Tab>
            <Tab onClick={onPurchaseHistory}>Purchase History</Tab>
          </TabList>
          <TabPanel>
            <RenderShippingAddress />
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
