





var list = []
const btn = document.querySelectorAll(".themvaogiohang-btn")

const modalBtn = document.getElementById("modal")
modalBtn.addEventListener("click", updatePrice)

var sum = 0;

Array.from(btn).forEach(function(button){
    
    button.addEventListener("click",function(event){{
        const btnItem = event.target
        const product = btnItem.parentElement
        const productImg = product.querySelector("img").src
        const productName = product.querySelector("a").innerText
        const productPrice = product.querySelector("bdi").innerText
        sum += parseInt(productPrice)
        //console.log(productImg,productName,productPrice)
        addcart(productImg,productName,productPrice)
        //console.log(product)
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


///da sua
function dangky(event) {
    event.preventDefault();

    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const numberphoneInput = document.getElementById("numberphone");
    const passwordInput = document.getElementById("password");

    const usernameError = document.getElementById("usernameError");
    const emailError = document.getElementById("emailError");
    const numberphoneError = document.getElementById("numberphoneError");
    const passwordError = document.getElementById("passwordError");

    const username = usernameInput.value;
    const email = emailInput.value;
    const numberphone = numberphoneInput.value;
    const password = passwordInput.value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?!.*\s).{8,}$/;
    const fullNameRegex = /^[a-zA-Z\sĐđÀÁÂẦẤẨẪẬẮẰẲẴẶẸẺẼỀẾỂỄỆÈÉÊỀẾỂỄỆÍÌỈĨỊÒÓÔỒỐỔỖỘỌỎỐỒỔỖỘỤÙÚỦŨỨỪỬỮỰỲÝỶỸỴàáâầấẩẫậắằẳẵặẹẻẽềếểễệèéêềếểễệíìỉĩịòóôồốổỗộọỏốồổỗộụùúủũứừửữựỳýỷỹỵ]+$/u;
    const phoneNumberRegex = /^\d{10}$/;

    usernameError.textContent = "";
    emailError.textContent = "";
    numberphoneError.textContent = "";
    passwordError.textContent = "";

    let isValid = true;

    if (!fullNameRegex.test(username)) {
        usernameError.textContent = "Vui lòng nhập họ tên hợp lệ.";
        isValid = false;
    }

    if (!emailRegex.test(email)) {
        emailError.textContent = "Vui lòng nhập địa chỉ email hợp lệ.";
        isValid = false;
    }

    if (!phoneNumberRegex.test(numberphone)) {
        numberphoneError.textContent = "Vui lòng nhập số điện thoại hợp lệ (10 chữ số).";
        isValid = false;
    }

    if (!passwordRegex.test(password)) {
        passwordError.textContent = "Mật khẩu không hợp lệ. Mật khẩu phải có ít nhất 8 ký tự, bao gồm ít nhất 1 chữ số, 1 chữ in hoa, 1 chữ thường và 1 ký tự đặc biệt.";
        isValid = false;
    }

    if (isValid) {
        // Kiểm tra xem email đã tồn tại trong localStorage chưa
        const existingUserEmail = localStorage.getItem(email);
        if (existingUserEmail) {
            emailError.textContent = "Email đã được sử dụng. Vui lòng nhập một địa chỉ email khác.";
            return; // Ngừng thực hiện khi email đã tồn tại
        }

        // Kiểm tra xem số điện thoại đã tồn tại trong localStorage chưa
        const existingUserPhone = Object.values(localStorage).find((item) => {
            const storedUser = JSON.parse(item);
            return storedUser.numberphone === numberphone;
        });

        if (existingUserPhone) {
            numberphoneError.textContent = "Số điện thoại đã được sử dụng. Vui lòng nhập một số điện thoại khác.";
            return; // Ngừng thực hiện khi số điện thoại đã tồn tại
        }

        const user = {
            username: username,
            email: email,
            numberphone: numberphone,
            password: password,
        };

        // Lưu thông tin người dùng dưới dạng định danh là email
        const json = JSON.stringify(user);
        localStorage.setItem(email, json);
        alert("Đăng ký thành công!");
        window.location.href = "dangnhap.html";
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const currentUser = sessionStorage.getItem('currentUser');

    if (currentUser) {
        const user = JSON.parse(currentUser);
        const userWelcome = document.getElementById("user-welcome");

        if (userWelcome) {
            userWelcome.textContent = `Xin chào, ${user.name}!`;
        }
    }
});
function login(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const emailError = document.getElementById("email-error");
    const passwordError = document.getElementById("password-error");

    // Lấy thông tin người dùng từ localStorage
    const userData = JSON.parse(localStorage.getItem(email));

    if (!userData) {
        emailError.textContent = "Email không tồn tại. Vui lòng kiểm tra lại hoặc đăng ký.";
        passwordError.textContent = ""; // Đảm bảo không hiển thị lỗi mật khẩu nếu email không tồn tại
        return;
    }

    if (password !== userData.password) {
        emailError.textContent = "";
        passwordError.textContent = "Mật khẩu không chính xác.";
        return;
    }

    // Đăng nhập thành công
    emailError.textContent = "";
    passwordError.textContent = "";

    // Tạo đối tượng người dùng chỉ với tên và email để lưu vào sessionStorage
    const currentUser = {
        name: userData.name,
        email: email
    };

    // Lưu thông tin người dùng vào sessionStorage
    sessionStorage.setItem('currentUser', JSON.stringify(currentUser));

    // Chuyển hướng đến trang chủ
    window.location.href = "trangchu.html";
}

// Hàm kiểm tra trạng thái đăng nhập và thực hiện thanh toán
function checkout() {
    // Kiểm tra xem người dùng đã đăng nhập hay chưa
    const currentUser = sessionStorage.getItem('currentUser');

    if (!currentUser) {
        // Nếu không có thông tin đăng nhập trong sessionStorage, hiển thị cảnh báo và không thực hiện thanh toán
        alert('Vui lòng đăng nhập trước khi thanh toán!');
        return;
    }

    // Nếu đã đăng nhập, thực hiện các thao tác thanh toán ở đây
    // Ví dụ: xử lý thanh toán và reset giỏ hàng

    // Hiển thị cảnh báo thanh toán thành công
    alert('Thanh toán thành công!');

    // Đóng modal sau khi thanh toán (nếu có modal)
    const modalElement = document.getElementById('giohangmodal');
    if (modalElement) {
        const bootstrapModal = new bootstrap.Modal(modalElement);
        bootstrapModal.hide();
    }

    // Reset giỏ hàng và cập nhật giao diện sau khi thanh toán
    resetCart();

    // Nếu muốn ẩn nút "Thanh Toán" sau khi thanh toán thành công, có thể ẩn nút này
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.style.display = 'none';
    }
}

// Sự kiện click vào nút Thanh Toán - chỉ gắn sự kiện khi đã đăng nhập thành công
function handleCheckoutButtonClick() {
    // Kiểm tra trạng thái đăng nhập của người dùng
    const currentUser = sessionStorage.getItem('currentUser');

    if (currentUser) {
        // Nếu đã đăng nhập, gắn sự kiện cho nút Thanh Toán
        const checkoutBtn = document.getElementById('checkoutBtn');
        checkoutBtn.addEventListener('click', checkout);
    } else {
        // Nếu chưa đăng nhập, không gắn sự kiện cho nút Thanh Toán
        alert('Vui lòng đăng nhập trước khi thanh toán!');
    }
}

// Gọi hàm để gắn sự kiện cho nút Thanh Toán
handleCheckoutButtonClick();


//tao bien dem
var count = 0

//them vao gio hang
function addcart(productImg,productName,productPrice){
    //tang so hang trong gio
    list.forEach((item) => {
        item == event.currentTarget.parentElement.children[1].children[0].innerText
        return
    })

    list.push(event.currentTarget.parentElement.children[1].children[0].innerText)
    console.log(event.currentTarget.parentElement.children[1].children[0].innerText)
    document.getElementById("cartCount").innerText = ++count
    const addtr = document.createElement("tr")
    const cartItem = document.querySelectorAll("tbody tr")
    for (var i = 0; i < cartItem.length ; i++){
        const productT = document.querySelectorAll(".tensp-giohang")
        if(productT[i].innerHTML == productName){
            const inputCheck = cartItem[i].querySelector("input")
            const themsoluong = parseInt(inputCheck.value)
            themsoluong++;
            inputCheck.value = themsoluong;
            console.log(themsoluong)
            cartIteam.remove()
            
        }
    }

    const trcontent = '<tr class="bodytable"><td><img src='+productImg+' alt="" style="width: 70px;"></td><td style="padding-left: 20px;"><a href=""><span class = "tensp-giohang">'+productName+'</span></a></td><td><bdi>'+productPrice+'</bdi></td><td style="padding: 20px;"><input type="number" value="1" min="0" id="input" onChange="updateCart()" style="width: 30px; outline: none;"></td><td style="cursor: pointer; padding: 20px;;"><span id="deletesp" onclick="deleteCart()">Xóa</span></td></tr>'
    addtr.innerHTML = trcontent
    const cartTable = document.querySelector("tbody")
  
    cartTable.append(addtr);
  
}
const them = document.querySelectorAll(".product-name a")
them.forEach(function(a){

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
       
        totalA = inputValue * productPrice *1000
        totalC = totalC +totalA
        totalD = totalC.toLocaleString('de-DE')
        
    }
    const cartTotalA = document.querySelector(".modal-footer span")
    cartTotalA.innerHTML = totalD
}
//Xóa sản phẩm
function deleteCart(){
    const cartDelete = event.target
    const cartIteam = cartDelete.parentElement.parentElement
    const price = event.target.parentElement.parentElement.children[2].children[0].innerText
    const mul = event.target.parentElement.parentElement.children[3].children[0].value
    const rowValue = parseInt(price) * parseInt(mul)
    sum -= rowValue
    updatePrice()
    cartIteam.remove()
}

function updatePrice() {
    const sum = calculateCartTotal(); // Tính tổng tiền của giỏ hàng
    const totalPriceElement = document.getElementById('tongtien');
    totalPriceElement.innerText = sum.toLocaleString('de-DE') + '.000đ'; // Hiển thị tổng tiền có định dạng
}

// Hàm tính tổng tiền của giỏ hàng
function calculateCartTotal() {
    let sum = 0;
    const cartItems = document.querySelectorAll('.modal-body tbody tr');

    cartItems.forEach((item) => {
        const priceText = item.querySelector('td:nth-child(3) bdi').innerText;
        const price = parseFloat(priceText.replace(',', '')); // Chuyển đổi giá thành số
        const quantity = parseInt(item.querySelector('td:nth-child(4) input').value);
        sum += price * quantity;
    });

    return sum;
}



function updateCart() {
    const price = event.target.parentElement.parentElement.children[2].children[0].innerText
    const before = event.target.parentElement.parentElement.children[3].children[0].defaultValue
    const mul = event.target.parentElement.parentElement.children[3].children[0].value
    sum += parseInt(price) * (parseInt(mul) - parseInt(before))
    event.target.parentElement.parentElement.children[3].children[0].defaultValue = mul
    updatePrice()
}


// Hàm reset giỏ hàng
function resetCart() {
    const cartItems = document.querySelectorAll('.modal-body tbody tr');

    cartItems.forEach((item) => {
        item.remove(); 
    });

    count = 0;
    document.getElementById("cartCount").innerText = count; 
    sum = 0;
    updatePrice(); 
}

