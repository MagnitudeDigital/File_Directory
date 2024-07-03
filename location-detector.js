document.addEventListener('DOMContentLoaded', function () {
    // URL to the compressed data string
    const dataUrl = "https://raw.githubusercontent.com/MagnitudeDigital/File_Directory/main/minified-locations.csv";

    // Function to create a mapping from the compressed string
    function createLocationMap(data) {
        const map = {};
        const entries = data.split(';');
        entries.forEach(entry => {
            const [city, code] = entry.split(',');
            map[code.trim()] = city.trim();
        });
        return map;
    }

    // Function to fetch and process location data
    async function fetchAndProcessData(url) {
        try {
            const response = await fetch(url);
            const data = await response.text();
            const locations = createLocationMap(data);

            // Function to get URL parameters
            function getQueryParam(param) {
                const urlParams = new URLSearchParams(window.location.search);
                return urlParams.get(param);
            }

            // Get location code from URL
            const locCode = getQueryParam('LOC');
            const cityName = locations[locCode] || 'your area';

            // Update all relevant headlines
            updateHeadlines(cityName);
        } catch (error) {
            console.error('Failed to fetch location data:', error);
        }
    }

    // Function to update all relevant headlines
    function updateHeadlines(city) {
        document.querySelectorAll('h1, h2').forEach(header => {
            if (header.innerHTML.includes('[LOC]')) {
                header.innerHTML = header.innerHTML.replace('[LOC]', city);
            }
        });
    }

    // Initiate fetching and processing of data
    fetchAndProcessData(dataUrl);
});