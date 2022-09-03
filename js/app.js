const loadCategory = () => {
  fetch(`https://openapi.programming-hero.com/api/news/categories`)
    .then((res) => res.json())
    .then((data) => displayCategory(data.data.news_category));
};

const displayCategory = (items) => {
  const menuItem = document.getElementById("menu-item");
  items.forEach((item) => {
    const menuUl = document.createElement("ul");
    menuUl.classList.add("menu", "menu-horizontal");
    menuUl.innerHTML = `
      <li><a onclick="loadNews('${item.category_id}')">${item.category_name}</a></li>
        `;
    menuItem.appendChild(menuUl);
  });
};

const loadNews = (id) => {
  fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
    .then((res) => res.json())
    .then((data) => displayNews(data.data));
};

const displayNews = (items) => {
  items.forEach((item) => {
    console.log(item);
    const newsContainer = document.getElementById("news-container");
    // newsContainer.textContent = '';
    const newsDiv = document.createElement("div");
    newsDiv.classList.add("border", "border-2", "mt-2");
    newsDiv.innerHTML = `
    <div class="card card-side bg-base-100 shadow-xl">
                <figure><img class="w-100" src="${
                  item.image_url
                }" alt="Movie"></figure>
                <div class="card-body">
                  <h2 class="card-title">${item.title}</h2>
                  <p>${item.details.slice(0, 300)}</p>
                  <div class = "flex flex-row gap-4">
                      <img class = "w-10 h-10 rounded-full" src="${ item.author.img}"/>
                    <div>
                      <P>${item.author.name}</P>
                      <P>${item.author.published_date}</P>
                    </div>
                    
                  </div>
                </div>
                  <div class="card-actions justify-end">
                    <button class="btn btn-primary">Watch</button>
                  </div>
                </div>
            </div>
    `;
    newsContainer.appendChild(newsDiv);
  });
};

loadCategory();
