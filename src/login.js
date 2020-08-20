
var login = () => {};

/**
 * Makes user authentication. Currently using harcoded users for sample application. 
 */
login.authenticate = (user, password) => {    
    return new Promise(async (resolve, reject) => {
        try {
            let currentUser = global.users.find(u => u.name === user);
            if (currentUser && currentUser.password === password) resolve(currentUser); 
            else reject({message:'User not found'});
        }
        catch (e) {
            console.log(e.message);
            reject(e);
        }
    });
}

module.exports = login;

