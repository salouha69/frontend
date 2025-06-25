import Image from "next/image";

export default function Home() {
  return (
    <body>
      <h1>Votre panier</h1>
      <div id="panier"></div>
      <button onclick="viderPanier()">Vider le panier</button>
      <br />
      <br />
      <a href="#">Retour boutique</a>
      <script src="script.js"></script>
    </body>
  );
}
