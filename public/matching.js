highlightNavbarButton("matching-nav-btn");

const runBtn = document.getElementById('run-match-btn');
const patronSelect = document.getElementById('patron-select');
const tableBody = document.getElementById('match-results-body');

// 这是一个纯 JS 写的模板，不用 Handlebars 编译了，省事
const rowTemplate = (animal) => `
<tr class="table-entry">
    <th style="color: #e76f51; font-weight: 800; font-size: 1.2em;">
        ${animal.matchScore}分
    </th>
    <th>${animal.animalName}</th>
    <th>${animal.species}</th>
    <th>${animal.breed}</th>
    <th><a href="${animal.pictureURL}" target="_blank">查看照片</a></th>
</tr>
`;

runBtn.addEventListener('click', function () {
    const patronID = patronSelect.value;
    if (!patronID) {
        alert("请先选择一位用户！");
        return;
    }

    // 显示加载中
    tableBody.innerHTML = '<tr><td colspan="5" style="text-align:center;">正在计算特征向量...</td></tr>';

    // 请求后端 API
    fetch('/api/match/' + patronID)
        .then(res => res.json())
        .then(data => {
            tableBody.innerHTML = ''; // 清空
            if (data.length === 0) {
                tableBody.innerHTML = '<tr><td colspan="5" style="text-align:center;">暂无匹配结果，建议调整用户偏好。</td></tr>';
                return;
            }
            // 渲染每一行
            data.forEach(animal => {
                tableBody.insertAdjacentHTML('beforeend', rowTemplate(animal));
            });
        })
        .catch(err => {
            console.error(err);
            alert("算法运行失败，请检查控制台");
        });
});