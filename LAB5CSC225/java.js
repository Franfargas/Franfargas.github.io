function registerUser() {
    var FirstName = document.getElementById('FirstName').value;
    var LastName = document.getElementById('LastName').value;
    var Email = document.getElementById('Email').value;
    var Password = document.getElementById('Password').value;
    var DOB = document.getElementById('DOB').value;

    if (Password.includes('!') || Password.includes('?')) {
        document.getElementById('UserInfo').style.display = 'block'; 
        document.getElementById('UserInfo').innerHTML = `
            Your Registration was Successful! <br>
            Name: ${FirstName} ${LastName} <br>
            Email: ${Email} <br>
            Password: ${'*'.repeat(Password.length)} <br>
            Date of Birth: ${DOB}
        `;
    } else {
        alert('Your Registration has failed. The Password must contain ! or ?');
    }
}