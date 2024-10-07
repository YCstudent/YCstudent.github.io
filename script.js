let currentPage = 1;
const articlesPerPage = 5; // 每页显示5篇文章
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

    // 分类点击事件
    document.querySelectorAll('.category').forEach(category => {
        category.addEventListener('click', () => {
            const selectedCategory = category.getAttribute('data-category');
            if (currentCategory === selectedCategory) {
                currentCategory = null; // 取消过滤
            } else {
                currentCategory = selectedCategory;
            }
            currentPage = 1;
            displayArticles();
        });
    });
});

// 加载数据
function loadData() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            allArticles = data.articles;
            totalArticles = allArticles.length;
            displayArticles();
            loadPhotos(data.photos);
            setupCarousel();
        })
        .catch(error => console.error('加载数据时出错:', error));
}

// 显示文章
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

// 加载照片
function loadPhotos(photos) {
    const carouselContainer = document.querySelector('.carousel-container');
    photos.forEach(photo => {
        carouselContainer.innerHTML += `
            <img src="${photo.src}" alt="${photo.alt}">
        `;
    });
}

// 设置图片轮播（简单的自动滚动）
function setupCarousel() {
    const carousel = document.querySelector('.carousel-container');
    let scrollAmount = 0;
    const scrollStep = 2;
    const scrollInterval = 20; // 毫秒

    setInterval(() => {
        if (scrollAmount >= carousel.scrollWidth - carousel.clientWidth) {
            scrollAmount = 0;
            carousel.scrollTo({ left: scrollAmount, behavior: 'smooth' });
        } else {
            scrollAmount += scrollStep;
            carousel.scrollTo({ left: scrollAmount, behavior: 'smooth' });
        }
    }, scrollInterval);
}


