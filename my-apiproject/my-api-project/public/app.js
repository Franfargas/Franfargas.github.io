// Function that is  checking information about an IP address
function checkIP() {
    const ip = document.getElementById('checkIpInput').value.trim(); 
    if (!ip) {
        alert('Please enter an IP address to check.');
        return;
    }

    const apiUrl = `https://api.abuseipdb.com/api/v2/check?ipAddress=${ip}`;
    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Key': 'b8c97c2963616723c8b58e8a8ebe8a70e4c8e8f19e349fc8541316f7010d782e4464b8f73aad8445' 
        }
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(data => { throw new Error(`${data.errors[0].detail} (Status code: ${response.status})`); });
        }
        return response.json();
    })
    .then(data => {
        if (data && data.data) {
            document.getElementById('checkResult').innerHTML = `IP Address: ${data.data.ipAddress}, Abuse Confidence Score: ${data.data.abuseConfidenceScore}`;
        } else {
            document.getElementById('checkResult').innerHTML = ' There is no data found for this IP address.';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('checkResult').innerHTML = `Error checking IP: ${error.message}`;
    });
}


// Function that is  to report an IP address
function reportIP() {
    const ip = document.getElementById('reportIpInput').value.trim();
    if (!ip) {
        alert('Please enter an IP address to report.');
        return;
    }

    const body = JSON.stringify({
        ipAddress: ip,
        categories: '18,19',
        comment: 'Reported for scanning and hacking'
    });

    const apiUrl = 'https://api.abuseipdb.com/api/v2/report';
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Key': 'b8c97c2963616723c8b58e8a8ebe8a70e4c8e8f19e349fc8541316f7010d782e4464b8f73aad8445'  
        },
        body: body
    })
    .then(response => response.json())
    .then(data => {
        if (response.status !== 200) {
            console.error('Error:', data.errors[0].detail);
            document.getElementById('reportResult').innerHTML = `Error: ${data.errors[0].detail}`;
        } else {
            document.getElementById('reportResult').innerHTML = 'IP reported successfully';
        }
    })
    .catch(error => {
        console.error('Error reporting IP:', error);
        document.getElementById('reportResult').innerHTML = `Error reporting IP: ${error.message}`;
    });
}

// Function to get a blacklist by country
function getBlacklistByCountries() {
    const selectedCountry = document.getElementById('countrySelect').value;
    const apiUrl = `https://api.abuseipdb.com/api/v2/blacklist?onlyCountries=${selectedCountry}`;

    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Key': 'b8c97c2963616723c8b58e8a8ebe8a70e4c8e8f19e349fc8541316f7010d782e4464b8f73aad8445'  
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.data && data.data.length > 0) {
            const resultHtml = data.data.map(ip => `<li>${ip.ipAddress} - Score: ${ip.abuseConfidenceScore}</li>`).join('');
            document.getElementById('blacklistResult').innerHTML = `<ul>${resultHtml}</ul>`;
        } else {
            document.getElementById('blacklistResult').innerHTML = 'No results found for the selected country.';
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        document.getElementById('blacklistResult').innerHTML = `Error fetching data: ${error.message}`;
    });
}
