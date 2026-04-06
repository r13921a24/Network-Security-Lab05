import { useEffect, useState } from "react";
import services from "../services";

/**
 * @type {{
 *   id: number,
 *   username: string,
 * }[]}
 */
const initialUsers = [];

function Users() {
  const [allUsers, setAllUsers] = useState(initialUsers);
  const [fetchingAllUsers, setFetchingAllUsers] = useState(false);
  const [textInput, setTextInput] = useState({
    uid: "",
    username: "",
  });

  const fetchAllUsersAndSetState = () => {
    setFetchingAllUsers(true);
    services.user
      .getAll()
      .then((resp) => {
        console.log(resp.data);
        setAllUsers(resp.data);
      })
      .finally(() => {
        setFetchingAllUsers(false);
      });
  };

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
    const { uid, username } = textInput;
    if (uid && username) {
      services.user.patch({ id: uid, username }).then(() => {
        fetchAllUsersAndSetState();
      });
    }
    setTextInput({ uid: "", username: "" });
  };

  useEffect(() => {
    fetchAllUsersAndSetState();
  }, []);
  // services.user.patch({ id: 1, username: "Eric" });

  useEffect(() => {
    services.auth.getCsrf();
  }, []);

  return (
    <div>
      <div className="m-2">{fetchingAllUsers && "Loading"}</div>
      <div className="flex flex-wrap">
        {allUsers.map((user) => (
          <div
            key={user.id}
            className="m-2 p-2 border border-gray-300 rounded hover:shadow"
          >
            <div>ID: {user.id}</div>
            <div>{user.username}</div>
          </div>
        ))}
      </div>

      <form onSubmit={handleFormSubmit} className="mx-4 mt-8 max-w-md">
        <div className="grid grid-cols-1 gap-6">
          <label className="block">
            <span className="text-gray-700">UID</span>
            <input
              className="mt-1 block w-full"
              type="text"
              name="uid"
              value={textInput.uid}
              onChange={handleTextInputChange}
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Username</span>
            <input
              className="mt-1 block w-full"
              type="text"
              name="username"
              value={textInput.username}
              onChange={handleTextInputChange}
            />
          </label>
          <input
            className="mt-1 block w-full bg-transparent hover:bg-blue-50 focus:bg-blue-500 text-blue-700 font-semibold focus:text-white py-2 px-4 border border-blue-500 rounded"
            type="submit"
            value="Patch"
          />
        </div>
        <button
          className="text-base mt-1 block w-full bg-transparent hover:bg-blue-50 focus:bg-blue-500 text-blue-700 font-semibold focus:text-white py-2 px-4 border border-blue-500 rounded"
          onClick={fetchAllUsersAndSetState}
        >
          Refresh
        </button>
      </form>
    </div>
  );
}

export default Users;
