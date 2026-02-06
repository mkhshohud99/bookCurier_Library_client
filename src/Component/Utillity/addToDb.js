const getStoredDB = () => {
    const storedAppSTR = localStorage.getItem("WishListBook");

    if (storedAppSTR) {
        return JSON.parse(storedAppSTR);
    }
    else {
        return [];   // <-- return empty array
    }
    
}
const addToDB = (id) => {
    const storedAppData = getStoredDB();

    if (storedAppData.includes(id)) {
        alert("Already Exist");
    }
    else {
        storedAppData.push(id);

        localStorage.setItem("WishListBook", JSON.stringify(storedAppData));
        alert("Vai Add koira disi")
    }
}

export { addToDB, getStoredDB };