/**
 * saves application state to disk
 * @param  {Object} state application state
 * @return {undefined} writes to disk
 */
export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (e) {
    console.log(e);
  }
};

/**
 * loads state from disk
 * @return {Object} State Object
 */
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.log(error);
  }
};
