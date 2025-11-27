let cart = [];
let prices = [];

function addToCart(selectedElement) {
    console.log(selectedElement.innerHTML + " pressed");
    let parent = selectedElement.parentNode;
    let h5element = parent.getElementsByTagName("h5");
    let pElement = parent.getElementsByTagName("p");
    let text = h5element[0].innerHTML;
    let price = pElement[0].innerHTML;
    cart.push(text);
    prices.push(price);
    updateCart()
    updateTotal()
    console.log(cart);
}

function updateCart() {
    let cartList = document.getElementById("cartItems");
    cartList.innerHTML = "";

    let dynamicId = 0;
    for (let i = 0; i < cart.length; i++) {

        let deleteButton = document.createElement("button")
        deleteButton.innerHTML = "Remove";
        deleteButton.classList.add("btn")
        deleteButton.classList.add("btn-outline-dark")
        deleteButton.classList.add("text-black")
        deleteButton.classList.add("removeButton")
        deleteButton.setAttribute("onClick", "removeFromCart(this)");

        let item = document.createElement("li");
        item.classList.add("cartListItems");
        item.id = dynamicId.toString();

        item.append(prices[i] + " - ");
        item.append(cart[i]);
        item.appendChild(deleteButton);

        cartList.append(item);
        dynamicId++;
    }
    if (cart.length === 0) {
        let empty = document.createElement("li");
        empty.classList.add("cartListItems");
        empty.innerHTML = "Cart Is Empty";
        cartList.prepend(empty);
    }
}

function removeFromCart(removeButton) {
    console.log("removeFromCart called");
    let indexToRemove = removeButton.parentNode.id;
    for (let i = 0; i < cart.length; i++) {
        if (i.toString() === indexToRemove) {
            cart.splice(indexToRemove, 1);
            prices.splice(indexToRemove, 1);
            console.log(cart);
            updateCart()
            updateTotal()
        }
    }
}

function operateSideBar(){
    console.log("operateSideBar called");
    let side = document.getElementById("cartSideBar");
    let ocb = document.getElementById("operateCartButton");

    if (ocb.innerHTML.includes("Cart_Hide.png")) {
        console.log("close");
        side.style.display = "none";
        ocb.innerHTML = '<img src="images/Cart_Show.png" height="50px">';

    }
    else if (ocb.innerHTML.includes("Cart_Show.png")) {
        console.log("open");
        side.style.display = "block";
        ocb.innerHTML = '<img src="images/Cart_Hide.png" height="50px">';
    }
}

function updateTotal(){
    let total = document.getElementById("Total");
    let price = 0.0;

    for (let i = 0; i < prices.length; i++) {
        let cprice = prices[i].slice(1);
        price += parseFloat(cprice);
    }

    total.innerHTML = "€ "+price.toString().slice(0,5);
}