"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const [cart, setCart] = useState([]);
  const [products] = useState([
    {
      id: 1,
      name: "T-shirt",
      price: 20,
      category: "vetements",
      image: "/image/tshirt.jpg",
    },
    {
      id: 2,
      name: "Casque",
      price: 15,
      category: "accessoires",
      image: "/image/casque.jpg",
    },
    {
      id: 3,
      name: "Sac",
      price: 35,
      category: "accessoires",
      image: "/image/sac.jpg",
    },
    {
      id: 4,
      name: "Jeans",
      price: 40,
      category: "vetements",
      image: "/image/jeans.jpg",
    },
  ]);
  const [activeCategory, setActiveCategory] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    const savedUser = localStorage.getItem("user");
    if (!savedUser) {
      router.push("/login");
    } else {
      setUser(savedUser);
      const savedCart = JSON.parse(localStorage.getItem("panier")) || [];
      setCart(savedCart);
    }
  }, [router]);

  const addToCart = (product) => {
    const newCart = [...cart, product];
    setCart(newCart);
    localStorage.setItem("panier", JSON.stringify(newCart));
    alert("Produit ajouté au panier !");
  };

  const clearCart = () => {
    localStorage.removeItem("panier");
    setCart([]);
    alert("Panier vidé !");
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("panier");
    setCart([]);
    alert("Déconnecté !");
    router.push("/login");
  };

  const total = cart.reduce((sum, item) => sum + (Number(item.price) || 0), 0);

  const filteredProducts = activeCategory
    ? products.filter((p) => p.category === activeCategory)
    : products;

  if (!isClient || !user) {
    return <div className="text-center text-gray-500">Chargement...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <header className="mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Boutique</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Bienvenue, {user}</span>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Déconnexion
            </button>
          </div>
        </div>
        <nav className="mt-4 flex gap-2">
          <button
            onClick={() => setActiveCategory("")}
            className={`px-4 py-2 rounded ${
              activeCategory === "" ? "bg-blue-500 text-white" : "bg-gray-200"
            } hover:bg-blue-400 transition`}
          >
            Tous
          </button>
          <button
            onClick={() => setActiveCategory("vetements")}
            className={`px-4 py-2 rounded ${
              activeCategory === "vetements"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            } hover:bg-blue-400 transition`}
          >
            Vêtements
          </button>
          <button
            onClick={() => setActiveCategory("accessoires")}
            className={`px-4 py-2 rounded ${
              activeCategory === "accessoires"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            } hover:bg-blue-400 transition`}
          >
            Accessoires
          </button>
        </nav>
      </header>

      <main className="flex gap-8">
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-4">Produits</h2>
          <div className="grid grid-cols-2 gap-4">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                className="border border-gray-200 p-4 rounded-lg text-center shadow-sm hover:shadow-md transition"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-auto rounded-lg mb-2"
                />
                <h3 className="text-lg font-medium">{p.name}</h3>
                <p className="text-gray-600">{p.price}$</p>
                <button
                  onClick={() => addToCart(p)}
                  className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                >
                  Ajouter au panier
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-0.5">
          <h2 className="text-2xl font-semibold mb-4">Panier</h2>
          {cart.length === 0 ? (
            <p className="text-gray-500">Votre panier est vide.</p>
          ) : (
            <>
              <ul className="mb-4">
                {cart.map((item, i) => (
                  <li key={i} className="text-gray-700">
                    {item.name} - {item.price}$
                  </li>
                ))}
              </ul>
              <p className="font-semibold">Total : {total}$</p>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={clearCart}
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
                >
                  Vider le panier
                </button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                  Payer
                </button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
