const liste = [
    "fraise",
    "banane",
    "peche",
    "pomme",
    "poire"
]

function filter(array, filter){
    let res = [];
    array.forEach(element => {
        if(element.includes(filter))
            res.push(element);
    });
    return res;
}

console.log(filter(liste, "p"));