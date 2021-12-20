// user init
let user;
let headChat;
// localStorage.removeItem('user');

// funciton init create user 
async function init() {
  user = new User();
  if(!user.data){
    let name = prompt('Insert Name:');
    user.data = await user.newUser(name);
    await user.addDataLocalStorage();
    console.log(user);
  }
}

init();


