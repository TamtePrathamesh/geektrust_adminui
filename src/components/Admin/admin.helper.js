/* eslint-disable no-undef */
import { REACT_APP_ADMIN_URL } from '../../services/constants';

export const getAdminList = async () => {
  try {
    let res = await fetch(REACT_APP_ADMIN_URL);
    res = await res.json();
    return res;
  } catch (error) {
    console.error(error);
  }
};
