document.addEventListener('DOMContentLoaded', () => {
    alert('Welcome to Frans store!');

    const userName = prompt('What is your name?');
    const itemRequested = prompt('What item would you like to order?');
    let numberOfItems = parseInt(prompt('How many items would you like to order?'), 10);
    numberOfItems = isNaN(numberOfItems) ? 0 : Math.max(1, Math.min(99, numberOfItems));

    const currentTime = new Date();
    const hour = currentTime.getHours();
    let greeting = 'Hello';
    if (hour < 12) {
        greeting = 'Good Morning';
    } else if (hour < 18) {
        greeting = 'Good Afternoon';
    } else {
        greeting = 'Good Evening';
    }

    const greetingText = `${greeting} ${userName}, thank you for ordering!`;
    const orderDetails = `You have ordered ${numberOfItems} of ${itemRequested}.`;
    const deliveryDate = new Date(currentTime.setDate(currentTime.getDate() + 7));
    const arrivalText = `Your order will arrive by: ${deliveryDate.toDateString()}`;

    document.getElementById('greeting').textContent = greetingText;
    document.getElementById('orderDetails').textContent = orderDetails;
    document.getElementById('arrivalDate').textContent = arrivalText;
});
