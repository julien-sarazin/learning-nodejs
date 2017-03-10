module.exports = (api) => {
    const cache = [{
        model: String,
        storage: {}
    }];

    function getDataFromKey(key) {
        for (let item of cache) {
            const data = item.storage[key]
            if (data)
                return data
        }

        return null;
    }

    function getItemFromModel(model) {
        for (let item of cache) {
            if (item.model == model) {
                return item
            }
        }

        return null;
    }

    function get(req, res, next) {
        const data = getDataFromKey(req.originalUrl)

        if (data)
            return res.send(data)

        next()
    }

    function set(model, data, key) {
        let item = getItemFromModel(model);
        if (item) {
            return item.storage[key] = data;
        }

        item = {
            model: model,
            storage: {}
        }

        item.storage[key] = data;

        cache.push(item);
    }

    function clean(model) {
        return (req, res, next) => {
            let index = -1;
            for (let item of cache) {
                if (item.model == model) {
                    index = cache.indexOf(item);
                }
            }

            if (index != -1) {
                cache.splice(index, 1);
            }

            next();
        }
    }

    return {
        get,
        set,
        clean
    }
}