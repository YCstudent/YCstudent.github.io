document.addEventListener("DOMContentLoaded", function() {
    loadArticles();
    loadPhotos();
});

// 动态加载文章
function loadArticles() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const articlesSection = document.querySelector('.article-list');
            data.articles.forEach(article => {
                const articleElement = document.createElement('div');
                articleElement.classList.add('article');
                
                articleElement.innerHTML = `
                    <h3>${article.title}</h3>
                    <p>${article.content}</p>
                    <small>发布日期: ${article.date}</small>
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

