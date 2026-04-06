/** @param {import("axios").AxiosInstance} instance */
export const makeUser = (instance) => ({
  getAll() {
    return instance.get("/users");
  },
  /** @param {{ id: number, username: string }} */
  patch({ id, username }) {
    return instance.patch(`/users/${id}`, {
      username,
    });
  },
});
