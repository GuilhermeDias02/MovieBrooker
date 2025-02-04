function generateToken(user){
    const token = btoa(user);
    return token;
}

function verifyToken(token){
    const decodedUser = JSON.parse(atob(token));
    return decodedUser;
}

const user = {
    name: "username",
    email: "user@email.com",
    password: "userpassword"
};
console.log("base user: "+JSON.stringify(user));

const token = generateToken(JSON.stringify(user));
console.log("Generated token: "+token);

const decodedUser = verifyToken(token);
console.log("Decoded user: "+JSON.stringify(decodedUser));