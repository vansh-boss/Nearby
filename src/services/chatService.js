import api from "./api";

export const chatService = {

  getMessages: (userId) => {

    return api.get(
      `/chat/${userId}`,
      {
        headers: {
          Authorization:
            `Bearer ${localStorage.getItem("token")}`
        }
      }
    );

  }

};