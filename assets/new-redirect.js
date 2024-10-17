// Fetch the user's geolocation data using ipinfo.io
// fetch('https://ipinfo.io/json?token=f8c34916117fa6')  // Replace YOUR_API_TOKEN with your actual token from ipinfo.io
//     .then(response => response.json())
//     .then(data => {
//         const countryCode = data.country;  // Get the user's country code (e.g., AU, NZ, etc.)
//         const currentDomain = window.location.hostname;  // Get current domain (e.g., resilienceagenda.co.uk)
//         const currentPath = window.location.pathname;  // Get current path (e.g., /pages/webinar)

//         // Logic 1: If from AU or NZ, domain ends with .co.uk, and URL contains /pages/webinar
//         if ((countryCode === 'AU' || countryCode === 'NZ') && currentDomain.endsWith('.co.uk') && currentPath.includes('/pages/webinar')) {
//             // Redirect to .com + path
//             const newUrl = 'https://' + currentDomain.replace('.co.uk', '.com') + currentPath;
//             window.location.href = newUrl;
//         }

//         // Logic 2: If not from AU or NZ, domain ends with .com, and URL contains /pages/webinar
//         if (!(countryCode === 'AU' || countryCode === 'NZ') && currentDomain.endsWith('.com') && currentPath.includes('/pages/webinar')) {
//             // Redirect to .co.uk + path
//             const newUrl = 'https://' + currentDomain.replace('.com', '.co.uk') + currentPath;
//             window.location.href = newUrl;
//         }
//     })
//     .catch(err => {
//         console.error('Error fetching geolocation data:', err);
//     });

// Define variables
let targetPage = '/pages/webinar';
let siteCOM = 'resilienceagenda.com';
let siteUK = 'resilienceagenda.co.uk';
let siteCH = 'resilienceagenda.ch';

// Function to get the current domain without 'www.'
function getDomainWithoutWWW() {
    let domain = window.location.hostname;
    return domain.replace(/^www\./, ''); // Remove 'www.' if present
}

// Function to get the visitor's country using ipinfo.io
function getVisitorCountry(callback) {
    fetch('https://ipinfo.io/json?token=f8c34916117fa6') // Replace with your ipinfo token
        .then(response => response.json())
        .then(data => {
            if (data && data.country) {
                callback(data.country);
            }
        })
        .catch(err => console.error('Error fetching location data:', err));
}

// Redirect rules
function redirectRuleUK() {
    window.location.href = 'https://' + siteUK + targetPage;
}

function redirectRuleCOM() {
    window.location.href = 'https://www.' + siteCOM + targetPage;
}

function redirectRuleCH() {
    window.location.href = 'https://' + siteCH + targetPage;
}

// Main function to handle redirects
function handleRedirect() {
    let currentPath = window.location.pathname;
    let currentDomain = getDomainWithoutWWW();

    if (currentPath.includes(targetPage)) {
        getVisitorCountry(function (country) {

            console.log(country);

            if (currentDomain === siteCOM) {
                if (country === 'UK' || country === 'US') {
                    redirectRuleUK();
                } else if (country === 'AU' || country === 'NZ') {

                } else {
                    redirectRuleCH();
                }
            } else if (currentDomain === siteUK) {
                if (country === 'AU' || country === 'NZ') {
                    redirectRuleCOM();
                } else if (country === 'UK' || country === 'US') {

                } else {
                    redirectRuleCH();
                }
            } else if (currentDomain === siteCH) {
                if (country === 'AU' || country === 'NZ') {
                    redirectRuleCOM();
                } else if (country === 'UK' || country === 'US') {
                    redirectRuleUK();
                }
            }
        });
    }
}

// Run the script on page load
handleRedirect();