const produits = [
  {
    id: 1,
    nom: "T-shirt",
    prix: 20,
    categorie: "vetements",
    image: "images/tshirt.jpg",
  },
  {
    id: 2,
    nom: "Casque",
    prix: 15,
    categorie: "accessoires",
    image: "images/casque.jpg",
  },
  {
    id: 3,
    nom: "Sac",
    prix: 35,
    categorie: "accessoires",
    image: "images/sac.jpg",
  },
  {
    id: 4,
    nom: "Jeans",
    prix: 40,
    categorie: "vetements",
    image: "images/jeans.jpg",
  },
];

function afficherCategorie(categorie) {
  localStorage.setItem("categorieActuelle", categorie);
  afficherProduits();
}

function afficherProduits() {
  const div = document.getElementById("produits");
  if (!div) return;
  const cat = localStorage.getItem("categorieActuelle");
  div.innerHTML = "";
  produits
    .filter((p) => !cat || p.categorie == cat)
    .forEach((p) => {
      div.innerHTML += `
      <div class="produit">
        <img src="${p.image}" alt="${p.nom}" style="max-width: 100%; height: auto; border-radius: 8px; margin-bottom: 10px;">
        <h3>${p.nom}</h3>
        <p>${p.prix}$</p>
        <button onclick="ajouterAuPanier(${p.id})">Ajouter au panier</button>
      </div>`;
    });
  majPanier();
  afficherAuth();
}

function ajouterAuPanier(id) {
  let panier = JSON.parse(localStorage.getItem("panier")) || [];
  panier.push(id);
  localStorage.setItem("panier", JSON.stringify(panier));
  alert("Ajouté au panier !");
  majPanier();
}

function afficherPanier() {
  const div = document.getElementById("panier");
  let panier = JSON.parse(localStorage.getItem("panier")) || [];
  if (panier.length === 0) {
    div.innerHTML = "<p>Votre panier est vide.</p>";
    return;
  }
  let total = 0;
  div.innerHTML = "<ul>";
  panier.forEach((id) => {
    const prod = produits.find((p) => p.id === id);
    if (prod) {
      total += prod.prix;
      div.innerHTML += `<li>${prod.nom} - ${prod.prix}$</li>`;
    }
  });
  div.innerHTML += `</ul><p>Total : ${total}$</p>`;
}

function viderPanier() {
  localStorage.removeItem("panier");
  window.location.reload();
}

function majPanier() {
  const panier = JSON.parse(localStorage.getItem("panier")) || [];
  const span = document.getElementById("nbArticles");
  if (span) span.textContent = panier.length;
}

function afficherAuth() {
  const auth = document.getElementById("auth");
  if (!auth) return;
  const user = localStorage.getItem("user");
  if (user) {
    auth.innerHTML = `Bienvenue, ${user} <a href="#" onclick="logout()">Se déconnecter</a>`;
  } else {
    auth.innerHTML = '<a href="login.html">Se connecter</a>';
  }
}

function connexion(e) {
  e.preventDefault();
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  if (user && pass) {
    localStorage.setItem("user", user);
    alert("Connecté !");
    window.location.href = "index.html";
  } else {
    alert("Veuillez remplir tous les champs.");
  }
}

function logout() {
  localStorage.removeItem("user");
  window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", () => {
  afficherProduits();
  afficherPanier();
  afficherAuth();
});
