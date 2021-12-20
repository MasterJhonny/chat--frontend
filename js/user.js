class User {
  constructor() {
    this.url = "http://192.168.1.101:3000/api/v1/users";
    this.data = JSON.parse(localStorage.getItem("user"));
  }

  async newUser(name) {
    try {
      const response = await fetch(`${this.url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          name: name,
        }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async addDataLocalStorage() {
    localStorage.setItem("user", JSON.stringify(this.data));
  }

  async updateUser(name) {
    try {
      const response = await fetch(`${this.url}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          name: name,
        }),
      });
      this.data = await response.json();
      return this.data;
    } catch (error) {
      console.error(error);
    }
  }

  async findUser(id) {
    try {
      const response = await fetch(`${this.url}/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async getUsers(salida) {
    try {
      const response = await fetch(this.url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
}
