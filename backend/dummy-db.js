const db = {
    imgs: []
}

async function list(table) {
    return db[table] || [];
}

async function get(table, id) {
    let collection = await list(table);
    return collection.filter(item => item.id === id)[0] || null;
}

async function upsert(table, data) {
    
    if (!db[table]) {
        db[table] = [];
    }
    db[table].push(data);
}

module.exports = {
    list,
    get,
    upsert,
}