/* eslint-disable no-console */
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("auth");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.log("No cookies found", error);
    return undefined;
  }
};

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("auth", serializedState);
  } catch (error) {
    console.log("Cookies not saved", error);
  }
};

export const removeState = state => {
  try {
    localStorage.removeItem(state);
  } catch (error) {
    console.log("Cookies not deleted", error);
  }
};
