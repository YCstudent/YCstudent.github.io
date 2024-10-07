let currentPage = 1;
const articlesPerPage = 5;
let allArticles = [];
let currentCategory = 'all'; // 默认类别为"全部"
let carouselIndex = 0;
let carouselInterval;

// 获取文章 ID 参数
function getQueryParameter(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// 显示文章列表
function displayArticles() {
    const filteredArticles = currentCategory === 'all'
        ? allArticles
        : allArticles.filter(article => article.category === currentCategory);

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
        let imageTag = '';  // 默认没有图片
        if (article.image) {
            imageTag = `<img src="${article.image}" alt="${article.title}">`;  // 如果有图片路径，生成图片标签
        }
        articlesSection.innerHTML += `
            <div class="article">
                <h2>${article.title}</h2>
                <p class="date">发布日期: ${article.date}</p>
                ${imageTag}  <!-- 只有在有图片时才会显示图片 -->
                <p>${article.content.substring(0, 100)}...</p>
                <a href="blog.html?id=${article.id}">阅读更多</a>
            </div>
        `;
    });

    document.getElementById('currentPage').textContent = `当前页: ${currentPage}`;
    document.getElementById('prevPage').disabled = currentPage === 1;
    document.getElementById('nextPage').disabled = currentPage * articlesPerPage >= filteredArticles.length;
}

// 加载所有文章
function loadArticles() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            allArticles = data.articles;
            displayArticles();
        })
        .catch(error => {
            console.error('加载文章时出错:', error);
        });
}

// 显示文章详情
function loadArticle() {
    const articleId = getQueryParameter('id');
    if (articleId) {
        fetch('data.json')
            .then(response => response.json())
            .then(data => {
                const article = data.articles.find(article => article.id == articleId);
                if (article) {
                    displayArticle(article);
                } else {
                    document.querySelector('.article-content').innerHTML = '<p>文章未找到。</p>';
                }
            })
            .catch(error => {
                console.error('加载文章时出错:', error);
                document.querySelector('.article-content').innerHTML = '<p>文章未找到。</p>';
            });
    } else {
        document.querySelector('.article-content').innerHTML = '<p>文章未找到。</p>';
    }
}

// 显示文章详情
function displayArticle(article) {
    document.querySelector('.article-title').textContent = article.title;
    document.querySelector('.article-date').textContent = `发布日期: ${article.date}`;
    
    if (article.image) {
        document.querySelector('.article-image').src = article.image;
        document.querySelector('.article-image').style.display = 'block';  // 显示图片
    } else {
        document.querySelector('.article-image').style.display = 'none';  // 隐藏图片
    }

    document.querySelector('.article-content').textContent = article.content;
}

// 切换分类
document.querySelectorAll('.category-list a').forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();
        currentCategory = event.target.getAttribute('data-category');
        currentPage = 1;  // 切换分类时重置为第一页
        displayArticles();
    });
});

// 分页功能
document.getElementById('prevPage').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        displayArticles();
    }
});

document.getElementById('nextPage').addEventListener('click', () => {
    currentPage++;
    displayArticles();
});

// 轮播图功能
function startCarousel() {
    const images = document.querySelectorAll('.carousel-img');
    images[carouselIndex].style.display = 'none';  // 隐藏当前图片
    carouselIndex = (carouselIndex + 1) % images.length;  // 切换到下一张图片
    images[carouselIndex].style.display = 'block';  // 显示新图片
}

document.getElementById('pauseCarousel').addEventListener('click', () => {
    clearInterval(carouselInterval);
});

document.getElementById('resumeCarousel').addEventListener('click', () => {
    carouselInterval = setInterval(startCarousel, 3000);
});

window.onload = () => {
    if (window.location.pathname.endsWith('blog.html')) {
        loadArticle();
    } else {
        loadArticles();
        carouselInterval = setInterval(startCarousel, 3000);  // 初始化轮播
    }
};

