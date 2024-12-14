
export const init = () => {
    let openRequest = indexedDB.open("energy", 1);
    return openRequest;
}

export const createDatabase = (openRequest: any) => {
    let db = openRequest.result;
    if (!db.objectStoreNames.contains('consumption')) { // si no hay un almacén de consumo ("consumption") //TABLA,
        db.createObjectStore('consumption', { keyPath: 'id', autoIncrement: true }); // crearlo
    }
};

export const createObject = (transaction: any, data: any) => {
    let books = transaction.objectStore("consumption"); // (2)
    let request = books.add(data);
    return request;
}