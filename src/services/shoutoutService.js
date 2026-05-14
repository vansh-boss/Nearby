import api from "./api";

export const shoutoutService = {

  getAll: (params) =>

    api.get(
      "/shoutouts",
      {
        params
      }
    ),

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