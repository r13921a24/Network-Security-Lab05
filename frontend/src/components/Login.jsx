import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import services from "../services";
import Spinner from "./Spinner";

function Login() {
  const navigate = useNavigate();
  const [textInput, setTextInput] = useState({
    username: "",
    password: "",
  });
  const [readOnly, setReadOnly] = useState(false);
  const { username, password } = textInput;

  /** @type {React.ChangeEventHandler<HTMLInputElement>} */
  const handleTextInputChange = ({ target: { name, value } }) => {
    setTextInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /** @type {React.FormEventHandler<HTMLFormElement>} */
  const handleFormSubmit = (event) => {
    event.preventDefault();
    setReadOnly(true);
    services.auth
      .login({ username, password })
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        setReadOnly(false);
      });
  };

  return (
    <div className="w-full h-full grid place-items-center">
      <div className="flex items-center justify-center text-center">
        <div className="my-4">
          <div className="text-2xl">Sign In</div>
          <div className="border border-gray-300 rounded m-4 py-6 px-4 mobile-s:px-6">
            <form
              onSubmit={handleFormSubmit}
              className="grid grid-cols-1 gap-2 w-60 mobile-s:w-64 sm:w-72"
            >
              <label className="block text-left">
                <span className="text-gray-700">Username</span>
                <input
                  type="text"
                  name="username"
                  className="mt-1 block w-full rounded disabled:opacity-50 disabled:cursor-not-allowed disabled:select-none"
                  placeholder=""
                  value={username}
                  readOnly={readOnly}
                  disabled={readOnly}
                  onChange={handleTextInputChange}
                />
              </label>
              <label className="block text-left">
                <span className="text-gray-700">Password</span>
                <input
                  type="password"
                  name="password"
                  className="mt-1 block w-full rounded disabled:opacity-50 disabled:cursor-not-allowed disabled:select-none"
                  placeholder=""
                  value={password}
                  readOnly={readOnly}
                  disabled={readOnly}
                  onChange={handleTextInputChange}
                />
              </label>
              <button
                type="submit"
                className="relative my-2 flex-shrink-0 bg-blue-600 text-white text-base font-semibold py-2 px-4 rounded-lg hover:shadow-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200  disabled:opacity-50 disabled:cursor-wait"
                disabled={readOnly}
              >
                Sign in
                {readOnly && (
                  <div className="absolute inset-0 flex justify-end items-center">
                    <Spinner className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                  </div>
                )}
              </button>
              <div className="border-t mb-2" />
              <div>
                No account?{" "}
                <Link to="/signup" className="underline text-blue-700">
                  Create one
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
