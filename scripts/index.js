main();

function main() {
  getArticles();
}

// Récupérer les articles depuis l'API
function getArticles() {
  fetch("http://localhost:3000/api/products")
    .then(function (res) {
      return res.json();
    })
    .catch((error) => {
      let productsContainer = document.querySelector(".items");
      productsContainer.innerHTML =
      "Nous n'avons pas réussi à afficher vos produits. Avez vous bien lancé le serveur local (Port 3000) ? <br>Si le problème persiste, contactez votre hébergeur.";
      productsContainer.style.textAlign = "center";
      productsContainer.style.padding = "30vh 0";
    })

    // Dispatcher les données de chaque produit (prix, nom...) dans le DOM
    .then(function (resultatAPI) {
      const articles = resultatAPI;
      console.log(articles);
      
      for (let article in articles) {
        let productsContainer = document.querySelector(".items");
        let lienActu = document.querySelectorAll(".items>a");
          let lienProduit = document.createElement("a");
          lienProduit.href=`product.html?id=${resultatAPI[article]._id}`;
          productsContainer.appendChild(lienProduit);
          let articleProduit = document.createElement("article");
          lienProduit.appendChild(articleProduit);
  
          let imageProduct = document.createElement("img");
          imageProduct.src = resultatAPI[article].imageUrl;
          imageProduct.alt = resultatAPI[article].name;
          articleProduit.appendChild(imageProduct);
  
          let titreProduct = document.createElement("h3");
          titreProduct.className="productName";
          titreProduct.innerHTML = resultatAPI[article].name;
          articleProduit.appendChild(titreProduct);

          let priceProduct = document.createElement("p");
          articleProduit.appendChild(priceProduct);
          priceProduct.innerHTML = new Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: "EUR",
          }).format(resultatAPI[article].price); 
  
          let descProduct = document.createElement("p");
          descProduct.className="productDescription";
          descProduct.innerHTML = resultatAPI[article].description;
          articleProduit.appendChild(descProduct);
      }


    });
}
