/**
 * Requester Class for sending HTTP requests
 */
class Requester {
    /**
     * Log the error message for a failed XMLHttpRequest.
     */
    xhrError = () => {
        console.error(this.statusText);
    };

    /**
     * Send a POST request.
     * @param {string} url - The URL to send the request to.
     * @param {object} params - The data to send with the request.
     * @param {function} [callbackOnLoad] - An optional callback function to call when the request loads.
     * @returns {Promise} - A Promise that resolves with the XMLHttpRequest object when the request loads.
     */
    post(url, params = {}, callbackOnLoad) {
        const request = new XMLHttpRequest();
        request.open("POST", url, true);
        request.setRequestHeader("Content-type", "application/json");
        request.onerror = this.xhrError;
        request.send(JSON.stringify(params));

        return new Promise((resolve, reject) => {
            request.onload = () => {
                if (request.status >= 200 && request.status < 400) {
                    callbackOnLoad && callbackOnLoad(request);
                    resolve(request);
                } else {
                    reject(request.statusText);
                }
            };
            request.onerror = () => reject(request.statusText);
        });
    }
}

// // Usage Examples
// let requester = new Requester();

// // Send a POST request with some sample data
// requester.post("https://api.example.com/data", { key: "value" })
//     .then(response => {
//         console.log("Request succeeded with response:", response.responseText);
//     })
//     .catch(error => {
//         console.error("An error occurred:", error);
//     });
