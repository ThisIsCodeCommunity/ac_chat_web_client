/**
 * Analyzer Class for text analysis
 */
class Analyzer {
    /**
     * Analyze a text value.
     * @param {string} value - The text to be analyzed.
     * @returns {Promise} - A promise that resolves with a boolean indicating if the text passed the analysis (true) or not (false).
     */
    async analyze(value) {
        const params = { analysis: { resource: value, category: 'text' } };
        const analyzeUrl = '/analyze'; // Assuming the URL to be /analyze.

        const response = await App.requester.post(analyzeUrl, params);
        const messageData = JSON.parse(response.responseText);

        const parent = document.getElementById('messages');
        const newChild = '<div class="alert-box">Please consider using more pleasant linguistics</div>';

        if (messageData.results.value === 'Adult') {
            parent.insertAdjacentHTML('beforeend', newChild);
            return false;
        }
        return true;
    }
}
