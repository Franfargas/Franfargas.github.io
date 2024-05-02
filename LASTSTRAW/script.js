document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            const sectionId = this.getAttribute('onclick').split("'")[1];
            showSection(sectionId);
        });
    });
});

function showSection(sectionId) {
    const sections = document.querySelectorAll('.content');
    sections.forEach(section => section.style.display = 'none');
    
    const activeSection = document.getElementById(sectionId);
    activeSection.style.display = 'block';

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (link.getAttribute('onclick').includes(sectionId)) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}
async function checkIP() {
    const ip = document.getElementById('checkIpInput').value.trim();
    if (!ip) {
        alert('Please enter an IP address to check.');
        return;
    }

    const apiUrl = `https://api.abuseipdb.com/api/v2/check?ipAddress=${ip}`;
    const requestOptions = {
        method: 'GET',
        headers: new Headers({
            "Key": "5747feb5006c70337f4194c07dc239ae709bbcc34621507c7116ab8a8f64cd632814c8f9568ba1ab",
            "Accept": "application/json",
            "Content-Type": "application/json"
        }),
        redirect: 'follow'
    };

    try {
        const response = await fetch(apiUrl, requestOptions);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(`${data.errors[0].detail} (Status code: ${response.status})`);
        }
        document.getElementById('checkResult').innerHTML = `IP Address: ${data.data.ipAddress}, Abuse Confidence Score: ${data.data.abuseConfidenceScore}`;
        updateHistory('checkedIPs', ip, 'checkHistory');
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('checkResult').innerHTML = `Error checking IP: ${error.message}`;
    }
}

// Include other functions for reportIP, toggleHistory, updateHistory, displayHistory, clearHistory, fetchBlacklistData, filterBlacklistByCountry, displayBlacklistData

// Add event listeners or initialization code if needed

// report IP
async function reportIP() {
    const ip = document.getElementById('reportIpInput').value.trim();
    if (!ip) {
        alert('Please enter an IP address to report.');
        return;
    }

    const requestOptions = {
        method: "POST",
        headers: new Headers({
            "Key": "5747feb5006c70337f4194c07dc239ae709bbcc34621507c7116ab8a8f64cd632814c8f9568ba1ab",
            "Accept": "application/json",
            "Content-Type": "application/json"
        }),
        body: JSON.stringify({
            ip: ip,
            categories: '18,19',
            comment: 'Reported for scanning and hacking'
        }),
        redirect: "follow"
    };

    const apiUrl = 'https://api.abuseipdb.com/api/v2/report';

    try {
        const response = await fetch(apiUrl, requestOptions);
        const result = await response.json();
        if (!response.ok) {
            throw new Error(`Failed to report IP: ${JSON.stringify(result)} (Status code: ${response.status})`);
        }
        document.getElementById('reportResult').innerHTML = 'IP reported successfully';
        updateHistory('reportedIPs', ip, 'reportHistory');
    } catch (error) {
        console.error('Error reporting IP:', error);
        document.getElementById('reportResult').innerHTML = `Error reporting IP: ${error.message}`;
    }
}

function toggleHistory(historyId) {
    var historyDiv = document.getElementById(historyId);
    historyDiv.style.display = historyDiv.style.display === 'none' ? 'block' : 'none';
}

function updateHistory(key, value, displayId) {
    let history = JSON.parse(localStorage.getItem(key) || "[]");
    history.push(value);
    localStorage.setItem(key, JSON.stringify(history));
    displayHistory(key, displayId);
}

function displayHistory(key, displayId) {
    let history = JSON.parse(localStorage.getItem(key) || "[]");
    let listItems = history.map(ip => `<li class="list-group-item">${ip}</li>`).join('');
    document.getElementById(displayId).innerHTML = `<ul class="list-group">${listItems}</ul>`;
}

function clearHistory(key, displayId) {
    localStorage.removeItem(key);
    document.getElementById(displayId).innerHTML = "";
}
//BLACKLIST
async function fetchBlacklistData() {
    const apiUrl = `https://api.abuseipdb.com/api/v2/blacklist?onlyCountries=US,MX,CA`;

    const requestOptions = {
        method: 'GET',
        headers: new Headers({
            "Key": "5747feb5006c70337f4194c07dc239ae709bbcc34621507c7116ab8a8f64cd632814c8f9568ba1ab",
            "Accept": "application/json",
            "Content-Type": "application/json"
        }),
        redirect: 'follow'
    };

    try {
        const response = await fetch(apiUrl, requestOptions);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(`${data.errors ? data.errors[0].detail : 'Unknown error'} (Status code: ${response.status})`);
        }
        globalBlacklistData = data.data; // Assume globalBlacklistData is already declared
        displayBlacklistData(globalBlacklistData);
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('blacklistResult').innerHTML = `Error fetching data: ${error.message}`;
    }
}

function filterBlacklistByCountry() {
    const selectedCountry = document.getElementById('countrySelect').value;
    const filteredData = selectedCountry ? globalBlacklistData.filter(ip => ip.countryCode === selectedCountry) : globalBlacklistData;
    displayBlacklistData(filteredData);
}

function displayBlacklistData(data) {
    const listHtml = data.map(ip => `<li class="list-group-item">${ip.ipAddress} - Score: ${ip.abuseConfidenceScore}</li>`).join('');
    document.getElementById('blacklistResult').innerHTML = `<ul class="list-group">${listHtml}</ul>`;
}

