/* eslint-disable react/no-array-index-key */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import customToast from '../customizable-toast/customToast';
import styles from './MaintenancePage.module.css';
import { fetchProducts } from '../product-page/ProductPageService';
import {
  fetchProductIsLinkedToPurchase,
  fetchUniqueProductReviewIDs
} from './MaintenancePageService';
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody
} from './table/Table';
import { ReactComponent as TrashIcon } from '../../assets/trash-icon.svg';
import { ReactComponent as PencilIcon } from '../../assets/pencil-icon.svg';
import { ReactComponent as SpinnerIcon } from '../../assets/Dual Ring-1s-200px.svg';
import DeleteProductModal from '../modal/DeleteProductModal';
import EditProductModal from '../modal/EditProductModal';
import Spinner from '../loading-spinner/Spinner';

// Object to specify certain column widths on the product table
const columnWidths = {
  id: 'tiny',
  imageSrc: 'large',
  description: 'large',
  name: 'large',
  quantity: 'small'
};

const initialModalStates = {
  deleteModalIsOpen: false,
  editModalIsOpen: false
};

/**
 * Handles the logic for deleting a product in the database
 * @param{*} product, id
 * @returns React Component
 */

const DeleteButton = ({
  id,
  product,
  setIsLinkedToPurchase,
  setSelectedProduct,
  setDeleteButtonClicked,
  setModalStates,
  setApiError,
  children
}) => {
  const handleOnClick = async () => {
    setDeleteButtonClicked(id);
    setSelectedProduct(product);
    if (
      (await fetchProductIsLinkedToPurchase(
        product.id,
        setIsLinkedToPurchase,
        setApiError
      ))
      && !product.active
    ) {
      customToast('Product Linked To Purchase. Cannot Be Deleted!', 'error');
      setDeleteButtonClicked(null);
    } else {
      setModalStates((state) => ({ ...state, deleteModalIsOpen: true }));
    }
  };
  return (
    <button type="button" onClick={handleOnClick}>{children}</button>
  );
};

const EditButton = ({
  id,
  product,
  setSelectedProduct,
  setEditButtonClicked,
  setModalStates,
  children
}) => {
  const handleOnClick = async () => {
    setEditButtonClicked(id);
    setSelectedProduct(product);
    setModalStates((state) => ({ ...state, editModalIsOpen: true }));
  };

  return (
    <button type="button" onClick={handleOnClick}>{children}</button>
  );
};

const MaintenancePage = () => {
  const [products, setProducts] = useState([]);
  const [productReviewIDs, setProductReviewIDs] = useState([]);
  const setApiError = useState()[1];
  const [selectedProduct, setSelectedProduct] = useState({});
  const [isLinkedToPurchase, setIsLinkedToPurchase] = useState(false);
  const [modalStates, setModalStates] = useState(initialModalStates);
  const [deleteButtonClicked, setDeleteButtonClicked] = useState(null);
  const [editButtonClicked, setEditButtonClicked] = useState(null);

  const history = useHistory();
  const routeChange = () => {
    const path = '/maintenance/create-product';
    history.push(path);
  };

  let columns = [];
  if (products[0]) {
    columns = Object.keys(products[0]);
  }

  useEffect(async () => {
    await fetchUniqueProductReviewIDs(setProductReviewIDs, setApiError);
    await fetchProducts('', setProducts, setApiError);
  }, []);
  return (
    <>
      {modalStates.editModalIsOpen && (
        <EditProductModal
          product={selectedProduct}
          setEditButtonClicked={setEditButtonClicked}
          setApiError={setApiError}
          setProducts={setProducts}
          onClose={() => {
            setModalStates((state) => ({ ...state, editModalIsOpen: false }));
          }}
        />
      )}
      {modalStates.deleteModalIsOpen && (
        <DeleteProductModal
          product={selectedProduct}
          isLinkedToPurchase={isLinkedToPurchase}
          setDeleteButtonClicked={setDeleteButtonClicked}
          setApiError={setApiError}
          setProducts={setProducts}
          onClose={() => {
            setModalStates((state) => ({ ...state, deleteModalIsOpen: false }));
            setIsLinkedToPurchase(false);
          }}
        />
      )}
      <div className={styles['maintenance-page']}>
        <div className={styles['button-row']}>
          <button
            className={`${styles['create-product-button']} ${styles.button}`}
            type="button"
            onClick={routeChange}
          >
            Create Products
          </button>
        </div>
        <Table>
          {columns.length === 0 && <Spinner className={styles.spinner} />}
          {columns.length !== 0 && (
            <TableHeader>
              <TableCell size="tiny" />
              {columns.map((key, i) => {
                const string = key.toString().charAt(0).toUpperCase()
                  + key.toString().slice(1);
                const result = string.replace(/[A-Z]/g, ' $&').trim();
                return (
                  <TableCell
                    key={`${i}-header`}
                    size={columnWidths[key]}
                  >
                    {result}
                  </TableCell>
                );
              })}
            </TableHeader>
          )}
          <TableBody>
            {products.map((product, i) => (
              <TableRow
                key={product.id}
                active={product.active}
              >
                <TableCell
                  size="tiny"
                  disableToolTip
                >
                  {(deleteButtonClicked || editButtonClicked) === product.id && (
                    <SpinnerIcon className={styles['spinner-small']} />
                  )}
                  {(deleteButtonClicked || editButtonClicked) !== product.id && (
                    <div className={styles['table-buttons']}>
                      <EditButton
                        type="button"
                        product={product}
                        id={product.id}
                        setSelectedProduct={setSelectedProduct}
                        setApiError={setApiError}
                        setEditButtonClicked={setEditButtonClicked}
                        setModalStates={setModalStates}
                      >
                        <PencilIcon />
                      </EditButton>
                      {!productReviewIDs.has(product.id) && (
                        <DeleteButton
                          type="button"
                          product={product}
                          id={product.id}
                          setSelectedProduct={setSelectedProduct}
                          setIsLinkedToPurchase={setIsLinkedToPurchase}
                          setApiError={setApiError}
                          setDeleteButtonClicked={setDeleteButtonClicked}
                          setModalStates={setModalStates}
                        >
                          <TrashIcon />
                        </DeleteButton>
                      )}
                    </div>
                  )}
                </TableCell>
                {Object.values(product).map((value, j) => (
                  <TableCell
                    key={`${i}-${columns[j]}`}
                    tooltipOffset={i < 3 ? 'top' : 'bottom'}
                    size={columnWidths[columns[j]]}
                  >
                    {columns[j] === 'price' ? `$${value.toFixed(2)}` : `${value}`}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <ToastContainer theme="colored" />
    </>
  );
};

export default MaintenancePage;
