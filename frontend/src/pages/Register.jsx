import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-hot-toast";

import { authService } from "../services/authService";

export default function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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

      await authService.register(formData);

      toast.success("Account Created Successfully");

      navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data?.detail || "Registration Failed");
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
          Create Account
        </h1>

        <p
          className="
                    text-center
                    text-gray-500
                    mb-6
                "
        >
          Register to continue
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
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <p
          className="
                    text-center
                    mt-6
                "
        >
          Already have an account?
          <Link
            to="/login"
            className="
                        ml-2
                        text-blue-600
                    "
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
  
}