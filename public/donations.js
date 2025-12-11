var infoModal = document.getElementById("info-modal");
var modalBackdrop = document.getElementById("modal-backdrop");
var addNewBtn = document.getElementById("add-btn");
var confirmBtn = document.getElementById("confirm-btn");
var updateBtn = document.getElementById("update-btn"); // 新增
var deleteBtn = document.getElementById("delete-btn");

highlightNavbarButton("donations-nav-btn");

// 点击【录入新捐赠】
addNewBtn.addEventListener('click', function () {
    // 清空
    document.getElementById("amount").value = "";
    document.getElementById("date").value = "";
    document.getElementById("note").value = "";
    document.getElementsByClassName("data id")[0].innerText = "新记录";

    // 按钮状态：显示添加，隐藏更新和删除
    confirmBtn.classList.remove("hidden");
    updateBtn.classList.add("hidden");
    deleteBtn.classList.add("hidden");

    infoModal.classList.remove("hidden");
    modalBackdrop.classList.remove("hidden");
});

// 获取输入数据
function getDonationInput() {
    var patronID = document.getElementById("patron-dropdown").value;
    var amount = document.getElementById("amount").value;
    var date = document.getElementById("date").value;
    var note = document.getElementById("note").value;

    if (patronID == "" || amount == "" || date == "") return null;

    return {
        patronID: patronID,
        amount: amount,
        date: date,
        note: note
    };
}

// 点击【确认添加】
confirmBtn.addEventListener('click', function () {
    var data = getDonationInput();
    if (data == null) alert("请填写必填字段！");
    else postData("/add/Donations", data, '/donations');
});

// 点击【保存修改】（新增功能）
updateBtn.addEventListener('click', function () {
    var id = document.getElementsByClassName("data id")[0].innerText;
    var data = getDonationInput();

    if (data == null) {
        alert("请填写必填字段！");
    } else {
        data.donationID = id; // 把 ID 带上，告诉后端改哪条
        postData("/update/Donations", data, '/donations');
    }
});

// 点击【删除记录】
deleteBtn.addEventListener('click', function () {
    var id = document.getElementsByClassName("data id")[0].innerText;
    postData('/delete/Donations', { donationID: id }, '/donations');
});

// 点击表格行（查看/编辑）
var table = document.getElementById("donations-table");
table.addEventListener('click', function (event) {
    if (event.target.parentNode.classList.contains("table-header")) return;

    var row = event.target.parentNode;
    var rowData = row.getElementsByTagName("th");

    // 回填数据
    document.getElementsByClassName("data id")[0].innerText = rowData[0].innerText;
    // 自动选中下拉框（根据姓名模糊匹配，或者手动选）
    // 注意：这里简单处理，可能需要用户手动确认捐赠人
    document.getElementById("amount").value = rowData[2].innerText;
    document.getElementById("date").value = rowData[3].innerText;
    document.getElementById("note").value = rowData[4].innerText;

    // 按钮状态：隐藏添加，显示更新和删除
    confirmBtn.classList.add("hidden");
    updateBtn.classList.remove("hidden");
    deleteBtn.classList.remove("hidden");

    infoModal.classList.remove('hidden');
    modalBackdrop.classList.remove('hidden');
});