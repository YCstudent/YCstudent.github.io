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

    // 模态框关闭事件
    document.querySelector('.close').addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
});

function loadData() {
    showLoadingIndicator();
    fetch('data.json')
        .then(response => {
            if (!response.ok) throw new Error('网络错误');
            return response.json();
        })
        .then(data => {
            allArticles = data.articles.sort((a, b) => b.id - a.id);
            totalArticles = allArticles.length; // 更新总文章数
            displayArticles();
        })
        .catch(error => {
            console.error('加载数据时出错:', error);
            alert('加载数据失败，请稍后再试。');
        })
        .finally(() => hideLoadingIndicator());
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
        
        let imageHtml = '';
        article.images.forEach(image => {
            imageHtml += `<img src="${image}" alt="${article.title}" onclick="openModal('${image}')"/>`;
        });
        
        articleDiv.innerHTML = `
            <h2>${article.title}</h2>
            <p class="date">发布日期: ${article.date}</p>
            ${imageHtml}
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

// 打开模态框
function openModal(imageSrc) {
    const modal = document.getElementById('photo-modal');
    const modalImage = document.getElementById('modal-image');
    modalImage.src = imageSrc;
    modal.classList.remove('hidden');
}

// 关闭模态框
function closeModal() {
    const modal = document.getElementById('photo-modal');
    modal.classList.add('hidden');
}

// 显示加载指示器
function showLoadingIndicator() {
    // 可添加加载动画逻辑
}

// 隐藏加载指示器
function hideLoadingIndicator() {
    // 可添加隐藏加载动画逻辑
}
