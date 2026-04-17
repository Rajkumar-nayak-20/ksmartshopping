// utils/shipping.js

export const calculateShipping = (method = "Standard", total = 0) => {
  // Express shipping
  if (method === "Express") {
    return 100;
  }

  // Free shipping condition
  if (total > 500) {
    return 0;
  }

  // Default shipping
  return 50;
};