//Récupération du panier
let cart = document.querySelector(".cart__item");
let copyOfLS = JSON.parse(localStorage.getItem("products"));

main();

function main() {
  displayCart();
  countTotalInCart();
  toEmptyCart();
  checkFormAndPostRequest();
}

function displayCart() {
  let test = document.querySelector(".cart__item__content__settings__delete");
  let cartCard = document.querySelector(".cart");
  let emptyCart = document.querySelector(".if-empty-cart");

  // Si le tableau copié du localStorage contient au moins un objet, on affiche le panier et on supprime le message d'erreur.
   if (localStorage.getItem("products")) {
    console.log(localStorage.getItem("products"));
    cartCard.style.display = "flex";
    cartCard.style.flexDirection = "column";
    cartCard.style.justifyContent = "space-around";
    emptyCart.style.display = "none";
  } 

  // Pour chaque objet dans le tableau copié du localStorage, on crée les divs de l'affichage du panier et on les remplit avec les données du tableau.
  for (const produit in copyOfLS) {
    console.log(produit);

    console.log(copyOfLS[produit]);
    //Création de l'article
    let mainBloc = document.querySelector("#cart__items");
    let articleBloc = document.createElement("article");
    articleBloc.className="cart__item";
    mainBloc.appendChild(articleBloc);


    //Insertion de l'image du produit
    let imageProductBloc = document.createElement("div");
    let imageProduct = document.createElement("img");
    imageProduct.src = copyOfLS[produit].img;
    imageProduct.alt = copyOfLS[produit].name;
    let articlieBloc = document.querySelectorAll(".cart__item");
    //console.log(articlieBloc);
    articlieBloc[produit].appendChild(imageProductBloc);
    imageProductBloc.appendChild(imageProduct);
    imageProductBloc.className="cart__item__img";


    //Insertion du nom et prix du produit
    let detailsDiv = document.createElement("div");
    detailsDiv.className="cart__item__content";
    articlieBloc[produit].appendChild(detailsDiv);
    let nameAndPriceDiv = document.createElement("div");
    nameAndPriceDiv.className="cart__item__content__titlePrice";
    detailsDiv.appendChild(nameAndPriceDiv);
    let nameProduct = document.createElement("h2");
    nameAndPriceDiv.appendChild(nameProduct);
    nameProduct.innerHTML = copyOfLS[produit].name;
    let priceOfProduct = document.createElement("p");
    nameAndPriceDiv.appendChild(priceOfProduct);
    priceOfProduct.innerHTML = new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(copyOfLS[produit].price * copyOfLS[produit].quantity);


  //Insertion de la quatit;e et du bouton supprimer
   let blocQte = document.createElement("div");
   detailsDiv.appendChild(blocQte);
   blocQte.className="cart__item__content__settings";
   let blocQtee = document.createElement("div");
   blocQte.appendChild(blocQtee);
   blocQtee.className="cart__item__content__settings__quantity";
   let libelle = document.createElement("p");
   blocQtee.appendChild(libelle);
   libelle.innerHTML = 'Qté';
   let inputQte = document.createElement("input");
   blocQtee.appendChild(inputQte);
   inputQte.className="itemQuantity";
   inputQte.name="itemQuantity";
   inputQte.max=100;
   inputQte.min=1;
   inputQte.type="number";
   inputQte.value=copyOfLS[produit].quantity;

   let supBloc = document.createElement("div");
   supBloc.className="cart__item__content__settings__delete";
   blocQte.appendChild(supBloc);
   let libelleSup = document.createElement("p");
   supBloc.appendChild(libelleSup);
   libelleSup.className="deleteItem";
   libelleSup.innerHTML = 'Supprimer';
 
  }
}

function countTotalInCart() {
  let arrayOfPrice = [];
  let allQte = 0;
  let totalPrice = document.querySelector("#totalPrice");
  let totalQte = document.querySelector("#totalQuantity");


 // console.log(allQte);

  // On push chaque prix du DOM dans un tableau
  let productPriceAccordingToQuantity = document.querySelectorAll(".cart__item__content__titlePrice>p");
  ///let productPriceAccordingToQuantity = document.querySelectorAll(".price");
  //console.log('prix:', productPriceAccordingToQuantity );
  //console.log('qite:', qteP);
  for (let price in productPriceAccordingToQuantity) {
    arrayOfPrice.push(productPriceAccordingToQuantity[price].innerHTML);

  }


//On récupère la quntité
  let qteAll = document.querySelectorAll(".cart__item__content__settings__quantity>input");
  console.log(qteAll);
  for (let one in qteAll) {
    if(qteAll[one].value!=undefined){
      console.log(qteAll[one].valueAsNumber);
      let convertit = parseFloat(qteAll[one].value);
      allQte = allQte + qteAll[one].valueAsNumber;
    }
   /// allQte = allQte + qteAll[qte].valueAsNumber;
   
  }
  totalQte.innerHTML = allQte;


  // On enlève les undefined du tableau
  arrayOfPrice = arrayOfPrice.filter((el) => {
    return el != undefined;
  });

  // Transformer en nombre chaque valeur du tableau
  arrayOfPrice = arrayOfPrice.map((x) => parseFloat(x));

  // Additionner les valeurs du tableau pour avoir le prix total
  const reducer = (acc, currentVal) => acc + currentVal;
  arrayOfPrice = arrayOfPrice.reduce(reducer);

  // Affichage du prix avec formatage €

  totalPrice.innerHTML = (arrayOfPrice = new Intl.NumberFormat(
    "fr-FR",
    {
      style: "currency",
      currency: "EUR",
    }
  ).format(arrayOfPrice))
  console.log(totalPrice);
}

function toEmptyCart() {
  // Lorsque qu'on clique sur le bouton, le panier se vide ainsi que le localStorage
/*   const buttonToEmptyCart = document.querySelector(".to-empty-cart");
  buttonToEmptyCart.addEventListener("click", () => {
    localStorage.clear();
  }); */
}

function checkFormAndPostRequest() {

  // On récupère les inputs depuis le DOM.
  const submit = document.querySelector("#order");
  let inputName = document.querySelector("#firstName");
  let inputLastName = document.querySelector("#lastName");
  let inputCity = document.querySelector("#city");
  let inputAdress = document.querySelector("#address");
  let inputMail = document.querySelector("#email");
  let erreur = document.querySelector(".erreur");

  // Lors d'un clic, si l'un des champs n'est pas rempli, on affiche une erreur, on empêche l'envoi du formulaire.
  submit.addEventListener("click", function(){
  // alert('bouton click');

  // alert('prenom'+inputName);
  // alert('nom'+inputLastName);
   //alert('address'+inputAdress);
  // alert('ville'+inputCity);
  // alert('mail'+inputMail);

    if(!inputName.value || !inputLastName.value || !inputCity.value || !inputAdress.value || !inputMail.value) 
    {
     // alert('Allo err');
      erreur.innerHTML = "Vous devez renseigner tous les champs !";
      //e.preventDefault();
    } 
    else 
    {
     // alert('OK');
      // Si le formulaire est valide, le tableau productsBought contiendra un tableau d'objet qui sont les produits acheté, et order contiendra ce tableau ainsi que l'objet qui contient les infos de l'acheteur
      let productsBought = [];
      productsBought.push(copyOfLS);

      const order = {
        contact: {
          firstName: inputName.value,
          lastName: inputLastName.value,
          city: inputCity.value,
          address: inputAdress.value,
          email: inputMail.value,
        },
        products: productsBought,
      };
      // -------  Envoi de la requête POST au back-end --------
      // Création de l'entête de la requête
      const options = {
        method: "POST",
        body: JSON.stringify(order),
        headers: { 
          "Content-Type": "application/json"
         },
      };

      // Préparation du prix formaté pour l'afficher sur la prochaine page
      let priceConfirmation = document.querySelector("#totalPrice").innerText;
     // alert('priceConfirmation');
     // alert(priceConfirmation);
      priceConfirmation = priceConfirmation.split(" :");
      //alert('encodre le prix'+priceConfirmation);

      // Envoie de la requête avec l'en-tête. On changera de page avec un localStorage qui ne contiendra plus que l'order id et le prix.
      fetch("http://localhost:3000/api/products/order", options)
        .then((response) => response.json())
        .then((data) => {
          localStorage.clear();
          console.log(data)
          localStorage.setItem("orderId", data.orderId);
          localStorage.setItem("total", priceConfirmation[1]);

          //  On peut commenter cette ligne pour vérifier le statut 201 de la requête fetch. Le fait de préciser la destination du lien ici et non dans la balise <a> du HTML permet d'avoir le temps de placer les éléments comme l'orderId dans le localStorage avant le changement de page.
          document.location.href = "confirmation.html";
        })
        .catch((err) => {
          alert("Il y a eu une erreur : " + err);
        });
      }
  });
}
