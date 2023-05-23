/**
 * Cookies Class for setting and getting cookies in a web browser
 */
class Cookies {
    /**
     * Set a cookie.
     * @param {string} name - The name of the cookie.
     * @param {string} value - The value of the cookie.
     * @param {number} [days=7] - The number of days until the cookie will expire. Defaults to 7 days.
     * @param {string} [path='/'] - The path where the cookie is valid. Defaults to all paths ('/').
     */
    set(name, value, days = 7, path = '/') {
        const expires = new Date(Date.now() + days * 864e5).toUTCString();
        document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=${path}`;
    }

    /**
     * Get a cookie value.
     * @param {string} name - The name of the cookie to get the value of.
     * @returns {string} - The value of the cookie, or an empty string if the cookie does not exist.
     */
    get(name) {
        return document.cookie.split('; ').reduce((r, v) => {
            const parts = v.split('=');
            return parts[0] === name ? decodeURIComponent(parts[1]) : r;
        }, '');
    }
}

// // Usage Examples
// let cookies = new Cookies();

// // Set a cookie named "username" with value "John Doe" that will expire in 10 days.
// cookies.set("username", "John Doe", 10);

// // Get the value of the cookie named "username"
// let username = cookies.get("username");
// console.log(username); // prints: "John Doe"

// // Set a cookie named "session" with value "abc123" that will expire in 1 day.
// cookies.set("session", "abc123", 1);

// // Get the value of the cookie named "session"
// let session = cookies.get("session");
// console.log(session); // prints: "abc123"
