async function submitForm() {
    const jsonInput = document.getElementById('json-input').value;
    const filter = document.getElementById('filter-select').value;
    const responseOutput = document.getElementById('response-output');

    try {
        // Parse the JSON input
        const data = JSON.parse(jsonInput);

        // Send request to backend
        const response = await fetch('http://localhost:5000/bfhl', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // Parse the JSON response
        const result = await response.json();

        // Filter the response based on user selection
        let filteredResponse;
        switch (filter) {
            case 'alphabets':
                filteredResponse = result.alphabets;
                break;
            case 'numbers':
                filteredResponse = result.numbers;
                break;
            case 'highest_lowercase':
                filteredResponse = result.highest_lowercase_alphabet;
                break;
            default:
                filteredResponse = 'Invalid filter selected';
        }

        // Display the filtered response
        responseOutput.textContent = JSON.stringify(filteredResponse, null, 2);
    } catch (error) {
        responseOutput.textContent = `Error communicating with server: ${error.message}`;
    }
}
