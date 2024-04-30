 //Function to check an IP address against AbuseIPDB
 function checkIP() {
    const ip = document.getElementById('checkIpInput').value;
    const url = `/api/check?ipAddress=${ip}`;

    // Create an object with headers
    const headers = {
        'Key': 'b8c97c2963616723c8b58e8a8ebe8a70e4c8e8f19e349fc8541316f7010d782e4464b8f73aad8445', 
        'Accept': 'application/json'
        
    };

    fetch(url, { method: 'GET', headers: headers }) 
        .then(response => response.json())
        .then(data => {
            if (data.data) {
                document.getElementById('checkResult').innerHTML = `IP: ${data.data.ipAddress}, Abuse Score: ${data.data.abuseConfidenceScore}`;
            } else {
                document.getElementById('checkResult').innerHTML = 'No data found';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('checkResult').innerHTML = `Error fetching data: ${error.message}`;
        });
}



// this function is to report an IP address
function reportIP() {
    const ip = document.getElementById('reportIpInput').value;
    const body = {
        ipAddress: ip,
        categories: '18,19',
        comment: 'Reported for scanning and hacking'
    };

    fetch('/api/report', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('reportResult').innerHTML = 'IP reported successfully';
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('reportResult').innerHTML = 'Failed to report IP';
        });
}

// this function to get a blacklist of IP addresses by country
function getBlacklistByCountries() {
    fetch('/api/blacklist', { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            document.getElementById('blacklistResult').innerHTML = JSON.stringify(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function showSection(sectionId) {
    const sections = document.querySelectorAll('.content');
    sections.forEach(section => {
        if (section.id === sectionId) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });
    const tabs = document.querySelectorAll('.nav-link');
    tabs.forEach(tab => {
        if (tab.onclick.toString().includes(sectionId)) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
}