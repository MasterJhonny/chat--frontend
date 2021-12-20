class Chat {
  constructor(user) {
    this.url = "https://agile-shelf-79558.herokuapp.com/api/v1/chats";
    this.user = user;
  }

  async getChats(id) {
    try {
      const response = await fetch(`${this.url}/${id}`);
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  
  async createChat(idUserChat) {
    try {
      const response = await fetch(this.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          users: [this.user._id, idUserChat],
        }),
      });
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async findChat(id) {
    try {
      const response = await fetch(`${this.url}/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
}
