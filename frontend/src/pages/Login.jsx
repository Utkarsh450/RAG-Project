import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-hot-toast";

import { authService } from "../services/authService";

import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await authService.login(formData);

      await login(response.access_token, response.refresh_token);

      toast.success("Login Successful");

      navigate("/chat");
    } catch (error) {
      toast.error(error?.response?.data?.detail || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
            min-h-screen
            flex
            items-center
            justify-center
            bg-slate-100
        "
    >
      <div
        className="
                w-full
                max-w-md
                bg-white
                rounded-2xl
                shadow-lg
                p-8
            "
      >
        <h1
          className="
                    text-3xl
                    font-bold
                    text-center
                    mb-2
                "
        >
          PDF Chat
        </h1>

        <p
          className="
                    text-center
                    text-gray-500
                    mb-6
                "
        >
          Login to continue
        </p>

        <form
          onSubmit={handleSubmit}
          className="
                    space-y-4
                "
        >
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="
                        w-full
                        border
                        rounded-lg
                        p-3
                    "
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="
                        w-full
                        border
                        rounded-lg
                        p-3
                    "
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="
                        w-full
                        bg-black
                        text-white
                        py-3
                        rounded-lg
                    "
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>

        <p
          className="
                    text-center
                    mt-6
                "
        >
          Don't have an account?
          <Link
            to="/register"
            className="
                        ml-2
                        text-blue-600
                    "
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
