import { useState } from "react";
import { useNavigate } from "react-router-dom";
import services from "../services";

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    services.auth.signup(form).then(() => navigate("/login"));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl">Create User</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-64">
        <input 
          type="text" placeholder="Username" className="border p-1"
          onChange={e => setForm({...form, username: e.target.value})} 
        />
        <input 
          type="password" placeholder="Password" className="border p-1"
          onChange={e => setForm({...form, password: e.target.value})} 
        />
        <button type="submit" className="bg-blue-500 text-white p-1">Register</button>
      </form>
    </div>
  );
}
export default Signup;