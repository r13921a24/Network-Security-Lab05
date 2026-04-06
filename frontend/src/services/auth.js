/** @param {import("axios").AxiosInstance} instance */
export const makeAuth = (instance) => ({
  getCsrf() {
    return instance.get("/csrf");
  },
  signup({ username, password }) {
    return instance.post("/signup", { username, password });
  },
  login({ username, password }) {
    return instance.post("/login", { username, password });
  },
  logout() {
    return instance.post("/logout");
  },
  me() {
    return instance.get("/me");
  }
});
