let cart = [];

function addToCart(selectedElement) {
    console.log(selectedElement.innerHTML + " pressed");
    let parent = selectedElement.parentNode;
    let h5element = parent.getElementsByTagName("h5");
    let text = h5element[0].innerHTML;
    cart.push(text);
    updateCart()
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

        item.appendChild(deleteButton);
        item.append(cart[i]);

        cartList.append(item);
        dynamicId++;
    }
    if (cart.length === 0) {
        cartList.innerHTML = "Cart Is Empty";
    }
}

function removeFromCart(removeButton) {
    console.log("removeFromCart called");
    let indexToRemove = removeButton.parentNode.id;
    for (let i = 0; i < cart.length; i++) {
        if (i.toString() === indexToRemove) {
            cart.splice(indexToRemove, 1);
            console.log(cart);
            updateCart()
        }
    }
}