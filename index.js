// const refs = {
//   localBtn: document.querySelector(".local-btn"),
//   sessionBtn: document.querySelector(".session-btn"),
// };

// refs.localBtn.addEventListener("click", onLocale);
// refs.sessionBtn.addEventListener("click", onSession);

// function onLocale(e) {
//   localStorage.setItem("locale", JSON.stringify([1, 2, 3]));
// }

// function onSession(e) {
//   sessionStorage.setItem("session", "session");

//   const getItem = JSON.parse(localStorage.getItem("locale"));
//   localStorage.removeItem("locale");

//   if (getItem) {
//     getItem.forEach((element) => {
//       console.log(element);
//     });
//   }
// }

// const errorPage = document.querySelector(".error-page")

// const a = 5;

// try {
//   const result = Math.random()
//   if (result > 0.5) {
//     throw new Error ("My custom error")
//   }
// } catch (error) {
//   errorPage.innerHTML = "<img src = "https://miro.medium.com/max/700/1*cLQUX8jM2bMdwMcV2yXWYA.jpeg">"
// }

// console.log("Hello world a");

const instruments = [
  {
    id: 1,
    img: "https://static.dnipro-m.ua/cache/products/1754/catalog_origin_141546.jpg",
    name: "Молоток",
    price: 150,
  },
  {
    id: 2,
    img: "https://static.dnipro-m.ua/cache/products/5098/catalog_origin_195568.jpg",
    name: "Перфоратор",
    price: 3000,
  },
  {
    id: 3,
    img: "https://static.dnipro-m.ua/cache/products/2023/catalog_origin_200763.jpg",
    name: "Рівень",
    price: 2000,
  },
];

const goods = document.querySelector(".goods");
const selectedGoods = document.querySelector(".selected-goods");
let selectedFavGoods = JSON.parse(localStorage.getItem("Favorite")) || [];
let selectedBaskGoods = JSON.parse(localStorage.getItem("Basket")) || [];

const marcupAllCards = instruments
  .map(
    ({
      id,
      img,
      name,
      price,
    }) => `<li class = "card" data-id = ${id}><img class="cardImg" src = ${img} alt = ${name}>
<p class = "cardName">${name}</p>
<p class = "cardPrice">${price}</p>
<button type = "button" class = "js-addFav"> Додати в обране</button>
<button type = "button" class = "js-addBask"> Додати в кошик</button></li>`
  )
  .join("");

goods.insertAdjacentHTML("afterbegin", marcupAllCards);

const favBtn = document.querySelector(".favorite");
const baskBtn = document.querySelector(".basket");

function onClickFavorite(e) {
  const favoriteGoods = selectedFavGoods
    .map(
      ({
        id,
        img,
        name,
        price,
      }) => `<li class = "card" data-id = ${id}><img class="cardImg" src = ${img} alt = ${name}>
<p class = "cardName">${name}</p>
<p class = "cardPrice">${price}</p>
<button type = "button" class = "js-addBask"> Додати в кошик</button></li>`
    )
    .join("");

  console.log(favoriteGoods);

  selectedGoods.innerHTML = favoriteGoods;
}

function onClickBasket(e) {}

function onClickButtonCards(evt) {
  const isAddFav = evt.target.classList.contains("js-addFav");
  const isAddBask = evt.target.classList.contains("js-addBask");

  if (isAddFav) {
    const selectedCard = evt.target.closest("li");
    const selectedId = selectedCard.dataset.id;

    if (!selectedBaskGoods.some(({ id }) => id === Number(selectedId))) {
      const selectedItem = instruments.find(
        ({ id }) => id === Number(selectedId)
      );

      selectedBaskGoods.push(selectedItem);
      localStorage.setItem("Favorite", JSON.stringify(selectedFavGoods));
    }

    if (isAddBask) {
      const selectedBaskCard = evt.target.closest("li");
      console.log(selectedBaskCard);
      // const selectedBaskId = selectedBaskCard.dataset.id;
      // const inBasket = selectedBaskGoods.find(
      //   ({ id }) => id === Number(selectedBaskId)
      // );
      // if (inBasket) {
      //   inBasket.qty += 1;
      // } else {
      //   const selectedBaskItem = instruments.find(
      //     ({ id }) => id === Number(selectedBaskId)
      //   );
      //   selectedBaskItem.qty = 1;
      //   selectedBaskGoods.push(selectedBaskItem);
      // }

      // localStorage.setItem("Basket", JSON.stringify(selectedFavGoods));
    }
  }
}

favBtn.addEventListener("click", onClickFavorite);
baskBtn.addEventListener("click", onClickBasket);
goods.addEventListener("click", onClickButtonCards);
