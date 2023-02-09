// Variables and consts
const cart = document.querySelector('#cart');
const gameList = document.querySelector('#game-list');
const cartContent = document.querySelector('#cart-list tbody');
const emptyCartBtn = document.querySelector('#empty-cart'); 
let cartItems = [];

// Listeners
loadEventListeners();

function loadEventListeners() {
     // Triggers when "Add to cart" is clicked
     gameList.addEventListener('click', addGame);

     // Triggers when we remove a game from the cart
     cart.addEventListener('click', removeGame);

     // Triggers when we empty the cart
     emptyCartBtn.addEventListener('click', emptyCart);

}


// Functions
// Function to add a game to the cart
function addGame(e) {
     e.preventDefault();
     if(e.target.classList.contains('add-to-cart')) {
          const game = e.target.parentElement.parentElement;
          // We take the data from the game selected
          readGameData(game);
     }
}

// Reads game data
function readGameData(game) {
     const infoGame = {
          image: game.querySelector('img').src,
          name: game.querySelector('h4').textContent,
          price: game.querySelector('.price span').textContent,
          id: game.querySelector('a').getAttribute('data-id'), 
          quantity: 1
     }


     if( cartItems.some( game => game.id === infoGame.id ) ) { 
          const games = cartItems.map( game => {
               if( game.id === infoGame.id ) {
                    game.quantity++;
                     return game;
                } else {
                     return game;
             }
          })
          cartItems = [...games];
     }  else {
          cartItems = [...cartItems, infoGame];
     }

     // console.log(cartItems)
     htmlCart();
}

// Removes the game from the cart in the DOM
function removeGame(e) {
     e.preventDefault();
     if(e.target.classList.contains('remove-game') ) {
          // e.target.parentElement.parentElement.remove();
          const gameId = e.target.getAttribute('data-id')
          
          cartItems = cartItems.filter(game => game.id !== gameId);

          htmlCart();
     }
}


// Shows the selected game in the cart
function htmlCart() {

     emptyCart();

     cartItems.forEach(game => {
          const row = document.createElement('tr');
          row.innerHTML = `
               <td>  
                    <img src="${game.image}" width=100>
               </td>
               <td>${game.name}</td>
               <td>${game.price}</td>
               <td>${game.quantity} </td>
               <td>
                    <a href="#" class="remove-game" data-id="${game.id}">X</a>
               </td>
          `;
          cartContent.appendChild(row);
     });

}

// Removes the games from the cart in the DOM
function emptyCart() {
    
     while(cartContent.firstChild) {
          cartContent.removeChild(cartContent.firstChild);
      }
}
