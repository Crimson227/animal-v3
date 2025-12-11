var infoModal = document.getElementById("info-modal");
var modalBackdrop = document.getElementById("modal-backdrop");
var addNewBtn = document.getElementById("add-btn");
var confirmBtn = document.getElementById("confirm-btn");
var updateBtn = document.getElementById("update-btn"); // 新增
var deleteBtn = document.getElementById("delete-btn");

highlightNavbarButton("inventory-nav-btn");

// 点击【物资入库】
addNewBtn.addEventListener('click', function () {
    document.getElementById("itemName").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("unit").value = "";
    document.getElementsByClassName("data id")[0].innerText = "New";

    // 按钮状态
    confirmBtn.classList.remove("hidden");
    updateBtn.classList.add("hidden");
    deleteBtn.classList.add("hidden");

    infoModal.classList.remove("hidden");
    modalBackdrop.classList.remove("hidden");
});

function getInventoryInput() {
    return {
        itemName: document.getElementById("itemName").value,
        category: document.getElementById("category").value,
        quantity: document.getElementById("quantity").value,
        unit: document.getElementById("unit").value
    };
}

// 点击【确认入库】
confirmBtn.addEventListener('click', function () {
    var data = getInventoryInput();
    if (data.itemName == "" || data.quantity == "")
        alert("请填写物品名称和数量");
    else
        postData("/add/Inventory", data, '/inventory');
});

// 点击【更新库存】（新增功能）
updateBtn.addEventListener('click', function () {
    var id = document.getElementsByClassName("data id")[0].innerText;
    var data = getInventoryInput();

    if (data.itemName == "" || data.quantity == "") {
        alert("请填写物品名称和数量");
    } else {
        data.itemID = id; // 带上 ID
        postData("/update/Inventory", data, '/inventory');
    }
});

// 点击【删除】
deleteBtn.addEventListener('click', function () {
    var id = document.getElementsByClassName("data id")[0].innerText;
    postData('/delete/Inventory', { itemID: id }, '/inventory');
});

// 点击表格行（编辑）
var table = document.getElementById("inventory-table");
table.addEventListener('click', function (event) {
    if (event.target.parentNode.classList.contains("table-header")) return;

    var row = event.target.parentNode;
    var rowData = row.getElementsByTagName("th");

    // 回填数据
    document.getElementsByClassName("data id")[0].innerText = rowData[0].innerText;
    document.getElementById("itemName").value = rowData[1].innerText;
    document.getElementById("category").value = rowData[2].innerText;
    document.getElementById("quantity").value = rowData[3].innerText;
    document.getElementById("unit").value = rowData[4].innerText;

    // 按钮状态：显示更新和删除，隐藏添加入库
    confirmBtn.classList.add("hidden");
    updateBtn.classList.remove("hidden");
    deleteBtn.classList.remove("hidden");

    infoModal.classList.remove('hidden');
    modalBackdrop.classList.remove('hidden');
});