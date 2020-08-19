
var login = () => {};

login.authenticate = (user, password, users) => {    
    return new Promise(async (resolve, reject) => {
        try {
            let currentUser = users.find(u => u.name === user);
            if (currentUser && currentUser.password === password) resolve(currentUser); 
            else reject('User not found')
        }
        catch (e) {
            console.log(e.message);
            reject(e);
        }
    });
}

module.exports = login;

