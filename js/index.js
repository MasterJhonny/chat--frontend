// const
const btn = document.getElementById("btn");
const btnEmoji = document.getElementById("btnEmoji");
const nameUser = document.getElementById("nameUser");
const salida = document.getElementById("salida");
const cajaEmojis = document.querySelector('emoji-picker');
// const users ouput
const ouputUsers = document.querySelector('.main__chats');
const userAvatar = document.getElementById('userAvatar');

// description view element
const descriptionView = document.querySelector('.description--after');

// header view user chatsMessages
const viewUser = document.getElementById('viewUser');
const viewUserName = document.getElementById('viewUserName');

// input messages
let msg = document.getElementById("message");
// audio element
const audio = document.querySelector('audio');

// element DOM
const micro = document.getElementById("micro");
const ENTER = 13;

// medias quueris
const volver = document.querySelector('.option__volver');

// element insert Dom Modifi
const p = document.createElement('p');
p.classList.add('status--user');

const span = document.createElement("span");
span.classList.add('chat__user--notify');



// instance Emojis
const emojis = new Emoji(cajaEmojis, btnEmoji, msg);


async function getMessage (id) {
  try {
    const response = await fetch(`http://192.168.1.101:3000/api/v1/messages?chat=${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// function for view contac
function volverRun1 () {
  const contac = document.querySelector('.contac');
  const description = document.querySelector('.description');
  description.style.display = 'none';
  contac.style.display = 'block';
}

// function for view description
function volverRun2 () {
  const contac = document.querySelector('.contac');
  const description = document.querySelector('.description');
  description.style.display = 'block';
  contac.style.display = 'none';
}

// function to add element p to avatar render
function avartarRender (name, ouputName, color, ouputAvatar, letra) {
  ouputName.innerText = name;
  ouputName.style.marginLeft = '10px';
  ouputAvatar.style.backgroundColor = color;
  ouputAvatar.innerHTML = `<p class="user__icon--init">${letra}</p>`;
}

// function view users
async function viewUsers () {
  const users = await user.getUsers();
  users.forEach((item) => {
    let inicial = item.name.charAt(0);
    let color = colorHEX();
    if (item._id != user.data._id) {
      ouputUsers.innerHTML += `
              <div class="chat__user" onclick="makeChat('${item._id}')">
                    <div class="chat__user--icon" style="background-color: ${color};">
                      <p class="user__icon--init">${inicial}</p>
                    </div>
                    <div class="chat__user--name" id="${item._id}">
                      <p>${item.name}</p>
                    </div>
                </div>
              `;
    } else {
      avartarRender(item.name, nameUser, color, userAvatar, inicial);
    }
  });
}

// run render users
viewUsers();
// run get getUsers create new instance of chats
const chats = new Chat(user.data);
const chatsMessages = new Array();

// function make chat event
async function makeChat (id) {
  // ocultar view general inicial
  descriptionView.style.display = 'none';

  // render chat avartar_
  const userView = await user.findUser(id);
  let inicial = userView.name.charAt(0);
  let color = colorHEX();
  console.log(userView);
  avartarRender(userView.name, viewUserName, color, viewUser, inicial);

  // borrar notifcaciones
  let containerUser = document.getElementById(id);
  span.textContent = '';
  span.style.display = 'none';
  containerUser.insertAdjacentElement('afterend', span);

  // run function  for movil
  const mediaqueryList = window.matchMedia("(max-width: 550px)");
  if(mediaqueryList.matches) {
    volverRun2()
  }
  
  // fund chat user
  let myChats = await chats.findChat(user.data._id)
  let chatUser = myChats.find(chat => {
    return chat.users.find(user => user === id)
  });
  
  // en caso de no existir el chat se crea
  if(!chatUser){
    alert(`Escribir a ${userView.name}`)
    chatUser = await chats.createChat(id);
  }
  
  // ahora se realiza la petición de los messages for render in view
  const dataMessage = await getMessage(chatUser._id);
  salida.innerHTML = '';
  dataMessage.forEach(msg => {
    if(user.data._id === msg.destUserId) {
      salida.innerHTML += `
                    <div class="box__container">
                      <div class="box">
                          <p class="name">${msg.user.name}</p>
                          <p class="message">${msg.message}</p>
                      </div>
                    </div>
                  `;
    } else {
      salida.innerHTML += `
                    <div class="box__container box__right">
                      <div class="box">
                          <p class="name">${msg.user.name}</p>
                          <p class="message">${msg.message}</p>
                      </div>
                    </div>
                  `;
    }
  })

  // se inicia la secion 
  if(chatsMessages.length === 0){
    const chatMsg = new Message(user.data, chatUser._id, id);
    chatsMessages.push(chatMsg);
    headChat = chatMsg;
    console.log(chatMsg)
  } else {
    chatsMessages.forEach(item => {
      if(item.idChat != chatUser._id){
        const chatMsg = new Message(user.data, chatUser._id);
        headChat = chatMsg;
        chatsMessages.push(chatMsg);
        console.log(chatMsg)
      } else {
        headChat = item;
      }
    }) 
  }
}

// function event add message
function addMessage () {
  let msg = document.getElementById("message");
  if(msg.value){
    headChat.newMessage(msg.value);
    send.reset();
  }
}

// se hace al conection de web sockets
let socket = io.connect("http://192.168.1.101:3000", {
  forceNew: true,
});

// coneccion inicial
socket.emit('init', user.data);

socket.on('en:linea', (data) => {
  const containerUser = document.getElementById(data.data._id);
  p.textContent = data.status;
  containerUser.insertAdjacentElement('afterbegin', p);
});


// escucahr messages
socket.on("message", (data) => {
  if(user.data._id === data.destUserId) {
    // run sonido de notify
    audio.play();
    // view notify
    const containerUser = document.getElementById(data.user._id);
    span.textContent = '1';
    span.style.display = 'block';
    containerUser.insertAdjacentElement('afterend', span);
    p.textContent = 'en linea';
    containerUser.insertAdjacentElement('afterbegin', p);
  }
  chatsMessages.forEach(item => {
    if(item.idChat === data.chat) {
      if(user.data._id === data.destUserId) {
        salida.innerHTML += `
                    <div class="box__container">
                      <div class="box">
                          <p class="name">${data.user.name}</p>
                          <p class="message">${data.message}</p>
                      </div>
                    </div>
                  `;
      } else {
        salida.innerHTML += `
        <div class="box__container box__right">
                      <div class="box">
                          <p class="name">${data.user.name}</p>
                          <p class="message">${data.message}</p>
                      </div>
                    </div>
      `;
      }
    }
  })
});


// events DOM elements
btn.onclick = () => {
  addMessage();
};

document.addEventListener("keypress", (e) => {
  if(e.keyCode === ENTER){
    addMessage();
    const containerUser = document.getElementById(data._id);
    p.textContent = 'en linea';
    containerUser.insertAdjacentElement('afterbegin', p);
  }
})
msg.oninput = () => {
  let input = document.getElementById('message').value;
  if(input){
    btn.style.display = "block";
    micro.style.display = "none";
  } else {
    btn.style.display = "none";
    micro.style.display = "block";
  }
}

btnEmoji.onclick = () => {
  emojis.views();
} 

cajaEmojis.addEventListener('emoji-click', e => {
  emojis.write(e);
})



volver.onclick = () => {
  volverRun1()
}

msg.addEventListener('keypress', () => {
  socket.emit('typing', headChat);
})

socket.on('typing', (data) => {
  console.log(data);
  const containerUser = document.getElementById(data.user._id);
  console.log(headChat.idChat, data.idChat);
  if(headChat.idChat === data.idChat) {
    p.textContent = 'escribiendo...';
    containerUser.insertAdjacentElement('afterbegin', p);
  }
})