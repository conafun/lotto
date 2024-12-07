let myChart = null;

// 初始化随机滑块值
const randomInitialValue = Math.floor(Math.random() * 496) + 5; // 5到500之间的随机数
document.getElementById('iterations').value = randomInitialValue;
document.getElementById('iteration-value').textContent = randomInitialValue;

document.getElementById('shuangseqiu').addEventListener('click', generateShuangseqiu);
document.getElementById('daletou').addEventListener('click', generateDaletou);

// 添加滑块值显示的事件监听器
document.getElementById('iterations').addEventListener('input', function(e) {
    document.getElementById('iteration-value').textContent = e.target.value;
});

function generateShuangseqiu() {
    const iterations = parseInt(document.getElementById('iterations').value);  // 获取滑块值
    const redNumbers = new Array(33).fill(0);
    const blueNumbers = new Array(16).fill(0);
    
    // 使用滑块值进行随机选择
    for(let i = 0; i < iterations; i++) {
        // 红球选择
        for(let j = 0; j < 6; j++) {
            const num = Math.floor(Math.random() * 33) + 1;
            redNumbers[num-1]++;
        }
        // 蓝球选择
        const blueNum = Math.floor(Math.random() * 16) + 1;
        blueNumbers[blueNum-1]++;
    }

    // 获取出现次数最多的6个红球
    const redBalls = redNumbers
        .map((count, index) => ({number: index + 1, count}))
        .sort((a, b) => b.count - a.count)
        .slice(0, 6)
        .map(item => item.number)
        .sort((a, b) => a - b);

    // 获取出现次数最多的蓝球
    const blueBall = blueNumbers
        .map((count, index) => ({number: index + 1, count}))
        .sort((a, b) => b.count - a.count)[0].number;

    // 更新图表
    updateChart(redNumbers, blueNumbers, redBalls, blueBall);
    
    // 显示选中的号码
    displaySelectedNumbers(redBalls, blueBall);
}

function updateChart(redNumbers, blueNumbers, selectedRed, selectedBlue) {
    const ctx = document.getElementById('result').getContext('2d');
    
    if (myChart) {
        myChart.destroy();
    }

    const labels = Array.from({length: 33}, (_, i) => i + 1);
    const backgroundColors = labels.map(num => {
        if (selectedRed.includes(num)) {
            return '#ff4757'; // 红球颜色
        } else if (num === selectedBlue) {
            return '#2e86de'; // 蓝球颜色
        } else {
            return '#ffa502'; // 普通橙色
        }
    });

    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: '号码出现次数',
                data: redNumbers,
                backgroundColor: backgroundColors,
                borderColor: backgroundColors,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#f0f0f0'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: '双色球号码统计',
                    font: {
                        size: 16
                    }
                }
            }
        }
    });
}

function displaySelectedNumbers(redBalls, blueBall) {
    const selectedNumbersDiv = document.getElementById('selected-numbers');
    selectedNumbersDiv.innerHTML = '' + 
        redBalls.map(num => `<span class="red-ball">${String(num).padStart(2, '0')}</span>`).join('') +
        `<span class="blue-ball">${String(blueBall).padStart(2, '0')}</span>`;
}

// 大乐透功能可以后续添加
function generateDaletou() {
    const iterations = parseInt(document.getElementById('iterations').value);  // 获取滑块值
    const redNumbers = new Array(35).fill(0);
    const blueNumbers = new Array(12).fill(0);
    
    // 使用滑块值进行随机选择
    for(let i = 0; i < iterations; i++) {
        // 红球选择
        for(let j = 0; j < 5; j++) {
            const num = Math.floor(Math.random() * 35) + 1;
            redNumbers[num-1]++;
        }
        // 蓝球选择（选择2个）
        for(let j = 0; j < 2; j++) {
            const blueNum = Math.floor(Math.random() * 12) + 1;
            blueNumbers[blueNum-1]++;
        }
    }

    // 获取出现次数最多的5个红球
    const redBalls = redNumbers
        .map((count, index) => ({number: index + 1, count}))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5)
        .map(item => item.number)
        .sort((a, b) => a - b);

    // 获取出现次数最多的2个蓝球
    const blueBalls = blueNumbers
        .map((count, index) => ({number: index + 1, count}))
        .sort((a, b) => b.count - a.count)
        .slice(0, 2)
        .map(item => item.number)
        .sort((a, b) => a - b);

    // 更新图表
    updateDaletouChart(redNumbers, blueNumbers, redBalls, blueBalls);
    
    // 显示选中的号码
    displayDaletouNumbers(redBalls, blueBalls);
}

function updateDaletouChart(redNumbers, blueNumbers, selectedRed, selectedBlue) {
    const ctx = document.getElementById('result').getContext('2d');
    
    if (myChart) {
        myChart.destroy();
    }

    const labels = Array.from({length: 35}, (_, i) => i + 1);
    const backgroundColors = labels.map(num => {
        if (selectedRed.includes(num)) {
            return '#ff4757'; // 红球颜色
        } else if (selectedBlue.includes(num)) {
            return '#2e86de'; // 蓝球颜色
        } else {
            return '#ffa502'; // 普通橙色
        }
    });

    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: '号码出现次数',
                data: redNumbers,
                backgroundColor: backgroundColors,
                borderColor: backgroundColors,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#f0f0f0'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: '大乐透号码统计',
                    font: {
                        size: 16
                    }
                }
            }
        }
    });
}

function displayDaletouNumbers(redBalls, blueBalls) {
    const selectedNumbersDiv = document.getElementById('selected-numbers');
    selectedNumbersDiv.innerHTML = '' + 
        redBalls.map(num => `<span class="red-ball">${String(num).padStart(2, '0')}</span>`).join('') +
        blueBalls.map(num => `<span class="blue-ball">${String(num).padStart(2, '0')}</span>`).join('');
} 