const LOCAL_KEY = 'login';

const btn = document.querySelectorAll(".themvaogiohang-btn")
//
btn.forEach(function(button){
    
    button.addEventListener("click",function(event){{
        const btnItem = event.target
        const product = btnItem.parentElement
        const productImg = product.querySelector("img").src
        const productName = product.querySelector("a").innerText
        const productPrice = product.querySelector("bdi").innerText
        //console.log(productImg,productName,productPrice)
        addcart(productImg,productName,productPrice)
        console.log(product)
        cartCount++;
        updateCartCount();
        deleteCart()
        //localStorage.setItem(productImg,productName,productPrice)
    }})

})
const cartCount = 0;

function updateCartCount() {
    // Hiển thị số lượng trên giao diện
    const cartCountElement = document.getElementById('cartCount');
    cartCountElement.innerText = cartCount;
    console.log(cartCount)
}

function dangky(e){
    event.preventDefault();
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const numberphone = document.getElementById("numberphone").value;
    const password = document.getElementById("password").value;
    const user     = {
        username : username,
        email : email,
        password : password,
    }
    const json = JSON.stringify(user);
    const userLocal = localStorage.getItem(LOCAL_KEY);
    const dataParse = JSON.parse(userLocal);
    if(dataParse) {
        if(dataParse.email === email) alert("Bạn đã đăng ký tài khoản này rồi")
        return;
    }
    localStorage.setItem(LOCAL_KEY,json);
    alert("Đăng ký thành công!");
    window.location.href="dangnhap.html"
}
function login(e){
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const user = localStorage.getItem(LOCAL_KEY);
    const data = JSON.parse(user);
    console.log('#Duy Phan console', data)
    if(user == null ){
        alert("Vui lòng nhập email và mật khẩu");
    }
    else if(email == data.email && password == data.password ){
        alert("Đăng nhập thành công!");
        window.location.href="trangchu.html"
    }
    else{
        alert("Đăng nhập thất bại!");
    }
}
//them vao gio hang
function addcart(productImg,productName,productPrice){
    const addtr = document.createElement("tr")
    const cartItem = document.querySelectorAll("tbody tr")
    for ( const i = 0; i < cartItem.length ; i++){
        var productT = document.querySelectorAll(".tensp-giohang")
        if(productT[i].innerHTML == productName){
            const inputCheck = cartItem[i].querySelector("input")
            const themsoluong = parseInt(inputCheck.value)
            themsoluong++;
            inputCheck.value = themsoluong;
            console.log(themsoluong)
            cartIteam.remove()
        }
    }

    var trcontent = '<tr class="bodytable"><td><img src='+productImg+' alt="" style="width: 70px;"></td><td style="padding-left: 20px;"><a href=""><span class = "tensp-giohang">'+productName+'</span></a></td><td><bdi>'+productPrice+'</bdi><span class="price">đ</span></td><td style="padding: 20px;"><input type="number" value="1" min="0" style="width: 30px; outline: none;"></td><td style="cursor: pointer; padding: 20px;;"><span class="deletesp">Xóa</span></td></tr>'
    addtr.innerHTML = trcontent
    var cartTable = document.querySelector("tbody")
    //console.log(cartTable)
    cartTable.append(addtr);
    cartTotal()
}
const them = document.querySelectorAll(".product-name a")
console.log('#Duy Phan console', them)
them?.forEach(function(a){

    a.addEventListener("click",function(event){{
        const btnAdd = event.target
        const product = btnAdd.parentElement
        const productImg = products.querySelector("img").src
        const productName = product.querySelector("a").innerText
        const productPrice = product.querySelector("bdi").innerText
        console.log(productImg)
    }})
})
function cartTotal(){
    const cartItem = document.querySelectorAll("tbody tr")
    const totalC = 0
    //console.log(cartItem.length)
    for ( const i = 0; i < cartItem.length ; i++){
        const inputValue = parseFloat(cartItem[i].querySelector("input").value)
        const productPrice = parseFloat(cartItem[i].querySelector("bdi").innerHTML)
        //var newsproductPrice = productPrice.split('.').join("")
        //console.log(inputValue)
        //console.log(productPrice)
        totalA = inputValue * productPrice *1000
        totalC = totalC +totalA
        totalD = totalC.toLocaleString('de-DE')
        
    }
    const cartTotalA = document.querySelector(".modal-footer span")
    cartTotalA.innerHTML = totalD
}
//Xóa sản phẩm
function deleteCart(){
    const cartItem = document.querySelectorAll("tbody tr")
    for ( const i = 0; i < cartItem.length ; i++){
        const productT = document.querySelectorAll(".deletesp")
        productT[i].addEventListener("click",function(event){
            const cartDelete = event.target
            const cartIteam = cartDelete.parentElement.parentElement
            cartIteam.remove()
        })
    }
}