export const addItem = (state, item) => {
    let newArray = state.slice(0);
    newArray.push(item);
    return newArray;
}

export const addItems = (state, items) => {
    let newArray = state.slice(0);
    items.forEach(item => {
        newArray.push(item);
    });
    return newArray;
}

export const removeItem = (state, item) => {
    let newArray = state.slice(0);
    const index = newArray.indexOf(item);
    newArray.splice(index, 1);
    return newArray;
}

export const removeItems = (state, items) => {
    let newArray = state.slice(0);
    items.forEach(item => {
        const index = newArray.indexOf(item);
        newArray.splice(index, 1);
    })
    return newArray;
}

export const addKey = (state, key, item) => {
    const newObject = copy(state);
    newObject[key] = item;
    return newObject;
}

export const addKeys = (state, keys, items) => {
    const newObject = copy(state);
    keys.forEach((item, index) => {
        newObject[item] = items[index];
    })
    return newObject;
}

export const removeKey = (state, key) => {
    const newObject = copy(state);
    delete newObject[key];
    return newObject;
}

export const removeKeys = (state, keys) => {
    const newObject = copy(state);
    keys.forEach(i => {
        delete newObject[i];
    });
    return newObject;
}

export const addPropToKeys = (state, keys, prop) => {
    const newObject = copy(state);
    keys.forEach(key => newObject[key][prop] = true);
    return newObject;
}

export const removePropFromKeys = (state, keys, prop) => {
    const newObject = copy(state);
    keys.forEach(i => {
        delete newObject[i][prop];
    });
    return newObject;
}

export const uniqueId = () => {
    let uniqueID = '';

    let chars = 'abcdef0123456789';
    chars = chars.split('');

    for (let i = 0; i < 40; i++) {
        uniqueID += chars[Math.floor((Math.random() * 15))];
    }

    return uniqueID;
}


export const copy = object => {
    if (typeof object !== 'object' || object === null) return object;

    const newObject = {};
    let i;

    for (i in object) if (object.hasOwnProperty(i)) newObject[i] = copy(object[i]);
    return newObject;
}
