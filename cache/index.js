module.exports = (server) => {
    const cache = [];

    server.cache = {
        set,
        get,
        clean
    };

    function set(entry) {
        let item = get(entry.key);

        if (!item) {
            cache.push(new Item(entry.group, entry.key, entry.value))
        }
        else {
            item.value = entry.value
        }
    }

    function get(key) {
        for (let item of cache) {
            if (item.key == key) {
                return item.value
            }
        }

        return null;
    }

    function clean(group) {
        let itemsToDelete = [];
        for (let item of cache) {
            if (item.group == group) {
                itemsToDelete.push(cache.indexOf(item))
            }
        }

        for (let index of itemsToDelete) {
            cache.splice(index, 1);
        }
    }
};


function Item(group, key, value) {
    this.group = group;
    this.key = key;
    this.value = value;
}

Item.prototype = {
    group: String,
    item: String,
    value: undefined
};

