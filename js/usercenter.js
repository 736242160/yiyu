let userInfo = {};
let experimental_records = [];
let search = '';
let pageSize = 10;
let currentPage = 1;
let isRefreshing = false;

// 写死：模拟用户信息
const mockUserInfo = {
    name: '用户26054',
    avatar: '',
    birthday: '未填写',
    degree: '未填写'
};

// 写死：模拟实验记录数据
const mockExperimentalRecords = [
    {
        id: 1,
        name: '情绪识别实验',
        create_date: '2024-01-15'
    },
    {
        id: 2,
        name: '注意力训练实验',
        create_date: '2024-01-14'
    },
    {
        id: 3,
        name: '记忆力测试',
        create_date: '2024-01-13'
    },
    {
        id: 4,
        name: '压力水平评估',
        create_date: '2024-01-12'
    },
    {
        id: 5,
        name: '睡眠质量分析',
        create_date: '2024-01-11'
    },
    {
        id: 6,
        name: '认知能力测试',
        create_date: '2024-01-10'
    },
    {
        id: 7,
        name: '反应速度测试',
        create_date: '2024-01-09'
    },
    {
        id: 8,
        name: '情绪日记',
        create_date: '2024-01-08'
    }
];

document.addEventListener('DOMContentLoaded', function() {
    loadUserInfo();
    loadExperimentalRecords();

    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', onInput);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                onConfirm();
            }
        });
    }
});

function loadUserInfo() {
    // 从本地存储读取用户名，如果没有则使用默认值
    const savedUserName = getStorageSync('userName');
    userInfo = {
        ...mockUserInfo,
        name: savedUserName || mockUserInfo.name
    };
    renderUserInfo();
}

function renderUserInfo() {
    const userName = document.getElementById('userName');
    const userDetail = document.getElementById('userDetail');
    const userAvatar = document.getElementById('userAvatar');

    if (userName) {
        userName.textContent = userInfo.name || '用户名';
    }

    if (userDetail) {
        const detailText = [];
        if (userInfo.birthday) {
            detailText.push(`生日: ${userInfo.birthday}`);
        }
        if (userInfo.degree) {
            detailText.push(`学历: ${userInfo.degree}`);
        }
        userDetail.textContent = detailText.join(' | ') || '用户详情';
    }

    if (userAvatar && userInfo.avatar) {
        userAvatar.src = userInfo.avatar;
    }
}

function loadExperimentalRecords() {
    // 写死：使用模拟数据
    setTimeout(() => {
        let filteredData = mockExperimentalRecords;
        
        // 搜索过滤
        if (search) {
            filteredData = mockExperimentalRecords.filter(item => 
                item.name.includes(search) || item.create_date.includes(search)
            );
        }
        
        // 分页处理
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const newData = filteredData.slice(startIndex, endIndex);
        
        if (currentPage === 1) {
            experimental_records = newData;
        } else {
            experimental_records = experimental_records.concat(newData);
        }
        
        renderExperimentalRecords();
        updateFinalMessage();
    }, 500);
}

function renderExperimentalRecords() {
    const container = document.getElementById('reportList');
    if (!container) return;

    container.innerHTML = '';

    experimental_records.forEach((item, index) => {
        const reportDiv = document.createElement('div');
        reportDiv.className = 'report-item';
        reportDiv.onclick = () => gotoPersonReport(item.id);

        const textDiv = document.createElement('div');
        const dateText = formatDate(item.create_date);
        const nameText = item.name ? ` ${item.name}` : '';
        textDiv.textContent = `${dateText}${nameText}`;

        const img = document.createElement('img');
        img.src = 'images/get_into.png';
        img.alt = '进入';

        reportDiv.appendChild(textDiv);
        reportDiv.appendChild(img);

        container.appendChild(reportDiv);
    });
}

function updateFinalMessage() {
    const finalMessage = document.getElementById('finalMessage');
    if (finalMessage) {
        finalMessage.style.display = experimental_records.length >= pageSize ? 'block' : 'none';
    }
}

function gotoUserEditPage() {
    redirectTo('person-info.html');
}

function gotoPersonReport(id) {
    if (id) {
        redirectTo(`person-report.html?id=${id}`);
    }
}

function onInput(e) {
    search = e.target.value;
}

function onConfirm() {
    currentPage = 1;
    experimental_records = [];
    loadExperimentalRecords();
}

function onSearch() {
    onConfirm();
}

function onScrollToLower() {
    let filteredData = mockExperimentalRecords;
    if (search) {
        filteredData = mockExperimentalRecords.filter(item => 
            item.name.includes(search) || item.create_date.includes(search)
        );
    }
    
    if (experimental_records.length < filteredData.length) {
        currentPage++;
        loadExperimentalRecords();
    }
}

function onRefresherRefresh() {
    isRefreshing = true;
    currentPage = 1;
    experimental_records = [];
    loadExperimentalRecords();
    loadUserInfo();

    setTimeout(() => {
        isRefreshing = false;
    }, 1000);
}

function switchTab(tab) {
    if (tab === 'home') {
        navigateTo('home.html');
    } else if (tab === 'usercenter') {
        navigateTo('usercenter.html');
    }
}