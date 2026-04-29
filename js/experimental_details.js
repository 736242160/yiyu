document.addEventListener('DOMContentLoaded', function() {
    loadExperimentDetail();
});

function loadExperimentDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const experimentId = urlParams.get('id');
    
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
    
    const experiment = mockExperiments.find(e => e.id === parseInt(experimentId));
    
    if (experiment) {
        document.getElementById('experimentImage').src = experiment.image;
        document.getElementById('experimentTitle').textContent = experiment.name;
        document.getElementById('experimentNum').textContent = experiment.num;
        document.getElementById('experimentDescription').textContent = experiment.text;
    } else {
        showToast('实验不存在');
        setTimeout(() => {
            redirectTo('home.html');
        }, 1500);
    }
}

function goBack() {
    navigateTo('home.html');
}

function startExperiment() {
    showToast('升级维护中');
}