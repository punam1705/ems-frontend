import { useEffect } from "react";

export default function OAuthSuccess() {

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    console.log("TOKEN:", token);

    if (token) {
      localStorage.setItem("token", token);

      // 🔥 decode JWT
      const payload = JSON.parse(atob(token.split(".")[1]));
      const role = payload.role;

      console.log("ROLE:", role);

      // const payload = JSON.parse(atob(token.split(".")[1]));
console.log("PAYLOAD:", payload);
console.log("ROLE:", role);
      // 🔥 redirect based on role
      if (role === "ADMIN") {
        window.location.href = "/list-of-employee";
      } else {
        window.location.href = "/profile";
      }
    }
  }, []);

  return <h1>Logging in...</h1>;
}