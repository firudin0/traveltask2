const product = document.getElementById("product");
const cartz = document.getElementById("cartz");
const loadMoreBtn = document.getElementById("load");
const button = document.getElementById("btn");
const input = document.getElementById("inp");

const limit = 4;
let page = 1;

async function get() {
  const skip = (page - 1) * limit;
  const res = await axios.get(
    `https://655c844f25b76d9884fd70a7.mockapi.io/products?limit=${limit}&page=${page}`
  );
  const data = await res.data;
  db = data;
  db.map((item) => {
    const box = document.createElement("div");
    box.className = "boxs ";
    box.innerHTML = `
        <div class="divz">
        <img src="${item.image}" alt="">
        <div class="divc">
            <p>${item.title}</p>
        </div>
        <p>$ ${item.price}</p>
    <button onclick="addToCart(${item.id})">Sebete Ekle</button>
    <button onclick="addToHeart(${item.id})"><i class="fa-solid fa-heart"></i></button>
            </div>
        `;
    product.appendChild(box);
  });

  page++;
}

function addToCart(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(db.find((item) => item.id == index));
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToHeart(index) {
  const heart = JSON.parse(localStorage.getItem("heart")) || [];
  heart.push(db.find((item) => item.id == index));
  localStorage.setItem("heart", JSON.stringify(heart));
}

loadMoreBtn.addEventListener("click", get);

function getSearch() {
  product.innerHTML = "";
  axios
    .get("https://655c844f25b76d9884fd70a7.mockapi.io/products")
    .then((res) => {
      db = res.data;
      const filterData = db.filter((item) =>
        item.title.toLowerCase().startsWith(input.value.toLowerCase())
      );
      console.log(filterData);
      filterData.map((item) => {
        const box = document.createElement("div");
        box.className = "boxs ";
        box.innerHTML = `
            <div class="divz">
            <img src="${item.image}" alt="">
            <div class="divc">
                <p>${item.title}</p>
            </div>
            <p>$ ${item.price}</p>
            <button onclick="addToCart(${item.id})">Sebete Ekle</button>
           
                </div>
               
            `;
        product.appendChild(box);
      });
    });
}

button.addEventListener("click", getSearch);

get();



//Form js

const form1 = document.getElementById("form1");
const namee = document.getElementById("name");
const email = document.getElementById("email");
const textare = document.getElementById("textare");

form1.addEventListener("submit", (e) => {
  e.preventDefault();

  axios.post("https://655c844f25b76d9884fd70a7.mockapi.io/basket", {
    email: email.value,
    name: namee.value,
    textare: textare.value
  })

  .then((res) => {
    console.log(res.data);
  });
  
});




// sort js

const max = document.getElementById('max')
const min = document.getElementById('min')

function maxFunc(){
  product.innerHTML = ''
  axios.get('https://655c844f25b76d9884fd70a7.mockapi.io/products')
  .then(res =>{
    db = res.data
   let sortData = db.sort((a, b) => (a.title.localeCompare(b.title)))
   console.log(sortData);
   sortData.map(item =>{
    const box = document.createElement("div");
    box.className = "boxs ";
    box.innerHTML = `
        <div class="divz">
        <img src="${item.image}" alt="">
        <div class="divc">
            <p>${item.title}</p>
        </div>
        <p>$ ${item.price}</p>
        <button onclick="addToCart(${item.id})">Sebete Ekle</button>
            </div>
        `;
    product.appendChild(box);
   })
  })
}

max.addEventListener('click', maxFunc)



function minFunc(){
  product.innerHTML = ''
  axios.get('https://655c844f25b76d9884fd70a7.mockapi.io/products')
  .then(res =>{
    db = res.data
   let sortData = db.sort((a, b) => (b.title.localeCompare(a.title)))
   console.log(sortData);
   sortData.map(item =>{
    const box = document.createElement("div");
    box.className = "boxs ";
    box.innerHTML = `
        <div class="divz">
        <img src="${item.image}" alt="">
        <div class="divc">
            <p>${item.title}</p>
        </div>
        <p>$ ${item.price}</p>
        <button onclick="addToCart(${item.id})">Sebete Ekle</button>
            </div>
        `;
    product.appendChild(box);
   })
  })
}

min.addEventListener('click', minFunc) 