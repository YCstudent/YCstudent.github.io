// 获取 JSON 数据并加载文章
function loadArticles() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const articlesSection = document.querySelector('.blog');
            data.articles.forEach(article => {
                const articleElement = document.createElement('article');
                articleElement.innerHTML = `
                    <h2>${article.title}</h2>
                    <p>${article.content}</p>
                    <time datetime="${article.date}">${article.date}</time>
                `;
                articlesSection.appendChild(articleElement);
            });
        })
        .catch(error => console.error('Error loading articles:', error));
}

// 获取 JSON 数据并加载照片
function loadPhotos() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const gallerySection = document.querySelector('.gallery');
            data.photos.forEach(photo => {
                const imgElement = document.createElement('img');
                imgElement.src = photo.src;
                imgElement.alt = photo.alt;
                gallerySection.appendChild(imgElement);
            });
        })
        .catch(error => console.error('Error loading photos:', error));
}

// 页面加载时调用
document.addEventListener('DOMContentLoaded', () => {
    loadArticles();
    loadPhotos();
});
