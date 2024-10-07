let currentPage = 1;
const articlesPerPage = 5; // 每页显示5篇文章
let totalArticles = 0;

document.addEventListener('DOMContentLoaded', () => {
    loadArticles(currentPage);

    document.getElementById('nextPage').addEventListener('click', () => {
        if (currentPage * articlesPerPage < totalArticles) {
            currentPage++;
            loadArticles(currentPage);
        }
    });

    document.getElementById('prevPage').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            loadArticles(currentPage);
        }
    });
});

function loadArticles(page) {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            totalArticles = data.articles.length;
            const start = (page - 1) * articlesPerPage;
            const end = start + articlesPerPage;
            const paginatedArticles = data.articles.slice(start, end);

            const articlesSection = document.getElementById('articles');
            articlesSection.innerHTML = '';

            paginatedArticles.forEach(article => {
                articlesSection.innerHTML += `
                    <article>
                        <h2>${article.title}</h2>
                        <p>${article.date}</p>
                        <img src="${article.image}" alt="${article.title}" />
                        <p>${article.content.substring(0, 100)}...</p>
                        <a href="blog.html?id=${article.id}">阅读更多</a>
                    </article>
                `;
            });
        })
        .catch(error => console.error('加载文章时出错:', error));
}
