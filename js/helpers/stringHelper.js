function StringHelper () {}

StringHelper.prototype.strip = function (str) {
    // Remove some tags
    str = str.replace(/<[^>]+>/gim, '');

    // Remove BB code
    str = str.replace(/\[(\w+)[^\]]*](.*?)\[\/\1]/g, '$2 ');

    // Remove html and line breaks
    const div = document.createElement('div');
    div.innerHTML = str;

    const input = document.createElement('input');
    input.value = div.textContent || div.innerText || '';

    return input.value.trim();
};