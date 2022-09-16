import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import RemoveItemModal from './RemoveItemModal';

/**
 * @description - A container to hold the DOM
 * @author -Andrew Salern0
 */
let container = null;

/**
 * @description - Setup a DOM element as a render target
 * @author - Andrew Salerno
 */
beforeEach(() => {
  container = document.createElement('div');
  container.id = 'portal';
  document.body.appendChild(container);
});

/**
 * @description - Cleanup on exit
 * @author - Andrew Salerno
 */
afterEach(() => {
  ReactDOM.unmountComponentAtNode(container);
  container.remove();
  container = null;
});

/**
 * @description - Tests the RemoveItemModal component
 * @author - Andrew Salerno
 */
describe('Remove Item Modal', () => {
  /**
   * Checks the condition when the modal is open
   */
  it('Renders when open is true', () => {
    const open = true;
    render(
      <RemoveItemModal open={open} />, container
    );
  });

  /**
   * Checks the condition for when the modal is closed
   */
  it('Does not render when open is false', () => {
    const open = false;
    render(
      <RemoveItemModal open={open} />, container
    );
  });
});
