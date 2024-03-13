document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var user = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        dob: document.getElementById('dob').value
    };

    console.log('User object created:', user);

    // Check if all fields are present
    if (!user.firstName || !user.lastName || !user.email || !user.password || !user.dob) {
        document.getElementById('registration-result').textContent = "All fields are required.";
        console.log('Validation failed: All fields are required.');
        return;
    } else {
        console.log('All fields are present.');
    }
    
    // Check if password contains a special character
    if (!user.password.includes('!') && !user.password.includes('?')) {
        document.getElementById('registration-result').textContent = "Password must contain a special character (! or ?).";
        console.log('Validation failed: Password needs a special character.');
        return;
    } else {
        console.log('Password contains a special character.');
    }

    // Password masking with asterisks
    user.password = user.password.replace(/./g, '*');
    console.log('Password masked.');

    // Write to the DOM - Registration successful
    document.getElementById('registration-result').innerHTML = `
        <div>Registration Successful</div>
        <div>First Name: ${user.firstName}</div>
        <div>Last Name: ${user.lastName}</div>
        <div>Email: ${user.email}</div>
        <div>Password: ${user.password}</div>
        <div>Date of Birth: ${user.dob}</div>
    `;
    console.log('Registration successful, written to DOM:', user);
});
