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

    aiIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="48px" height="48px" viewBox="0 0 48 48">
  <title>机器人</title>
  <g id="机器人" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
    <path d="M34.717885,5.03561087 C36.12744,5.27055371 37.079755,6.60373651 36.84481,8.0132786 L35.7944,14.3153359 L38.375,14.3153359 C43.138415,14.3153359 47,18.1768855 47,22.9402569 L47,34.4401516 C47,39.203523 43.138415,43.0650727 38.375,43.0650727 L9.625,43.0650727 C4.861585,43.0650727 1,39.203523 1,34.4401516 L1,22.9402569 C1,18.1768855 4.861585,14.3153359 9.625,14.3153359 L12.2056,14.3153359 L11.15519,8.0132786 C10.920245,6.60373651 11.87256,5.27055371 13.282115,5.03561087 C14.69167,4.80066802 16.024865,5.7529743 16.25981,7.16251639 L17.40981,14.0624532 C17.423955,14.1470924 17.43373,14.2315017 17.43948,14.3153359 L30.56052,14.3153359 C30.56627,14.2313867 30.576045,14.1470924 30.59019,14.0624532 L31.74019,7.16251639 C31.975135,5.7529743 33.30833,4.80066802 34.717885,5.03561087 Z M38.375,19.4902885 L9.625,19.4902885 C7.719565,19.4902885 6.175,21.0348394 6.175,22.9402569 L6.175,34.4401516 C6.175,36.3455692 7.719565,37.89012 9.625,37.89012 L38.375,37.89012 C40.280435,37.89012 41.825,36.3455692 41.825,34.4401516 L41.825,22.9402569 C41.825,21.0348394 40.280435,19.4902885 38.375,19.4902885 Z M14.8575,23.802749 C16.28649,23.802749 17.445,24.9612484 17.445,26.3902253 L17.445,28.6902043 C17.445,30.1191812 16.28649,31.2776806 14.8575,31.2776806 C13.42851,31.2776806 12.27,30.1191812 12.27,28.6902043 L12.27,26.3902253 C12.27,24.9612484 13.42851,23.802749 14.8575,23.802749 Z M33.1425,23.802749 C34.57149,23.802749 35.73,24.9612484 35.73,26.3902253 L35.73,28.6902043 C35.73,30.1191812 34.57149,31.2776806 33.1425,31.2776806 C31.71351,31.2776806 30.555,30.1191812 30.555,28.6902043 L30.555,26.3902253 C30.555,24.9612484 31.71351,23.802749 33.1425,23.802749 Z" id="形状结合" fill="#444444" fill-rule="nonzero"></path>
  </g>
  </svg>`;

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

    const proxyApiUrl = "https://spark-lilac.vercel.app/api/spark-proxy.js";
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
