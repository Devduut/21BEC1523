document.getElementById('submitBtn').addEventListener('click', function () {
    const jsonInput = document.getElementById('jsonInput').value;
    const errorElement = document.getElementById('error');
    const filterElement = document.getElementById('filter');
    const filteredOutputElement = document.getElementById('filteredOutput');

    // Clear previous error
    errorElement.textContent = '';
    filteredOutputElement.textContent = '';

    try {
        // Parse the JSON input
        const data = JSON.parse(jsonInput);

        // Send data to Flask backend
        fetch('/bfhl', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(responseData => {
            // Get selected filters
            const selectedFilters = Array.from(filterElement.selectedOptions).map(option => option.value);

            // Process responseData based on selected filters
            let filteredData = [];

            if (selectedFilters.includes('numbers')) {
                filteredData = filteredData.concat(responseData.numbers);
            }

            if (selectedFilters.includes('alphabets')) {
                filteredData = filteredData.concat(responseData.alphabets);
            }

            if (selectedFilters.includes('lowercase') && responseData.highest_lowercase) {
                filteredData.push(responseData.highest_lowercase);
            }

            // Display the filtered response
            filteredOutputElement.textContent = filteredData.join(', ');
        })
        .catch(error => {
            errorElement.textContent = 'Error communicating with server!';
        });

    } catch (error) {
        // Show error if JSON is invalid
        errorElement.textContent = 'Invalid JSON input!';
    }
});
