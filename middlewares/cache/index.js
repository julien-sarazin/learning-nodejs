module.exports = (api) => {
    const cache = {};

    function get(req, res, next) {
        const data = cache[req.url]

        if (data)
            return res.send(data)

        next()
    }

    function set(data, key) {
        cache[key] = data
    }

    return {
        get,
        set
    }
}