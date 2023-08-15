const card = document.getElementsByClassName("card");
const btnAdd = document.getElementsByClassName("btn-info");
const btnCard = document.querySelector(".btn-cart");
const cartList = document.querySelector(".shopping-cart-list");

class Shopping {
    constructor(image, title, price) {
        this.image = image;
        this.title = title;
        this.price = price;
    }
}
class UI {
    addToCart(shopping) {
        const listItem = document.createElement("div");
        listItem.classList = "list-item";

        listItem.innerHTML =  // backtick karakterleri(win: alt gr + , tuşlarıyla yapılır) içerisinde yazmamızın sebebi içerisine javascript kodu yazacağımız için
            `
           <div class="row align-items-center text-white-50">
                <div class="col-md-3">
                    <img src="${shopping.image}" alt="Product" class="img-fluid" style="width:150px; height:60px;"/>
                </div>
                <div class="col-md-5">
                    <div class="title">${shopping.title}</div>
                </div>
                <div class="col-md-2">
                    <div class="title">${shopping.price}</div>
                </div>
                <div class="col-md-2">
                    <button class="btn btn-delete">
                      <i class="fas fa-trash-alt text-danger"></i>
                    </button>
                </div>
            </div>
    `
        cartList.appendChild(listItem);
    }

    removeCart() {
        let btnRemove = document.getElementsByClassName("btn-delete");
        let self = this; // tıkladığımız remove elemanı

        for (let i = 0; i < btnRemove.length; i++) {
            btnRemove[i].addEventListener("click", function () {
                this.parentElement.parentElement.parentElement.remove(); // 3 tane parent elemeni olduğu için
                self.cardCount();
            })
        }

    }

    cardCount() {
        let cartListItem = cartList.getElementsByClassName("list-item");
        let itemCount = document.getElementById("item-count");
        itemCount.innerHTML = cartListItem.length;

    }

    //Cart Toggle
    cardToggle() // sepet ikonuna basınca açılacak tekrar bastığımızda sepet kapanacak
    {
        btnCard.addEventListener("click", function () {
            cartList.classList.toggle("d-none");
        })
    }

}

for (let i = 0; i < card.length; i++) {
    btnAdd[i].addEventListener("click", function (e) { // hangi butona tıklanırsa ona fonksiyon yazılacak
        let title = card[i].getElementsByClassName("card-title")[0].textContent;
        let price = card[i].getElementsByClassName("price")[0].textContent;
        let image = card[i].getElementsByClassName("card-img-top")[0].src;

        btnAdd[i].classList.add("disabled"); // bir kere sepete eklendikten sonra daha eklenememesi için
        btnAdd[i].textContent = "In Card"; // bir kere sepete eklendikten sonra In Cart(sepetinde) yazacak

        let shopping = new Shopping(image, title, price);
        let ui = new UI();

        ui.addToCart(shopping); // eklenen ürün bilgileri addToCart içerisine gönderiliyor
        ui.removeCart();
        ui.cardCount();

        e.preventDefault();  // bir linke gitmesini engellemek için
    })
}

document.addEventListener("DOMContentLoaded",()=>{ // sayfa yüklendiğinde çalışacak
    let ui=new UI();

    ui.cardToggle();
})