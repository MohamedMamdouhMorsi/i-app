const is_api = (url) => {
    if (url === '/api' || url.startsWith('/api/') || url.startsWith('/api?')) {
        return true;
    }
    return false;
};
module.exports = is_api;
