const cache = [];

module.exports = {
        set: (group, key, data) => {
            setEntry(group, key, data)
        },
        clean: (group) => {
            return (req, res, next) => {
                cleanEntries(group);
                next();
            };
        },
        get: (req, res, next) => {
            let entry = getEntry(req.originalUrl);

            if (!entry) {
                return next();
            }

            res.send(entry.value);
        }
};

function cleanEntries(group) {
    let removable = [];

    for (let entry of cache) {
        if (entry.group == group) {
            removable.push(cache.indexOf(entry))
        }
    }

    for (let index of removable) {
        cache.splice(index, 1)
    }
}

function setEntry(group, key, value) {
    let entry = getEntry(key);
    if (!entry) {
        cache.push({
            group: group,
            key: key,
            value: value
        });
    }
    else {
        entry.value = value;
    }
}

function getEntry(key) {
    for (let entry of cache) {
        if (entry.key == key) {
            return entry
        }
    }
}
