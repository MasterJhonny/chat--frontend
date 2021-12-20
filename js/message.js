class Message {
    constructor(user, idChat, destUserId) {
        this.url = 'http://192.168.1.101:3000/api/v1/messages/'
        this.user = user;
        this.idChat = idChat;
        this.destUserId = destUserId;
    }
    async newMessage (message) {
        try {
            const response = await fetch("http://192.168.1.101:3000/api/v1/messages", {
              method: "POST",
              headers: {
                "Content-Type": "application/json;charset=utf-8",
              },
              body: JSON.stringify({
                user: this.user._id,
                message: message,
                chat: this.idChat,
                destUserId: this.destUserId
              }),
            });
            const data = await response.json();
          } catch (error) {
            console.error(error);
          }
    }
}