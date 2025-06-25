import Image from "next/image";

export default function Home() {
  return (
    <body>
      <header>
        <h1>Boutique</h1>
        <nav>
          <a href="/#">Accueil</a>
          <a href="#" onclick="afficherCategorie('vetements')">
            Vêtements
          </a>
          <a href="#" onclick="afficherCategorie('accessoires')">
            Accessoires
          </a>
          <a href="cart.js">
            {" "}
            Panier (<span id="nbArticles">0</span>)
          </a>
          <span id="auth"></span>
        </nav>
      </header>

      <main>
        <div id="produits"></div>
      </main>

      <script src="script.js"></script>
    </body>
  );
}
