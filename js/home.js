let array = [];
let search = '';
let pageSize = 10;
let currentPage = 1;
let isRefreshing = false;
let showBackTop = false;


const mockExperiments = [
    {
        id: 1,
        name: '情绪识别实验',
        image: 'images/experiments/emotion_recognition.png',
        num: 156,
        text: '通过面部表情识别用户情绪状态，帮助用户了解自己的情绪变化趋势。'
    },
    {
        id: 2,
        name: '注意力训练实验',
        image: 'images/experiments/attention_training.png',
        num: 89,
        text: '通过一系列注意力训练任务，提升用户的专注力和注意力持续时间。'
    },
    {
        id: 3,
        name: '记忆力测试',
        image: 'images/experiments/memory_test.png',
        num: 123,
        text: '测试和训练用户的记忆力，包括短期记忆和长期记忆。'
    },
    {
        id: 4,
        name: '反应速度测试',
        image: 'images/experiments/reaction_speed.png',
        num: 78,
        text: '测量用户的反应速度，帮助用户了解自己的反应能力。'
    },
    {
        id: 5,
        name: '压力水平评估',
        image: 'images/experiments/stress_assessment.png',
        num: 201,
        text: '通过问卷和生理指标评估用户的压力水平，提供缓解建议。'
    },
    {
        id: 6,
        name: '睡眠质量分析',
        image: 'images/experiments/sleep_quality.png',
        num: 167,
        text: '分析用户的睡眠模式和质量，提供改善睡眠的建议。'
    },
    {
        id: 7,
        name: '认知能力测试',
        image: 'images/experiments/cognitive_ability.png',
        num: 95,
        text: '全面评估用户的认知能力，包括逻辑推理、空间想象等。'
    },
    {
        id: 8,
        name: '情绪日记',
        image: 'images/experiments/emotion_diary.png',
        num: 143,
        text: '记录每日情绪变化，帮助用户更好地了解自己的情绪波动。'
    }
];

document.addEventListener('DOMContentLoaded', function() {
    loadExperimentList();

    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', onInput);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                onConfirm();
            }
        });
    }

    const container = document.querySelector('.container');
    if (container) {
        container.addEventListener('scroll', onScroll);
    }
});

function loadExperimentList() {
    // 写死：使用模拟数据
    setTimeout(() => {
        let filteredData = mockExperiments;
        
        // 搜索过滤
        if (search) {
            filteredData = mockExperiments.filter(item => 
                item.name.includes(search) || item.text.includes(search)
            );
        }
        
        // 分页处理
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const newData = filteredData.slice(startIndex, endIndex);
        
        if (currentPage === 1) {
            array = newData;
        } else {
            array = array.concat(newData);
        }
        
        renderExperimentList();
        updateFinalMessage();
    }, 500);
}

function renderExperimentList() {
    const container = document.getElementById('experimentList');
    if (!container) return;

    container.innerHTML = '';

    array.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'ltem_list';
        itemDiv.onclick = () => listClickHandle(item.id);

        const imgBox = document.createElement('div');
        imgBox.className = 'img_box';

        const img = document.createElement('img');
        img.className = 'img_box_image';
        img.src = item.image || 'images/default-experiment.png';
        img.alt = item.name;

        imgBox.appendChild(img);

        const infoDiv = document.createElement('div');
        infoDiv.className = 'ltem_list_info';

        const topDiv = document.createElement('div');
        topDiv.className = 'ltem_list_info_top';

        const nameDiv = document.createElement('div');
        nameDiv.className = 'line-clamp-1';
        nameDiv.textContent = item.name || '实验名称';

        const numDiv = document.createElement('div');
        numDiv.className = 'complete-number';

        const statusSpan = document.createElement('span');
        statusSpan.className = 'status';
        statusSpan.textContent = `已完成 ${item.num || 0} 次`;

        numDiv.appendChild(statusSpan);

        topDiv.appendChild(nameDiv);
        topDiv.appendChild(numDiv);

        infoDiv.appendChild(topDiv);

        if (item.text) {
            const textDiv = document.createElement('div');
            textDiv.className = 'line-clamp-2';
            textDiv.textContent = item.text;
            infoDiv.appendChild(textDiv);
        }

        itemDiv.appendChild(imgBox);
        itemDiv.appendChild(infoDiv);

        container.appendChild(itemDiv);
    });
}

function updateFinalMessage() {
    const finalMessage = document.getElementById('finalMessage');
    if (finalMessage) {
        finalMessage.style.display = array.length >= pageSize ? 'block' : 'none';
    }
}

function listClickHandle(id) {
    if (id) {
        redirectTo(`experimental_details.html?id=${id}`);
    }
}

function onInput(e) {
    search = e.target.value;
}

function onConfirm() {
    currentPage = 1;
    array = [];
    loadExperimentList();
}

function onSearch() {
    onConfirm();
}

function onScroll(e) {
    const container = e.target;
    const scrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight;
    const clientHeight = container.clientHeight;

    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        if (scrollTop > 300) {
            backToTop.style.display = 'flex';
        } else {
            backToTop.style.display = 'none';
        }
    }

    if (scrollTop + clientHeight >= scrollHeight - 50 && !isRefreshing) {
        onScrollToLower();
    }
}

function onScrollToLower() {
    let filteredData = mockExperiments;
    if (search) {
        filteredData = mockExperiments.filter(item => 
            item.name.includes(search) || item.text.includes(search)
        );
    }
    
    if (array.length < filteredData.length) {
        currentPage++;
        loadExperimentList();
    }
}

function onRefresherRefresh() {
    isRefreshing = true;
    currentPage = 1;
    array = [];
    loadExperimentList();

    setTimeout(() => {
        isRefreshing = false;
    }, 1000);
}

function onToTop() {
    const container = document.querySelector('.container');
    if (container) {
        container.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

function scrollToTop() {
    onToTop();
}

function switchTab(tab) {
    if (tab === 'home') {
        navigateTo('home.html');
    } else if (tab === 'usercenter') {
        navigateTo('usercenter.html');
    }
}