const loadCategory = () => {
  fetch(`https://openapi.programming-hero.com/api/news/categories`)
    .then((res) => res.json())
    .then((data) => displayCategory(data.data.news_category))
    .catch(error => console.log(error))
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
    .then((data) => displayNews(data.data))
    .catch(error => console.log(error))
};

const displayNews = (items) => {

  items.sort(function(a,b){
    return b.total_view - a.total_view;
  })
  const newsContainer = document.getElementById("news-container");
    newsContainer.innerHTML = '';
    const noData = document.getElementById('no-data');
    if(items.length === 0){
      noData.classList.remove('hidden');
    }
    else{
      noData.classList.add('hidden');
    }
    const itemsNumber = document.getElementById('items-number')
    itemsNumber.innerText = items.length;

  items.forEach((item) => {
    console.log(item);
    
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
                <p><i class="fa-regular fa-eye"></i> ${item.total_view ? item.total_view : 'no data found'}</p>
                <div class= "flex flex-row gap-2 text-center">
                  <p> <i class ="fa-solid fa-star"> </i></p>
                  <p> <i class ="fa-solid fa-star"> </i></p>
                  <p> <i class ="fa-solid fa-star"> </i></p>
                  <p> <i class ="fa-solid fa-star"> </i></p>
                  <p> <i class ="fa-solid fa-star-half-stroke"> </i></p>
                </div>
                 
                <label for="my-modal-5" class="btn modal-button" onclick="loadItemDetails('${item._id}')">See Details</label>
                
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

const loadItemDetails = (newsId) =>{
  fetch(`https://openapi.programming-hero.com/api/news/${newsId}`)
  .then(res => res.json())
  .then(data => showItemDetails(data.data))
  .catch(error => console.log(error))
};

const showItemDetails = (news) =>{
  console.log(news);
  const modalBody = document.getElementById('modal-body');
  modalBody.innerHTML =  `
  <div class="card card-side bg-base-100 shadow-xl">
  <figure><img class="w-60 h-60 p-4" src="${news[0].image_url}"></figure>
  <div class="card-body">
    <h2 class="card-title">${news[0].title}</h2>
    <p>${news[0].details.slice(0, 300)}...</p>
        <div class = "flex flex-row gap-4">
          <img class = "w-10 h-10 rounded-full" src="${ news[0].author.img}"/>
            <div>
              <P>${news[0].author.name ? news[0].author.name : 'No data found'}</P>
              <P>${news[0].author.published_date ? news[0].author.published_date : 'no data found'}</P>
            </div>
            <p><i class="fa-regular fa-eye"></i> ${news[0].total_view ? news[0].total_view : 'no data found'}</p>
        </div>
  </div>
</div>
<div class="modal-action">
            <label for="my-modal-5" class="btn">close!</label>
          </div>
  `;
}

loadCategory();
loadNews('08');
