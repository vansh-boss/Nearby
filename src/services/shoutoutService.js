import api from "./api";

export const shoutoutService = {

  getAll: () =>
    api.get("/shoutouts"),

  create: (data) =>
    api.post(
      "/shoutouts",
      data,
      {
        headers: {
          Authorization:
            `Bearer ${localStorage.getItem("token")}`
        }
      }
    )

};