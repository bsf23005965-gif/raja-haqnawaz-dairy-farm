import { FARM_CONTACT } from '../constants/farmContact.js';

export const PhoneService = {
  getNumber() {
    return FARM_CONTACT.phone;
  },

  getDisplayNumber() {
    return FARM_CONTACT.displayPhone;
  },

  getTelLink() {
    return `tel:${FARM_CONTACT.phone}`;
  },

  callFarm() {
    const url = this.getTelLink();
    if (typeof window !== 'undefined') {
      window.location.href = url;
    }
    return url;
  }
};
