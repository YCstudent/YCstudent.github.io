console.log("\n %c Post-Abstract-AI (Spark Lite) 开源博客文章摘要AI生成工具 %c https://github.com/zhheo/Post-Abstract-AI \n", "color: #fadfa3; background: #030307; padding:5px 0;", "background: #fadfa3; padding:5px 0;")
var sparkLiteIsRunning = false;

function insertAIDiv(selector) {
    removeExistingAIDiv();
    const targetElement = document.querySelector(selector);
    if (!targetElement) return;

    const aiDiv = document.createElement('div');
    aiDiv.className = 'post-SparkLite';

    const aiTitleDiv = document.createElement('div');
    aiTitleDiv.className = 'sparkLite-title';
    aiDiv.appendChild(aiTitleDiv);

    const aiIcon = document.createElement('i');
    aiIcon.className = 'sparkLite-title-icon';
    aiTitleDiv.appendChild(aiIcon);

    aiIcon.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
  <path d="M9.18109 10.1811C9.2342 10.128 9.32905 10.0623 9.63166 10.0216C9.95434 9.97823 10.3923 9.97675 11.0698 9.97675H12.9302C13.6077 9.97675 14.0457 9.97823 14.3683 10.0216C14.671 10.0623 14.7658 10.128 14.8189 10.1811C14.872 10.2342 14.9377 10.329 14.9784 10.6317C15.0218 10.9543 15.0233 11.3923 15.0233 12.0698V13.9302C15.0233 14.6077 15.0218 15.0457 14.9784 15.3683C14.9377 15.671 14.872 15.7658 14.8189 15.8189C14.7658 15.872 14.671 15.9377 14.3683 15.9784C14.0457 16.0218 13.6077 16.0233 12.9302 16.0233H11.0698C10.3923 16.0233 9.95434 16.0218 9.63166 15.9784C9.32905 15.9377 9.2342 15.872 9.18109 15.8189C9.12798 15.7658 9.0623 15.671 9.02161 15.3683C8.97823 15.0457 8.97675 14.6077 8.97675 13.9302V12.0698C8.97675 11.3923 8.97823 10.9543 9.02161 10.6317C9.0623 10.329 9.12798 10.2342 9.18109 10.1811Z" />
  <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C12.3853 3 12.6977 3.31236 12.6977 3.69767V6.48884C13.2084 6.48991 13.6717 6.49342 14.0932 6.50495L14.093 6.48837V3.69767C14.093 3.31236 14.4054 3 14.7907 3C15.176 3 15.4884 3.31236 15.4884 3.69767V6.48837C15.4884 6.52487 15.4856 6.56072 15.4802 6.5957C16.4162 6.71067 17.0648 6.94879 17.558 7.44198C18.0512 7.93517 18.2893 8.58381 18.4043 9.51984C18.4393 9.51443 18.4751 9.51163 18.5116 9.51163H21.3023C21.6876 9.51163 22 9.82399 22 10.2093C22 10.5946 21.6876 10.907 21.3023 10.907H18.5116L18.495 10.9068C18.5066 11.3283 18.5106 11.7916 18.5116 12.3023H21.3023C21.6876 12.3023 22 12.6147 22 13C22 13.3853 21.6876 13.6977 21.3023 13.6977L18.5112 13.6977C18.5101 14.2084 18.5066 14.6717 18.495 15.0932L18.5116 15.093H21.3023C21.6876 15.093 22 15.4054 22 15.7907C22 16.176 21.6876 16.4884 21.3023 16.4884H18.5116C18.4751 16.4884 18.4393 16.4856 18.4043 16.4802C18.2893 17.4162 18.0512 18.0648 17.558 18.558C17.0648 19.0512 16.4162 19.2893 15.4802 19.4043C15.4856 19.4393 15.4884 19.4751 15.4884 19.5116V22.3023C15.4884 22.6876 15.176 23 14.7907 23C14.4054 23 14.093 22.6876 14.093 22.3023V19.5116L14.0932 19.495C13.6717 19.5066 13.2084 19.5106 12.6977 19.5116V22.3023C12.6977 22.6876 12.3853 23 12 23C11.6147 23 11.3023 22.6876 11.3023 22.3023L11.3023 19.5112C10.7916 19.5101 10.3283 19.5066 9.90678 19.495L9.90698 19.5116V22.3023C9.90698 22.6876 9.59462 23 9.2093 23C8.82399 23 8.51163 22.6876 8.51163 22.3023V19.5116C8.51163 19.4751 8.51443 19.4393 8.51984 19.4043C7.58381 19.2893 6.93517 19.0512 6.44198 18.558C5.94879 18.0648 5.71067 17.4162 5.5957 16.4802C5.56071 16.4856 5.52487 16.4884 5.48837 16.4884H2.69767C2.31236 16.4884 2 16.176 2 15.7907C2 15.4054 2.31236 15.093 2.69767 15.093H5.48837L5.50495 15.0932C5.49342 14.6717 5.48944 14.2084 5.48837 13.6977H2.69767C2.31236 13.6977 2 13.3853 2 13C2 12.6147 2.31236 12.3023 2.69767 12.3023L5.48884 12.3023C5.48991 11.7916 5.49342 11.3283 5.50495 10.9068L5.48837 10.907H2.69767C2.31236 10.907 2 10.5946 2 10.2093C2 9.82399 2.31236 9.51163 2.69767 9.51163H5.48837C5.52487 9.51163 5.56071 9.51443 5.5957 9.51984C5.71067 8.58381 5.94879 7.93517 6.44198 7.44198C6.93517 6.94879 7.58381 6.71067 8.51984 6.5957C8.51443 6.56072 8.51163 6.52487 8.51163 6.48837V3.69767C8.51163 3.31236 8.82399 3 9.2093 3C9.59462 3 9.90698 3.31236 9.90698 3.69767V6.48837L9.90678 6.50495C10.3283 6.49342 10.7916 6.48944 11.3023 6.48837V3.69767C11.3023 3.31236 11.6147 3 12 3Z" />
</svg>
`;


    const aiTitleTextDiv = document.createElement('div');
    aiTitleTextDiv.className = 'sparkLite-title-text';
    aiTitleTextDiv.textContent = '微型AI摘要';
    aiTitleDiv.appendChild(aiTitleTextDiv);

    const aiTagDiv = document.createElement('div');
    aiTagDiv.className = 'sparkLite-tag';
    aiTagDiv.id = 'sparkLite-tag';
    aiTagDiv.textContent = 'JHCxGPT';

    // 添加刷新按钮
    const refreshBtn = document.createElement('span');
    refreshBtn.className = 'sparkLite-refresh-btn';
    refreshBtn.innerHTML = '⟳';
    refreshBtn.title = '重新生成摘要';
    refreshBtn.addEventListener('click', function () {
        runSparkLite();
    });

    aiTagDiv.appendChild(refreshBtn);
    aiTitleDiv.appendChild(aiTagDiv);

    const aiExplanationDiv = document.createElement('div');
    aiExplanationDiv.className = 'sparkLite-explanation';
    aiExplanationDiv.innerHTML = '生成中...' + '<span class="blinking-cursor"></span>';
    aiDiv.appendChild(aiExplanationDiv);

    targetElement.insertBefore(aiDiv, targetElement.firstChild);
}

function removeExistingAIDiv() {
    const existingAIDiv = document.querySelector(".post-SparkLite");
    if (existingAIDiv) {
        existingAIDiv.parentElement.removeChild(existingAIDiv);
    }
}

function getTitleAndContent() {
    try {
        const title = document.getElementsByClassName('post-title')[0].innerText;
        const container = document.querySelector(sparkLite_postSelector);
        if (!container) {
            console.warn('JHCxGPT：找不到文章容器...');
            return '';
        }
        const paragraphs = container.getElementsByTagName('p');
        const headings = container.querySelectorAll('h1, h2, h3, h4, h5');
        let content = '';

        for (let h of headings) {
            content += h.innerText + ' ';
        }

        for (let p of paragraphs) {
            const filteredText = p.innerText.replace(/https?:\/\/[^\s]+/g, '');
            content += filteredText;
        }

        const combinedText = title + ' ' + content;
        let wordLimit = 1000;
        if (typeof sparkLite_wordLimit !== "undefined") {
            wordLimit = sparkLite_wordLimit;
        }
        return combinedText.slice(0, wordLimit);
    } catch (e) {
        console.error('JHCxGPT 错误：...', e);
        return '';
    }
}

// 添加IndexedDB初始化函数
const initDB = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('SparkLiteDB', 1);

        request.onupgradeneeded = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains('summaries')) {
                db.createObjectStore('summaries', { keyPath: 'url' });
            }
        };

        request.onsuccess = (e) => resolve(e.target.result);
        request.onerror = (e) => reject(e.target.error);
    });
};

async function fetchSparkLiteSummary(content) {
    const title = document.title;
    const url = window.location.href;
  
    // 先尝试从IndexedDB读取
    try {
        const db = await initDB();
        const tx = db.transaction('summaries', 'readonly');
        const store = tx.objectStore('summaries');
        const request = store.get(url);
  
        const cachedData = await new Promise((resolve) => {
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => resolve(null);
        });
  
        if (cachedData?.summary) {
            // 检查缓存是否过期（7天有效期）
            const isExpired = Date.now() - cachedData.timestamp > 7 * 24 * 60 * 60 * 1000;
            if (!isExpired) {
                return cachedData.summary;
            }
        }
    } catch (e) {
        console.log('读取IndexedDB缓存失败', e);
    }

    const proxyApiUrl = "https://jhcx330.online/api/spark-proxy.js";
    const requestDataToProxy = { content: content, title: title };
    const timeout = 30000;

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        const response = await fetch(proxyApiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestDataToProxy),
            signal: controller.signal
        });

        clearTimeout(timeoutId);
        const data = await response.json();

        // 成功获取摘要后存入IndexedDB
        if (response.ok) {
            try {
                const db = await initDB();
                const tx = db.transaction('summaries', 'readwrite');
                tx.objectStore('summaries').put({
                    url: url,
                    summary: data.summary,
                    timestamp: Date.now()
                });
            } catch (e) {
                console.log('IndexedDB写入失败', e);
            }
            return data.summary;
        } else {
            console.error(`代理或 API 错误: ${data.error || response.statusText}`);
            return `获取摘要失败: ${data.error || `HTTP 状态码: ${response.status}`}`;
        }
    } catch (error) {
        if (error.name === 'AbortError') {
            console.error('JHCxGPT 请求超时 (通过代理)');
            return '获取文章摘要超时，请稍后刷新重试。';
        } else {
            console.error('JHCxGPT 请求失败 (通过代理)：', error);
            if (error instanceof SyntaxError) {
                return '获取文章摘要失败：代理服务器响应格式错误。';
            }
            return '获取文章摘要失败，请检查网络连接或代理服务器状态。';
        }
    }
}

function aiShowAnimation(text) {
    const element = document.querySelector(".sparkLite-explanation");
    if (!element) {
        console.warn('JHCxGPT：找不到元素...');
        return;
    }

    if (typeof sparkLite_typingAnimate !== "undefined" && !sparkLite_typingAnimate) {
        element.innerHTML = text;
        return;
    }

    const typingDelay = 25;
    const punctuationDelayMultiplier = 6;

    element.style.display = "block";
    element.innerHTML = "生成中..." + '<span class="blinking-cursor"></span>';

    let animationRunning = true;
    let currentIndex = 0;
    let initialAnimation = true;
    let lastUpdateTime = performance.now();

    const animate = () => {
        if (currentIndex < text.length && animationRunning) {
            const currentTime = performance.now();
            const timeDiff = currentTime - lastUpdateTime;

            const letter = text.slice(currentIndex, currentIndex + 1);
            const isPunctuation = /[，。！、？,.!?]/.test(letter);
            const delay = isPunctuation ? typingDelay * punctuationDelayMultiplier : typingDelay;

            if (timeDiff >= delay) {
                element.innerText = text.slice(0, currentIndex + 1);
                lastUpdateTime = currentTime;
                currentIndex++;

                if (currentIndex < text.length) {
                    element.innerHTML = text.slice(0, currentIndex) + '<span class="blinking-cursor"></span>';
                } else {
                    element.innerHTML = text;
                    element.style.display = "block";
                    observer.disconnect();
                }
            }
            requestAnimationFrame(animate);
        }
    }

    const observer = new IntersectionObserver((entries) => {
        let isVisible = entries[0].isIntersecting;
        animationRunning = isVisible;
        if (animationRunning && initialAnimation) {
            setTimeout(() => {
                requestAnimationFrame(animate);
            }, 200);
        }
    }, { threshold: 0 });
    let post_ai = document.querySelector('.post-SparkLite');
    observer.observe(post_ai);
}

function runSparkLite() {
    insertAIDiv(sparkLite_postSelector);
    const content = getTitleAndContent();
    // console.log(content);

    if (content) {
        fetchSparkLiteSummary(content).then(summary => {
            aiShowAnimation(summary);
        });
    } else {
        const aiExplanationDiv = document.querySelector(".sparkLite-explanation");
        if (aiExplanationDiv) {
            aiExplanationDiv.textContent = '未能获取到文章内容，无法生成摘要。';
        }
    }
}

function checkURLAndRun() {
    if (sparkLiteIsRunning) return false;

    if (typeof sparkLite_postURL === "undefined") {
        return true;
    }

    try {
        const wildcardToRegExp = (s) => new RegExp('^' + s.split(/\*+/).map(regExpEscape).join('.*') + '$');
        const regExpEscape = (s) => s.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
        const urlPattern = wildcardToRegExp(sparkLite_postURL);
        const currentURL = window.location.href;

        if (urlPattern.test(currentURL)) {
            return true;
        } else {
            removeExistingAIDiv();
            return false;
        }
    } catch (error) {
        console.error("JHCxGPT：我没有看懂你编写的自定义链接规则...", error);
        return false;
    }
}

function initializeSparkLite() {
    const targetElement = document.querySelector(sparkLite_postSelector);
    if (!targetElement) {
        removeExistingAIDiv();
        return;
    }

    if (checkURLAndRun()) {
        runSparkLite();
    } else {
        runSparkLite();
    }
}

document.removeEventListener("DOMContentLoaded", initializeSparkLite);
document.addEventListener("DOMContentLoaded", initializeSparkLite);

document.addEventListener("pjax:complete", function () {
    if (document.querySelector(sparkLite_postSelector)) {
        initializeSparkLite();
    }
});

document.removeEventListener("pjax:send", removeExistingAIDiv);
document.addEventListener("pjax:send", removeExistingAIDiv);
