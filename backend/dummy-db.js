const db = {
    imgs: [
        {
            id: 1,
            url: 'http://localhost:3000/images/1617224790000--download.jpg',
        }
    ]
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