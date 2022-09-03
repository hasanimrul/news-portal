const loadCategory = () => {
  fetch(`https://openapi.programming-hero.com/api/news/categories`)
    .then((res) => res.json())
    .then((data) => displayCategory(data.data.news_category));
};

const displayCategory = (items) => {
  const menuItem = document.getElementById("menu-item");
  items.forEach((item) => {
    const menuDiv = document.createElement('div')
    menuDiv.classList.add("menu", "menu-horizontal", "max-auto", "drop-shadow")
    const menuUl = document.createElement("ul");
    menuUl.innerHTML = `
      <li><a onclick="loadNews('${item.category_id}')">${item.category_name}</a></li>
        `;
    menuDiv.appendChild(menuUl);
    menuItem.appendChild(menuDiv);
    
  });
};

const loadNews = (id) => {
  toggleSpinner(true);
  fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
    .then((res) => res.json())
    .then((data) => displayNews(data.data));
};

const displayNews = (items) => {
  
  items.forEach((item) => {
    console.log(items.length);
    console.log(item);
    const itemsNumber = document.getElementById('items-number')
    itemsNumber.innerText = items.length;
    const newsContainer = document.getElementById("news-container");
    const noData = document.getElementById('no-data');
    if(items.length === 0){
      noData.classList.remove('hidden');
    }
    else{
      noData.classList.add('hidden');
    }
    const newsDiv = document.createElement("div");
    newsDiv.classList.add("card","border", "border-2","border-slate-600", "mt-2");
    newsDiv.innerHTML = `
    <div class="card card-side bg-base-100 shadow-xl">
      <figure><img class="w-60 h-60 p-4" src="${item.image_url}"></figure>
      <div class="card-body">
        <h2 class="card-title">${item.title}</h2>
        <p>${item.details.slice(0, 300)}...</p>
            <div class = "flex flex-row gap-4">
              <img class = "w-10 h-10 rounded-full" src="${ item.author.img}"/>
                <div>
                  <P>${item.author.name ? item.author.name : 'No data found'}</P>
                  <P>${item.author.published_date ? item.author.published_date : 'no data found'}</P>
                </div>
                <p><i class="fa-regular fa-eye"></i> ${item.total_view}</p>
                <div class= "flex gap-2">
                  <p> <i class ="fa-solid fa-star"> </i></p>
                  <p> <i class ="fa-solid fa-star"> </i></p>
                  <p> <i class ="fa-solid fa-star"> </i></p>
                  <p> <i class ="fa-solid fa-star"> </i></p>
                  <p> <i class ="fa-solid fa-star-half-stroke"> </i></p>
                </div>
                <p class = "text-right"><i class="fa fa-arrow-right"></i></p>
            </div>
      </div>
  </div>
    `;
    newsContainer.appendChild(newsDiv);
  });
  toggleSpinner(false);
};

const toggleSpinner = isLoading =>{
  const spinnerSection = document.getElementById('spinner-section');
  if(isLoading){
    spinnerSection.classList.remove('hidden');
  }
  else{
    spinnerSection.classList.add('hidden');
  }
}

loadCategory();
