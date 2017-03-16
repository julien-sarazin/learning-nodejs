module.exports = (server) => {
    server.utils = {
        ensureOne,
        empty,
        reject,
        ensureEmpty
    };


    function reject(code, message) {
        return () => {
            return Promise.reject({
                code: code,
                message: message
            });
        };
    }

    function ensureEmpty(data) {
        return (!data || data.length == 0) ? data : Promise.reject()
    }

    function ensureOne(data) {
        return (data) ? data : Promise.reject();
    }

    function empty(data) {
        return (data) ? null : data
    }
};