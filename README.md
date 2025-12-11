# 🐾 流浪动物智慧管理平台 (Smart Animal Shelter Management System V2.0)

> **集成 AI 智能匹配、供应链金融 (SCM) 及 BI 数据决策的全栈式解决方案。**
>
> _"用科技连接爱心，让每一个生命都被温柔以待。"_

## 📖 项目简介

本项目是《数据库系统》课程期末大作业的**企业级重构版本**。

针对传统收容所面临的“信息孤岛”、“人宠匹配难”及“物资管理混乱”等痛点，我们构建了一套高内聚、低耦合的综合信息管理系统。系统不仅实现了动物档案的全生命周期追踪，更首创性地引入了**加权推荐算法**与**运营数据驾驶舱**，将传统的被动记录转变为主动的数字化决策支持。

---

## 🚀 核心功能模块

### 1. 🧠 AI 智能决策 (Smart Match)
* **算法引擎**：内置基于数据库存储过程的线性加权推荐算法。
* **精准推荐**：将用户模糊的领养意向（物种、体型、年龄）转化为数据库层面的特征向量匹配，实时输出匹配度 Top 5 的动物列表，显著提升领养成功率。

### 2. 📊 运营数据驾驶舱 (BI Dashboard)
* **可视化分析**：前端集成 **Chart.js** 图表库，后端通过聚合查询实时计算运营指标。
* **关键指标监控**：
    * 💰 **资金趋势**：近 6 个月捐赠流水波动分析（折线图）。
    * 📦 **物资结构**：食品、医疗等物资的库存水位监控（柱状图）。
    * 🐶 **收容占比**：猫犬物种分布结构分析（环形图）。

### 3. ⛓️ 供应链与财务闭环 (SCM & ERP)
* **物资进销存**：建立标准化的物资分类账，实时监控库存数量与单位，防止物资浪费。
* **捐赠审计**：全流程记录资金流向，确保财务透明。
* **自动化会员体系**：基于 **MySQL 触发器 (Triggers)** 的自动化会员成长体系，用户捐赠后自动计算累计贡献并即时晋升等级（如黄金/白银会员）。

### 4. 📂 动物全生命周期管理 (LCM)
* **档案追踪**：从入库登记、医疗免疫到领养归档的全流程数字化记录。
* **状态流转**：支持“待领养”、“寄养中”、“已领养”等状态的严格流转控制。
* **医疗保障**：独立的疫苗库存管理与电子处方系统，确保每只动物的健康数据可追溯。

### 5. 🛡️ 业务逻辑自动化
* **数据一致性**：利用数据库触发器实现业务规则的强制执行。例如，当办理“领养”手续时，系统自动将动物从“待领养公示”中移除，彻底杜绝“一宠多主”风险。

---

## 🛠️ 技术栈

### 后端 (Backend)
* **Runtime**: Node.js
* **Framework**: Express.js (RESTful API 设计)
* **Database**: MySQL 8.0 Enterprise
* **Core DB Features**: Triggers, Stored Procedures, Transactions, Cascade Delete

### 前端 (Frontend)
* **Template Engine**: Handlebars (SSR 服务端渲染)
* **Styling**: CSS3 (Flexbox & Grid), FontAwesome 图标库
* **Visualization**: Chart.js
* **Interaction**: Native JavaScript (ES6+), AJAX/Fetch API

---

## ⚡ 快速开始 (Quick Start)

### 1. 环境准备
确保本地已安装以下环境：
* **Node.js** (建议 v14+)
* **MySQL 数据库** (建议 v8.0+)

### 2. 数据库配置
1.  登录 MySQL，创建一个新的数据库（例如 `animal_shelter`）。
2.  **关键步骤**：运行项目根目录下的 `animal_shelter_DDL.sql` 脚本。
    * *该脚本会自动创建所有表结构、视图、触发器、存储过程，并导入初始化测试数据。*
3.  打开 `mysql-db-connector.js` 文件，配置你的数据库连接信息：

    ```javascript
    var pool = mysql.createPool({
        connectionLimit : 10,
        host            : 'localhost',
        user            : 'root',      // 你的MySQL用户名
        password        : '你的密码',   // 你的MySQL密码
        database        : 'animal_shelter' // 你的数据库名
    })
    ```

### 3. 安装依赖
在项目根目录下打开终端，运行：

```bash
npm install