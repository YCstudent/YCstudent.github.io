let currentPage = 1;
const articlesPerPage = 5;
let totalArticles = 0;
let allArticles = [];
let currentCategory = null;

document.addEventListener('DOMContentLoaded', () => {
    loadData();

    document.getElementById('nextPage').addEventListener('click', () => {
        if (currentPage * articlesPerPage < totalArticles) {
            currentPage++;
            displayArticles();
        }
    });

    document.getElementById('prevPage').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayArticles();
        }
    });

    document.querySelectorAll('.category').forEach(category => {
        category.addEventListener('click', () => {
            const selectedCategory = category.getAttribute('data-category');
            if (currentCategory === selectedCategory) {
                currentCategory = null;
            } else {
                currentCategory = selectedCategory;
            }
            currentPage = 1;
            displayArticles();
        });
    });
});

function loadData() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            allArticles = data.articles.sort((a, b) => b.id - a.id);
            totalArticles = allArticles.length;
            displayArticles();
        })
        .catch(error => console.error('加载数据时出错:', error));
}

function displayArticles() {
    let filteredArticles = allArticles;
    if (currentCategory) {
        filteredArticles = allArticles.filter(article => article.category === currentCategory);
    }

    totalArticles = filteredArticles.length;
    const start = (currentPage - 1) * articlesPerPage;
    const end = start + articlesPerPage;
    const paginatedArticles = filteredArticles.slice(start, end);

    const articlesSection = document.querySelector('.article-list');
    articlesSection.innerHTML = '';

    if (paginatedArticles.length === 0) {
        articlesSection.innerHTML = '<p>没有找到相关文章。</p>';
        return;
    }

    paginatedArticles.forEach(article => {
        articlesSection.innerHTML += `
            <div class="article">
                <h2>${article.title}</h2>
                <p class="date">发布日期: ${article.date}</p>
                <img src="${article.image}" alt="${article.title}" />
                <p>${article.content.substring(0, 100)}...</p>
                <a href="blog.html?id=${article.id}">阅读更多</a>
            </div>
        `;
    });
}

function loadBlogPost() {
    const params = new URLSearchParams(window.location.search);
    const articleId = params.get('id');

    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const article = data.articles.find(article => article.id == articleId);
            if (article) {
                document.getElementById('blog-title').textContent = article.title;
                document.getElementById('blog-date').textContent = `发布日期: ${article.date}`;
                document.getElementById('blog-image').src = article.image;
                document.getElementById('blog-content').textContent = article.content;
            }
        })
        .catch(error => console.error('加载文章时出错:', error));
}
