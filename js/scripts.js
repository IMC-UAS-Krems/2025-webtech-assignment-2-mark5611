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

function proceedToCheckout() {
    let side = document.getElementById("SideTab");

    operateSideBar()
    side.style.display = "block";
    SumUp.style.display = "none";
    side.scrollIntoView(); /*https://stackoverflow.com/questions/8773921/how-to-automatically-scroll-down-a-html-page*/
}



// used preplexity because I couldn't figure out how to stop the page form reloading after submitting the form
window.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('stopReloadForm');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            return;
        }

        form.classList.add('was-validated');

        showCheckoutPage();
    });
});

function showCheckoutPage() {
    let SumUp = document.getElementById("SumUp");
    let SideTab = document.getElementById("SideTab");

    let gtotal = document.getElementById("gtotal");

    let itemList = document.getElementById("itemList");
    itemList.innerHTML = "";
    for (let i = 0; i < cart.length; i++) {
        let entry = document.createElement("li");
        let hr = document.createElement("hr");
        hr.classList.add("itemListHr");
        entry.innerHTML = cart[i]
        itemList.appendChild(entry);
        itemList.appendChild(hr);
    }

    gtotal.style.display = "none";
    SideTab.style.display = "none";
    SumUp.style.display = "block";
    discount()
}

function discount(){
    let totalAmount = document.getElementById("totalAmount");
    let taxes = document.getElementById("taxes");
    let discount = document.getElementById("discount");
    let sum = 0

    for (let i = 0; i < prices.length; i++) {
        sum += parseFloat(prices[i].slice(1));
        console.log(sum);
    }

    if(cart.length >= 3){
        let beforeDiscount = sum;
        let list = document.getElementById("1234");
        list.innerHTML = "";
        sum *= 0.7;
        let idk = document.createElement("li");
        let idk2 = document.createElement("li");
        idk.innerHTML = "Discount Granted, €" + (beforeDiscount-sum).toFixed(2).toString() + " Has Been Deducted From Your Total";
        list.appendChild(idk);
        idk2.innerHTML = "Items Taxed At 13% Makes: +€" + (sum*0.13).toFixed(2).toString()
        list.appendChild(idk2);
        sum+=sum*0.13;
        totalAmount.innerHTML = "€" + sum.toFixed(2).toString();
    }
    else{
        let list = document.getElementById("1234");
        list.innerHTML = "";
        let idkanymore = document.createElement("li");
        let idkanymore2 = document.createElement("li");
        idkanymore.innerHTML = "Purchased Items Do Not Reach The Limit To Apply The Discount";
        list.appendChild(idkanymore);
        idkanymore2.innerHTML = "Items Taxed At 13% Makes: +€"+ (sum*0.13).toFixed(2)
        list.appendChild(idkanymore2);
        sum+=sum*0.13;
        totalAmount.innerHTML = "€" + sum.toFixed(2).toString();
    }
}


