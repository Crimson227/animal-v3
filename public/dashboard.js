highlightNavbarButton("dashboard-nav-btn");

// 1. 从 HTML 隐藏域中获取后端传来的数据
const speciesData = JSON.parse(document.getElementById('raw-species-data').value);
const donationData = JSON.parse(document.getElementById('raw-donation-data').value);
const inventoryData = JSON.parse(document.getElementById('raw-inventory-data').value);

// 通用颜色配置
// AlphaQubit 风格图表配色
const colors = [
    '#C5A059', // 诺贝尔金 (主数据)
    '#1C1917', // 深岩灰 (对比数据)
    '#A8A29E', // 浅灰
    '#D6D3D1', // 更浅灰
    '#78716C'  // 中灰
];

// ==========================================
// 图表 1: 捐赠趋势 (折线图)
// ==========================================
const ctxDonation = document.getElementById('donationChart').getContext('2d');
new Chart(ctxDonation, {
    type: 'line',
    data: {
        labels: donationData.map(item => item.month), // X轴：月份
        datasets: [{
            label: '每月捐赠总额 (元)',
            data: donationData.map(item => item.total), // Y轴：金额
            borderColor: '#2A9D8F',
            backgroundColor: 'rgba(42, 157, 143, 0.2)',
            tension: 0.4, // 曲线平滑度
            fill: true
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'top' }
        }
    }
});

// ==========================================
// 图表 2: 物种分布 (饼图)
// ==========================================
const ctxSpecies = document.getElementById('speciesChart').getContext('2d');
new Chart(ctxSpecies, {
    type: 'doughnut',
    data: {
        labels: speciesData.map(item => item.species),
        datasets: [{
            data: speciesData.map(item => item.count),
            backgroundColor: [colors[0], colors[1], colors[2]],
            borderWidth: 0
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
});

// ==========================================
// 图表 3: 物资库存 (柱状图)
// ==========================================
const ctxInventory = document.getElementById('inventoryChart').getContext('2d');
new Chart(ctxInventory, {
    type: 'bar',
    data: {
        labels: inventoryData.map(item => item.category),
        datasets: [{
            label: '库存总量',
            data: inventoryData.map(item => item.totalQty),
            backgroundColor: colors,
            borderRadius: 5
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: { beginAtZero: true }
        }
    }
});