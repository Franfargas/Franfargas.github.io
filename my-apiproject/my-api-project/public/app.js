// Function to check an IP address
function checkIP() {
    const ipInput = document.getElementById('checkIpInput');
    const ip = ipInput.value.trim();
    const apiUrl = `hhttps://api.abuseipdb.com/api/v2/check?ipAddress=8.8.8.8`;

    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Key': 'b8c97c2963616723c8b58e8a8ebe8a70e4c8e8f19e349fc8541316f7010d782e4464b8f73aad8445'  // Replace 'YOUR_API_KEY' with your actual API key
        }
    })
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    })
    .then(data => {
        document.getElementById('checkResult').innerHTML = `IP: ${data.data.ipAddress}, Abuse Score: ${data.data.abuseConfidenceScore}`;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('checkResult').innerHTML = `Error fetching data: ${error.message}`;
    });
}

// Function to report an IP address
function reportIP() {
    const ip = document.getElementById('reportIpInput').value.trim();
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
            'Key': 'b8c97c2963616723c8b58e8a8ebe8a70e4c8e8f19e349fc8541316f7010d782e4464b8f73aad8445'  // Replace 'YOUR_API_KEY' with your actual API key
        },
        body: body
    })
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    })
    .then(data => {
        if (data.data) {
            document.getElementById('reportResult').innerHTML = 'IP reported successfully';
        } else {
            document.getElementById('reportResult').innerHTML = 'Failed to report IP';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('reportResult').innerHTML = `Error reporting IP: ${error.message}`;
    });
}

// Function to get a blacklist by country
function getBlacklistByCountries() {
    const selectedCountry = document.getElementById('countrySelect').value;
    const apiUrl = `https://api.abuseipdb.com/api/v2/blacklist?onlyCountries=US,MX,CA`;

    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Key': 'b8c97c2963616723c8b58e8a8ebe8a70e4c8e8f19e349fc8541316f7010d782e4464b8f73aad8445'  // Replace 'YOUR_API_KEY' with your actual API key
        }
    })
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    })
    .then(data => {
        if (data.data && data.data.length > 0) {
            const resultHtml = data.data.map(ip => `<li>${ip.ipAddress} - Score: ${ip.abuseConfidenceScore}</li>`).join('');
            document.getElementById('blacklistResult').innerHTML = `<ul>${resultHtml}</ul>`;
        } else {
            document.getElementById('blacklistResult').innerHTML = 'No results found for the selected country.';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('blacklistResult').innerHTML = `Error fetching data: ${error.message}`;
    });
}
