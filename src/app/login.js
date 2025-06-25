import Image from "next/image";

export default function Home() {
  return (
    <body>
      <header>
        <h1>Connexion</h1>
      </header>
      <main>
        <form onsubmit="connexion(event)">
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            id="username"
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            id="password"
            required
          />
          <button type="submit">Se connecter</button>
        </form>
      </main>

      <script src="script.js"></script>
    </body>
  );
}
