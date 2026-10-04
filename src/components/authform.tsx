import { useState } from "react";
import type { Signup } from "../types/signup";
import type { Login } from "../types/login";
import { loginuser, signup } from "../services/userAuth";
import { useNavigate } from "react-router-dom";

export default function Authform() {
  const [isSignup, setIsSignup] = useState(true);
  const [register, setRegister] = useState<Signup>({ name: "", email: "", password: "" });
  const [login, setLogin] = useState<Login>({ email: "", password: "" });
  const navigate = useNavigate()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignup) {
      await signup(register);
      setIsSignup(false);
    } else {
      console.log("login bhej raha hu", login);
      await loginuser(login);
      console.log("login ho gaya", localStorage.getItem("access_token"));
      navigate("/");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>{isSignup ? "Sign Up" : "Login"}</h2>

        {isSignup && (
          <input
            type="text"
            placeholder="Name"
            value={register.name}
            onChange={(e) => setRegister({ ...register, name: e.target.value })}
            required
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={isSignup ? register.email : login.email}
          onChange={(e) =>
            isSignup
              ? setRegister({ ...register, email: e.target.value })
              : setLogin({ ...login, email: e.target.value })
          }
          required
        />

        <input
          type="password"
          placeholder="Password"
          minLength={isSignup ? 6 : undefined}
          value={isSignup ? register.password : login.password}
          onChange={(e) =>
            isSignup
              ? setRegister({ ...register, password: e.target.value })
              : setLogin({ ...login, password: e.target.value })
          }
          required
        />

        <button type="submit">{isSignup ? "Sign Up" : "Login"}</button>

        <p>
          {isSignup ? "Already have an account?" : "New user?"}{" "}
          <button type="button" onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </p>
      </form>
    </div>
  );
}