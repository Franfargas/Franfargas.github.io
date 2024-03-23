window.alert("Welcome to Fran's store");  // Welcomes them to Fran's store

// Collect the customer's information
var customerName = window.prompt("Enter your name:", "");
var itemBeingRequested = window.prompt("What item is being ordered?", "");
var numberOfItems = parseInt(window.prompt("How many items would you like to order? (1-99)", ""), 10);

// Checking to see if the input for the number of items is not a number (NaN), or if it is out of range, then set to 1 as default
if (isNaN(numberOfItems) || numberOfItems < 1 || numberOfItems > 99) {
    numberOfItems = 1;
}

// Determining the current time to generate an appropriate greeting
var currentTime = new Date();
var greeting;
if (currentTime.getHours() < 12) {
    greeting = "Hello, good morning";
} else if (currentTime.getHours() < 18) {
    greeting = "Hello, good afternoon";
} else {
    greeting = "Hello, good evening";
}

// Calculating the expected delivery date, exactly 7 days from now
var deliveryDate = new Date();
deliveryDate.setDate(currentTime.getDate() + 7);
var deliveryDateString = deliveryDate.toDateString();

// Display the greeting, order summary, and expected delivery date on the webpage
document.write('<h2>' + greeting + ' ' + customerName + ', Thank you very much for ordering!</h2>');
document.write('<p>You ordered ' + numberOfItems + ' ' + itemBeingRequested + '(s).</p>');
document.write('<p>Your order will arrive by: ' + deliveryDateString + '</p>');
