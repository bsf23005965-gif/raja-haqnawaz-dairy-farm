import { FARM_CONTACT } from '../constants/farmContact.js';

export const WhatsAppService = {
  getNumber() {
    return FARM_CONTACT.internationalWhatsapp;
  },

  getDisplayNumber() {
    return FARM_CONTACT.displayWhatsapp;
  },

  createGeneralMessage() {
    return `Assalam-o-Alaikum,\n\nI would like to get information about Raja Haqnawaz Dairy Farm and the available animals.\n\nThank you.`;
  },

  createAnimalInquiryMessage({ animalName, breed, price }) {
    const formattedPrice = typeof price === 'number' ? price.toLocaleString() : price;
    return `Assalam-o-Alaikum Raja Haqnawaz Dairy Farm,\n\nI am interested in this animal.\n\nAnimal: ${animalName}\nBreed: ${breed}\nPrice: Rs. ${formattedPrice}\n\nPlease provide more information.\n\nThank you.`;
  },

  createOrderInquiryMessage({ orderId, animalName, price }) {
    const formattedPrice = typeof price === 'number' ? price.toLocaleString() : price;
    return `Assalam-o-Alaikum Raja Haqnawaz Dairy Farm,\n\nI am inquiring regarding my livestock order:\n\nOrder ID: ${orderId}\nAnimal: ${animalName}\nAmount: Rs. ${formattedPrice}\n\nPlease update me on delivery and verification.\n\nThank you.`;
  },

  getWhatsAppLink(message) {
    const rawNumber = FARM_CONTACT.whatsapp.startsWith('0') 
      ? `92${FARM_CONTACT.whatsapp.slice(1)}`
      : FARM_CONTACT.whatsapp;
    const cleanNumber = rawNumber.replace(/[^0-9]/g, '');
    const encodedText = encodeURIComponent(message);
    return `https://wa.me/${cleanNumber}?text=${encodedText}`;
  },

  openGeneralInquiry() {
    const message = this.createGeneralMessage();
    const url = this.getWhatsAppLink(message);
    if (typeof window !== 'undefined') {
      window.open(url, '_blank');
    }
    return url;
  },

  openAnimalInquiry(animal) {
    const message = this.createAnimalInquiryMessage({
      animalName: animal?.name || 'Dairy Cattle',
      breed: animal?.breed || 'Standard',
      price: animal?.price || 0,
    });
    const url = this.getWhatsAppLink(message);
    if (typeof window !== 'undefined') {
      window.open(url, '_blank');
    }
    return url;
  },

  openOrderInquiry(order) {
    const message = this.createOrderInquiryMessage({
      orderId: order?.id || 'N/A',
      animalName: order?.animalName || 'Livestock',
      price: order?.totalPrice || order?.price || 0,
    });
    const url = this.getWhatsAppLink(message);
    if (typeof window !== 'undefined') {
      window.open(url, '_blank');
    }
    return url;
  }
};
