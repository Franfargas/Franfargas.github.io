function showSection(sectionId) {
    // Hiding all sections
    document.querySelectorAll('.content').forEach((section) => {
        section.style.display = 'none';
    });
    // Showing the selected section
    document.getElementById(sectionId).style.display = 'block';

    // Updating active class on tabs
    document.querySelectorAll('.nav-link').forEach((tab) => {
        if (tab.getAttribute('onclick').includes(sectionId)) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
}


function checkIP() {
    var ipInput = document.getElementById('checkIpInput');
    var ip = ipInput.value.trim();
    var ipParts = ip.split('.');
    
    if (ipParts.length !== 4) {
        document.getElementById('checkResult').innerHTML = '<span class="text-danger">Invalid IP address. An IP address should consist of four numeric parts separated by dots.</span>';
        ipInput.focus();
        return;
    }

    for (var i = 0; i < ipParts.length; i++) {
        var part = parseInt(ipParts[i]);
        if (isNaN(part) || part < 0 || part > 255) {
            document.getElementById('checkResult').innerHTML = '<span class="text-danger">Invalid IP address. Each part must be a number between 0 and 255.</span>';
            ipInput.focus();
            return;
        }
    }

    var url = `/api/check?ipAddress=${ip}`;
    var headers = {
        'Key': 'Yb8c97c2963616723c8b58e8a8ebe8a70e4c8e8f19e349fc8541316f7010d782e4464b8f73aad8445',
        'Accept': 'application/json'
    };

    fetch(url, { method: 'GET', headers: headers })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            if (data.data) {
                document.getElementById('checkResult').innerHTML = `IP: ${data.data.ipAddress}, Abuse Score: ${data.data.abuseConfidenceScore}`;
                storeCheckedIP(ip);
            } else {
                document.getElementById('checkResult').innerHTML = 'No data found';
            }
        })
        .catch(function(error) {
            console.error('Error:', error);
            document.getElementById('checkResult').innerHTML = `Error fetching data: ${error.message}`;
        });
}


function storeCheckedIP(ip) {
    let ips = JSON.parse(localStorage.getItem('checkedIPs')) || [];
    if (!ips.includes(ip)) {
        ips.push(ip);
        localStorage.setItem('checkedIPs', JSON.stringify(ips));
    }
}

function showCheckedIPs() {
    const ips = JSON.parse(localStorage.getItem('checkedIPs')) || [];
    let html = '<ul>';
    ips.forEach(ip => {
        html += `<li>${ip}</li>`;
    });
    html += '</ul>';
    document.getElementById('checkResult').innerHTML = html;
}
function clearCheckedIPs() {
    localStorage.removeItem('checkedIPs');
    document.getElementById('checkResult').innerHTML = 'All checked IPs have been cleared'; 
}


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
            storeReportedIP(ip); // Storing the reported IP address
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('reportResult').innerHTML = 'Failed to report IP';
        });
}

function storeReportedIP(ip) {
    let reportedIPs = JSON.parse(localStorage.getItem('reportedIPs')) || [];
    if (!reportedIPs.includes(ip)) {
        reportedIPs.push(ip);
        localStorage.setItem('reportedIPs', JSON.stringify(reportedIPs));
    }
}

function showReportedIPs() {
    const reportedIPs = JSON.parse(localStorage.getItem('reportedIPs')) || [];
    let html = '<ul>';
    reportedIPs.forEach(ip => {
        html += `<li>${ip}</li>`;
    });
    html += '</ul>';
    document.getElementById('reportResult').innerHTML = html; 
}
function clearReportedIPs() {
    localStorage.removeItem('reportedIPs');
    document.getElementById('reportResult').innerHTML = 'All reported IPs have been cleared'; 
}


function getBlacklistByCountries() {
    const selectedCountry = document.getElementById('countrySelect').value;
    const url = `/api/blacklist?onlyCountries=${selectedCountry}`;

    fetch(url, { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            if (data.data && data.data.length > 0) {
                const filteredIPs = data.data.filter(ip => ip.countryCode === selectedCountry);
                let resultHtml = filteredIPs.map(ip => `<li>${ip.ipAddress} - ${ip.countryCode} - Score: ${ip.abuseConfidenceScore}</li>`).join('');
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
