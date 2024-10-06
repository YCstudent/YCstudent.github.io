document.addEventListener("DOMContentLoaded", function() {
    const currentPage = window.location.pathname;

    if (currentPage.includes("index.html") || currentPage === "/") {
        loadArticles(true);  // 加载主页上的文章摘要
        loadPhotos();        // 加载照片
    } else if (currentPage.includes("blog.html")) {
        loadArticles(false);  // 加载博客页面上的完整文章
    }
});

// 动态加载文章
function loadArticles(isSummary) {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const articlesSection = document.querySelector('.article-list');
            data.articles.forEach(article => {
                const articleElement = document.createElement('div');
                articleElement.classList.add('article');

                let content;
                if (isSummary) {
                    content = article.content.substring(0, 100) + '...';  // 首页只显示摘要
                } else {
                    content = article.content;  // 博客页面显示完整内容
                }

                articleElement.innerHTML = `
                    <h3>${article.title}</h3>
                    <small>发布日期: ${article.date}</small>
                    <p>${content}</p>
                `;
                
                articlesSection.appendChild(articleElement);
            });
        })
        .catch(error => console.error('加载文章时出错:', error));
}

// 动态加载照片
function loadPhotos() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const photoGallery = document.querySelector('.photo-gallery');
            data.photos.forEach(photo => {
                const imgElement = document.createElement('img');
                imgElement.src = photo.src;
                imgElement.alt = photo.alt;
                
                photoGallery.appendChild(imgElement);
            });
        })
        .catch(error => console.error('加载照片时出错:', error));
}

