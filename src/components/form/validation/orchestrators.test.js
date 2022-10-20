import {
  clearErrorsObject, getErrorsObject
} from './orchestrators';

/**
 * @description - Tests the methods in orchestrators
 * @author - Andrew Salerno
 */
describe('OrchestratorsTest', () => {
  /**
   * @description - - Test if getErrorsObject gets an errorMessagesObject
   * @author - Andrew Salerno
   */
  describe('errorsObjectIsNullOrEmpty', () => {
    it('Gets an error messages object', () => {
      getErrorsObject();
    });
  });

  /**
   * @description - - Test if clearErrorsObject clears the errorMessagesObject
   * @author - Andrew Salerno
   */
  describe('errorsObjectIsNullOrEmpty', () => {
    it('Gets an error messages object', () => {
      clearErrorsObject();
    });
  });
});
