const loadCategory = () => {
  fetch(`https://openapi.programming-hero.com/api/news/categories`)
    .then((res) => res.json())
    .then((data) => displayCategory(data.data.news_category));
};

const displayCategory = (items) => {
  const menuItem = document.getElementById("menu-item");
  items.forEach((item) => {
    // console.log(item)
    const menuDiv = document.createElement("ul");
    menuDiv.classList.add('menu', 'menu-horizontal');
    menuDiv.innerHTML = `
      <li><a>${item.category_name}</a></li>
        `;
    menuItem.appendChild(menuDiv);
  });
};


loadCategory();
