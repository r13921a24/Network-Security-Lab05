import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="flex gap-x-4 underline m-2">
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/signup">Register</Link>
      <Link to="/users">Users</Link>
    </div>
  );
}

export default Navbar;
