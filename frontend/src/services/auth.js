/** @param {import("axios").AxiosInstance} instance */
export const makeAuth = (instance) => ({
  getCsrf() {
    return instance.get("/csrf");
  },
  /**
   * @param {{
   *   username: string,
   *   password: string,
   * }}
   */
  login({ username, password }) {
    // return instance.post("/login", { username, password });
    // We haven't implemented login in back-end,
    // so we wait 3 seconds and assume login successfully
    // Once back-end is done, uncomment the first line
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // We can make login fail, execute reject rather than resolve
        // reject();
        resolve();
      }, 3000);
    });
  },
});
