// deliveryService.js
export const getDeliveryPrice = (state) => {
    const deliveryPrices = {
      'Lagos': 5000,
      'Abuja': 15000,
      'Port Harcourt': 12000,
      "Ibadan": 10000,
      // Add more cities and prices as needed
    };
    return deliveryPrices[state] || 20000; // Default price if city not found
  };