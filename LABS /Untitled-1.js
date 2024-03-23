// script.js
document.addEventListener('DOMContentLoaded', (event) => {
    alert('Welcome to our store!');
  
    let userName = prompt('What is your name?');
    let itemRequested = prompt('What item would you like to order?');
    let numberOfItems = prompt('How many items would you like to order?');
  
    // Ensuring the number of items is between 1 and 99
    numberOfItems = Math.max(1, Math.min(99, parseInt(numberOfItems, 10)));
  
    // Greeting the customer based on the current time
    const currentTime = new Date();
    let greeting;
    const hour = currentTime.getHours();
    if (hour < 12) {
      greeting = 'Good Morning';
    } else if (hour < 18) {
      greeting = 'Good Afternoon';
    } else {
      greeting = 'Good Evening';
    }
  
    const greetingText = `${greeting} ${userName}, Thank you for Ordering!`;
    const orderDetails = `You have ordered ${numberOfItems} ${itemRequested}.`;
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 7);
    const arrivalText = `Your order will arrive by: ${deliveryDate.toDateString()}`;
  
    // Displaying the details on the web page
    document.body.innerHTML = `
      <h1>${greetingText}</h1>
      <p>${orderDetails}</p>
      <p>${arrivalText}</p>
    `;
  });
  