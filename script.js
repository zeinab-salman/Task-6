const linksBtn = document.querySelectorAll('.link');
linksBtn.forEach((button) => {
    button.addEventListener('click', (event) => {
        linksBtn.forEach((btn) => {
            btn.classList.remove("popular-active")
        });
        button.classList.add("popular-active");
    });
});
//navbar links//
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {

        navLinks.forEach((lnk) => {

            lnk.classList.remove("nav-active")
        });
        link.classList.add("nav-active");
    });
});
//featured books//
const data = localStorage.getItem('data');
if (data) {
    const newData = JSON.parse(localStorage.getItem('data'));
    featuredBooks(newData);
}
else {
    const featureContainer = document.querySelector('.featured-container');
    fetch("https://wolnelektury.pl/api/authors/adam-mickiewicz/kinds/liryka/parent_books/")
        .then(
            res => res.json()
        )
        .then(
            /*res => featuredBooks(res)*/
            function (res) {
                featuredBooks(res)
                localStorage.setItem('data', JSON.stringify(res));
                console.log(localStorage);
            }
        )
}
const divCon = document.querySelector('.featured-container');
function featuredBooks(res) {
    const featureContainer = document.querySelector('.featured-container');
    console.log(res);
    for (let index = res.length - 4; index < res.length; index++) {
        if (index === res.length - 1) {
            var button = `<button class="btn-add-to-cart bg-dark text-light w-100 d-lg-none d-block py-2">Add to cart</button>`;
        }
        else {
            var button = ``;
        }
        featureContainer.innerHTML += `
      <div class="card col-12 col-lg-2 align-items-center pt-4 bg-gray1 mb-4 border-0 me-5 ">
             <div class="mb-3 bg-gray2 p-4 position-relative  "><img src="${res[index].simple_thumb}" width="150px" />
             <span>${button}</span>
             </div>
        <h5 class=" text-dark-green ">${res[index].title}</h5>
         <p>${res[index].author}</p>
         </div>`;
    }
}
//popular books//
const data1 = localStorage.getItem('data1');
if (data1) {
    const newData1 = JSON.parse(localStorage.getItem('data1'));
    popularBooks(newData1);
}
else {
    fetch("https://wolnelektury.pl/api/authors/adam-mickiewicz/kinds/liryka/parent_books/")
        .then(
            res1 => res1.json()
        )
        .then(
            /* res1 => popularBooks(res1)*/
            function (res1) {
                popularBooks(res1)
                localStorage.setItem('data1', JSON.stringify(res1));
                console.log(localStorage);
            }
        )
}
const popularCon = document.querySelector('.popular-container');
function popularBooks(res1) {
    const popularCon = document.querySelector('.popular-container');
    console.log(res1);
    for (let index = 10; index < 18; index++) {
        const card = popularCon.innerHTML += `
      <div class="card  col-12 col-lg-2  align-items-center pt-4 bg-gray1 mb-4 border-0 me-5" id="card${index}">
             <div class="mb-3 bg-gray2 p-4"><img src="${res1[index].simple_thumb}" width="150px" />
             </div>
        <h5 class=" text-dark-green text-center ">${res1[index].title}</h5>
         <p class="text-center">${res1[index].author}</p>
</div>`;
    }
    //best selling book//
    const data2 = localStorage.getItem('data2');
    if (data2) {
        const newData2 = JSON.parse(localStorage.getItem('data2'));
        bestSelling(newData2);
    }
    else {
        fetch("https://wolnelektury.pl/api/books/studnia-i-wahadlo/ ")
            .then(
                response => response.json()
            )
            .then(
                /*response => bestSelling(response)*/
                function (response) {
                    bestSelling(response)
                    localStorage.setItem('data2', JSON.stringify(response));
                    console.log(localStorage);
                }
            )
    }
    const bestContainer = document.querySelector('.best-container');
    function bestSelling(response) {
        const bestContainer = document.querySelector('.best-container');
        console.log(response);
        bestContainer.innerHTML = `<div class="p-2 best-book-div bg-gray1 me-5 col-12 col-lg-5">
                    <img src="${response.cover}" alt="best selling" class="w-100" " />
                </div>
                <div class="col-12 col-lg-6">
                    <h2 class="w-75 w-md-100  fw-bold">Best Selling Book</h2>
                    <div class="brown-line bg-dark-green mb-5"></div>
                   <p class="text-secondary"><span>by </span> ${response.authors[0].name}</p>
                    <h5 class="mb-3 mt-3">${response.title}</h5>
                    <p class="mb-5 text-secondary ">${response.fragment_data.html}  </p>
                    <a href="#" class="text-decoration-none text-dark">Shop it now <i class="fas fa-arrow-right"></i></a>
                </div>  `;
        console.log(bestContainer.innerHTML);
    }
}