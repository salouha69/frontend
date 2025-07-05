"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      router.push("/");
    }
  }, [router]);

  function handleSubmit(event) {
    event.preventDefault();
    if (username && password) {
      localStorage.setItem("user", username);
      alert("Connecté !");
      router.push("/");
    } else {
      alert("Veuillez remplir tous les champs.");
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-md">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Connexion</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Se connecter
          </button>
        </form>
      </main>
    </div>
  );
}
