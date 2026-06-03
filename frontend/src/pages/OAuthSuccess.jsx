import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

export default function OAuthSuccess() {
  const navigate = useNavigate();

  const { login } = useAuth();
  useEffect(() => {

    console.log("OAuth Page Loaded");

    const handleGoogleLogin = async () => {

        try {

            console.log(
                "Current URL:",
                window.location.href
            );

            const params =
                new URLSearchParams(
                    window.location.search
                );

            const accessToken =
                params.get("access_token");

            const refreshToken =
                params.get("refresh_token");

            console.log(
                "Access Token:",
                accessToken
            );

            console.log(
                "Refresh Token:",
                refreshToken
            );

            await login(
                accessToken,
                refreshToken
            );

            console.log(
                "LOGIN SUCCESS"
            );

            navigate("/chat");

        } catch(error) {

            console.log(
                "LOGIN FAILED",
                error
            );
        }
    };

    handleGoogleLogin();

}, []);

  return (
    <div
      className="
                min-h-screen
                flex
                items-center
                justify-center
                bg-slate-950
                text-white
            "
    >
      <div
        className="
                    text-center
                "
      >
        <h2
          className="
                        text-2xl
                        font-semibold
                    "
        >
          Signing you in...
        </h2>

        <p
          className="
                        text-gray-400
                        mt-2
                    "
        >
          Please wait
        </p>
      </div>
    </div>
  );
}
