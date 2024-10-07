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
            currentCategory = currentCategory === selectedCategory ? null : selectedCategory;
            currentPage = 1;
            displayArticles();
        });
    });

    // 照片墙链接点击事件
    document.getElementById('photo-wall-link').addEventListener('click', (e) => {
        e.preventDefault();
        const photoWall = document.getElementById('photo-wall');
        if (photoWall.classList.contains('hidden')) {
            photoWall.classList.remove('hidden');
            photoWall.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

function loadData() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            allArticles = data.articles.sort((a, b) => b.id - a.id);
            displayArticles();
        })
        .catch(error => console.error('加载数据时出错:', error));
}

function displayArticles() {
    let filteredArticles = currentCategory
        ? allArticles.filter(article => article.category === currentCategory)
        : allArticles;

    totalArticles = filteredArticles.length;
    const start = (currentPage - 1) * articlesPerPage;
    const paginatedArticles = filteredArticles.slice(start, start + articlesPerPage);

    const articlesSection = document.querySelector('.article-list');
    articlesSection.innerHTML = '';

    if (paginatedArticles.length === 0) {
        articlesSection.innerHTML = '<p>没有找到相关文章。</p>';
        return;
    }

    paginatedArticles.forEach(article => {
        const articleDiv = document.createElement('div');
        articleDiv.classList.add('article');
        articleDiv.innerHTML = `
            <h2>${article.title}</h2>
            <p class="date">发布日期: ${article.date}</p>
            <img src="${article.image}" alt="${article.title}" />
            <p>${article.content.substring(0, 100)}...</p>
            <a href="blog.html?id=${article.id}">阅读更多</a>
        `;
        articlesSection.appendChild(articleDiv);
    });

    updatePaginationButtons();
}

function updatePaginationButtons() {
    document.getElementById('prevPage').disabled = currentPage === 1;
    document.getElementById('nextPage').disabled = currentPage * articlesPerPage >= totalArticles;
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
            } else {
                document.getElementById('blog-content').innerText = '未找到相关文章。';
            }
        })
        .catch(error => console.error('加载文章时出错:', error));
}

