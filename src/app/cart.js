import Image from "next/image";

export default function Home() {
  return (
    <body>
      <header>
        <h1>Panier</h1>
        <nav>
          <a href="page.js">Accueil</a>
        </nav>
      </header>

      <main>
        <div id="panier"></div>
        <button onclick="viderPanier()">Vider le panier</button>
      </main>

      <script src="script.js"></script>
    </body>
  );
}
