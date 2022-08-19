/* eslint-disable max-len */
/* eslint-disable no-return-assign */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/style-prop-object */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './MaintenancePage.module.css';
import fetchProducts from '../product-page/ProductPageService';
import {
  Table, TableHeader, TableRow, TableCell, TableBody
} from './table/Table';

const MaintenancePage = () => {
  const [products, setProducts] = useState([]);
  const [apiError, setApiError] = useState();

  const history = useHistory();
  const routeChange = () => {
    const path = '/maintenance/create-product';
    history.push(path);
  };

  useEffect(() => {
    fetchProducts(setProducts, setApiError);
  }, []);
  return (
    <div className={styles.Maintenance}>
      <div className={styles.buttonBlock}>
        <button className={styles.button} type="button" onClick={routeChange}>
          Create Products
        </button>
      </div>
      <Table height="90vh">
        {products[0] && ( // if the first product is in there, then display the keys
          <TableHeader
            style={{ height: 50, backgroundColor: 'rgb(30, 210, 105)' }}
          >
            {Object.keys(products[0]).map((key, i) => {
              const string = key.toString().charAt(0).toUpperCase()
              + key.toString().slice(1);
              const result = string.replace(/[A-Z]/g, ' $&').trim();
              return (
                <div key={i}>
                  {i === 2 && (
                    <TableCell style={{ minWidth: 200 }}>{result}</TableCell>
                  )}
                  {i === 13 && (
                    <TableCell style={{ minWidth: 1200 }}>{result}</TableCell>
                  )}
                  {i !== 13 && i !== 2 && <TableCell>{result}</TableCell>}
                </div>
              );
            })}
          </TableHeader>
        )}
        <TableBody scrollable>
          {products.map((product) => (
            <TableRow key={product.id}>
              {Object.values(product).map((value, i) => (
                <div key={i}>
                  {i === 1 && <TableCell>{value}</TableCell>}
                  {i === 2 && (
                    <TableCell style={{ minWidth: 200 }}>{value}</TableCell>
                  )}
                  {i === 14 && <TableCell>{value}</TableCell>}
                  {i === 13 && (
                    <TableCell style={{ minWidth: 1200 }}>{value}</TableCell>
                  )}
                  {i !== 1 && i !== 2 && i !== 13 && i !== 14 && (
                    <TableCell>{value.toString()}</TableCell>
                  )}
                </div>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MaintenancePage;
