SET FOREIGN_KEY_CHECKS = 0;

-- ==========================================
-- 1. 基础表结构 (2025 完整版)
-- ==========================================
DROP TABLE IF EXISTS Animals;
CREATE TABLE `Animals` (
    `animalID` int NOT NULL AUTO_INCREMENT,
    `species` varchar(10),
    `animalName` varchar(20) NOT NULL,
    `age` varchar(10) NOT NULL,
    `gender` varchar(1),
    `breed` varchar(20),
    `size` varchar(10) DEFAULT '中型',
    `pictureURL` varchar(256),
    PRIMARY KEY (`animalID`)
);

DROP TABLE IF EXISTS Vaccines;
CREATE TABLE `Vaccines` (
    `vaccineID` int NOT NULL AUTO_INCREMENT,
    `name` varchar(50) UNIQUE NOT NULL,
    `doses` int,
    `species` varchar(20),
    PRIMARY KEY (`vaccineID`)
);

DROP TABLE IF EXISTS VaccinesAdministered;
CREATE TABLE `VaccinesAdministered` (
    `animalID` int NOT NULL,
    `vaccineName` varchar(50),
    `vaccineID` int,
    `dateGiven` date,
    `dateExpires` date,
    PRIMARY KEY (`animalID`, `vaccineName`),
    FOREIGN KEY (`animalID`) REFERENCES Animals(animalID) ON DELETE CASCADE,
    FOREIGN KEY (`vaccineID`) REFERENCES Vaccines(vaccineID) ON DELETE SET NULL
);

DROP TABLE IF EXISTS Prescriptions;
CREATE TABLE `Prescriptions` (
    `animalID` int NOT NULL,
    `name` varchar(20),
    `frequency` varchar(255),
    PRIMARY KEY (`animalID`, `name`),
    FOREIGN KEY (`animalID`) REFERENCES Animals(`animalID`) ON DELETE CASCADE
);

DROP TABLE IF EXISTS Patrons;
CREATE TABLE `Patrons` (
    `patronID` int NOT NULL AUTO_INCREMENT,
    `firstName` varchar(15),
    `lastName` varchar(15),
    `phoneNumber` varchar(12),
    `address` varchar(50),
    `totalDonated` DECIMAL(10,2) DEFAULT 0,
    `patronLevel` VARCHAR(20) DEFAULT '普通会员',
    PRIMARY KEY (`patronID`)
);

DROP TABLE IF EXISTS PatronPreferences;
CREATE TABLE `PatronPreferences` (
    `preferenceID` int NOT NULL AUTO_INCREMENT,
    `patronID` int,
    `preferredSpecies` varchar(10),
    `preferredSize` varchar(10),
    `minAge` int,
    `maxAge` int,
    PRIMARY KEY (`preferenceID`),
    FOREIGN KEY (`patronID`) REFERENCES Patrons(patronID) ON DELETE CASCADE
);

DROP TABLE IF EXISTS FostersAndAdoptions;
CREATE TABLE `FostersAndAdoptions` (
    `animalID` int NOT NULL,
    `patronID` int,
    `fosteredOrAdopted` varchar(1),
    `date` date,
    PRIMARY KEY (`animalID`),
    FOREIGN KEY (`animalID`) REFERENCES Animals(animalID) ON DELETE CASCADE,
    FOREIGN KEY (`patronID`) REFERENCES Patrons(patronID)
);

DROP TABLE IF EXISTS Adoptable;
CREATE TABLE `Adoptable` (
    `animalID` int NOT NULL,
    `restrictions` text,
    PRIMARY KEY (`animalID`),
    FOREIGN KEY (`animalID`) REFERENCES Animals(animalID) ON DELETE CASCADE
);

DROP TABLE IF EXISTS Donations;
CREATE TABLE Donations (
    donationID int NOT NULL AUTO_INCREMENT,
    patronID int,
    amount DECIMAL(10,2),
    donationDate DATE,
    note TEXT,
    PRIMARY KEY (donationID),
    FOREIGN KEY (patronID) REFERENCES Patrons(patronID) ON DELETE CASCADE
);

DROP TABLE IF EXISTS Inventory;
CREATE TABLE Inventory (
    itemID int NOT NULL AUTO_INCREMENT,
    itemName varchar(50) NOT NULL,
    category varchar(30),
    quantity int,
    unit varchar(10),
    PRIMARY KEY (itemID)
);

-- ==========================================
-- 2. 核心功能：触发器与存储过程
-- ==========================================
DROP TRIGGER IF EXISTS After_Adoption_Insert;
DROP TRIGGER IF EXISTS After_Donation_Update_Patron;
DROP PROCEDURE IF EXISTS CalculateMatchScore;
DROP PROCEDURE IF EXISTS GetAnimalVaccineHistory;

DELIMITER //

-- 触发器1：领养后自动移除待领养状态
CREATE TRIGGER After_Adoption_Insert
AFTER INSERT ON FostersAndAdoptions
FOR EACH ROW
BEGIN
    IF NEW.fosteredOrAdopted = 'A' THEN
        DELETE FROM Adoptable WHERE animalID = NEW.animalID;
    END IF;
END;
//

-- 触发器2：捐赠后自动升级会员等级 (VIP系统)
CREATE TRIGGER After_Donation_Update_Patron
AFTER INSERT ON Donations
FOR EACH ROW
BEGIN
    UPDATE Patrons 
    SET totalDonated = (SELECT SUM(amount) FROM Donations WHERE patronID = NEW.patronID)
    WHERE patronID = NEW.patronID;

    UPDATE Patrons
    SET patronLevel = CASE 
        WHEN totalDonated >= 1000 THEN '黄金会员'
        WHEN totalDonated >= 200 THEN '白银会员'
        ELSE '普通会员'
    END
    WHERE patronID = NEW.patronID;
END;
//

-- 存储过程1：智能匹配算法
CREATE PROCEDURE CalculateMatchScore(IN targetPatronID INT)
BEGIN
    SELECT 
        A.animalID,
        A.animalName,
        A.species,
        A.breed,
        A.pictureURL,
        (
            (CASE WHEN A.species = P.preferredSpecies THEN 50 ELSE 0 END) +
            (CASE WHEN A.size = P.preferredSize THEN 30 ELSE 0 END) +
            (CASE WHEN A.age BETWEEN P.minAge AND P.maxAge THEN 20 ELSE 5 END)
        ) AS matchScore
    FROM Animals A
    JOIN PatronPreferences P ON P.patronID = targetPatronID
    WHERE A.animalID NOT IN (SELECT animalID FROM FostersAndAdoptions)
    ORDER BY matchScore DESC
    LIMIT 5;
END;
//

-- 存储过程2：疫苗历史查询
CREATE PROCEDURE GetAnimalVaccineHistory(IN target_animal_id INT)
BEGIN
    SELECT 
        A.animalName AS '动物名称', 
        V.vaccineName AS '疫苗名称', 
        V.dateGiven AS '接种日期', 
        V.dateExpires AS '过期日期'
    FROM VaccinesAdministered V
    JOIN Animals A ON V.animalID = A.animalID
    WHERE A.animalID = target_animal_id;
END;
//
DELIMITER ;

-- ==========================================
-- 3. 数据灌入 (2025年 扩充版)
-- ==========================================

-- 动物数据 (多样化)
INSERT INTO Animals (species, animalName, age, gender, breed, size, pictureURL) VALUES 
('Canine', '旺财', '3', 'M', '斗牛梗', '中型', 'https://images.unsplash.com/photo-1620001796685-adf7110fe1a7?w=500&q=80'),
('Canine', '乐乐', '2', 'M', '比格犬', '中型', 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&q=80'),
('Feline', '不爽猫', '12', 'F', '三花猫', '小型', 'https://images.unsplash.com/photo-1513245543132-31f507417b26?w=500&q=80'),
('Feline', '煤球', '6', 'M', '暹罗猫', '小型', 'https://images.unsplash.com/photo-1592652426689-4e4f12c4aef5?w=500&q=80'),
('Canine', '史酷比', '4', 'M', '大丹犬', '大型', 'https://images.unsplash.com/photo-1592424701959-07bd1a04dc47?w=500&q=80'),
('Canine', '豆豆', '1', 'F', '泰迪', '小型', 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=500&q=80'),
('Feline', '咪咪', '2', 'F', '狸花猫', '小型', 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500&q=80'),
('Canine', '大黄', '5', 'M', '中华田园犬', '中型', 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=500&q=80'),
('Canine', '不仅', '3', 'F', '哈士奇', '大型', 'https://images.unsplash.com/photo-1563889958749-625626eb8f3c?w=500&q=80'),
('Feline', '小白', '1', 'M', '波斯猫', '小型', 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=500&q=80'),
('Canine', '雪球', '4', 'F', '萨摩耶', '大型', 'https://images.unsplash.com/photo-1529429612779-c8e40df29e48?w=500&q=80'),
('Canine', '黑豹', '2', 'M', '拉布拉多', '大型', 'https://images.unsplash.com/photo-1591769225440-811ad7d6eab2?w=500&q=80'),
('Feline', '加菲', '5', 'M', '异国短毛猫', '小型', 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=500&q=80'),
('Feline', '奥利奥', '3', 'F', '奶牛猫', '小型', 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=500&q=80'),
('Canine', '可乐', '1', 'M', '柯基', '小型', 'https://images.unsplash.com/photo-1612536053346-091a597924c5?w=500&q=80');

-- 人员数据
INSERT INTO Patrons(firstName, lastName, phoneNumber, address, totalDonated, patronLevel) VALUES 
('小明', '王', '138-747-9876', '北京市朝阳区幸福路1号', 1500, '黄金会员'),
('美丽', '张', '139-646-9797', '上海市浦东新区世纪大道88号', 50, '普通会员'),
('建国', '李', '137-669-5543', '广州市天河区体育西路', 300, '白银会员'),
('亚瑟', '摩根', '154-768-4996', '西部荒野大镖客营地', 0, '普通会员'),
('小红', '陈', '142-223-3355', '深圳市南山区科技园', 5000, '黄金会员'),
('伟', '张', '131-111-2222', '武汉市洪山区', 0, '普通会员'),
('娜', '李', '132-222-3333', '成都市锦江区', 100, '普通会员'),
('强', '刘', '133-333-4444', '西安市雁塔区', 200, '白银会员'),
('洋', '赵', '134-444-5555', '杭州市西湖区', 0, '普通会员'),
('敏', '周', '135-555-6666', '南京市鼓楼区', 800, '白银会员'),
('平', '吴', '136-666-7777', '重庆市渝中区', 1200, '黄金会员'),
('欢', '郑', '137-777-8888', '郑州市金水区', 50, '普通会员');

-- 领养偏好 (为智能匹配准备)
INSERT INTO PatronPreferences (patronID, preferredSpecies, preferredSize, minAge, maxAge) VALUES
(1, 'Canine', '大型', 1, 5), 
(2, 'Feline', '小型', 0, 3), 
(3, 'Canine', '中型', 2, 8), 
(5, 'Feline', '小型', 5, 15),
(11, 'Canine', '小型', 0, 2);

-- 疫苗库存
INSERT INTO Vaccines (name, doses, species) VALUES 
('狂犬疫苗2025版', 150, 'D'), ('猫三联Pro', 130, 'C'), ('八联疫苗', 80, 'D'), ('弓形虫疫苗', 45, 'C');

-- 捐赠记录 (更丰富，让折线图好看)
INSERT INTO Donations (patronID, amount, donationDate, note) VALUES 
(1, 1000.00, '2025-01-15', '新年大额捐赠'),
(3, 300.00, '2025-02-10', '医疗专款'),
(5, 5000.00, '2025-03-01', '基地扩建基金'),
(2, 50.00, '2025-03-15', '零花钱'),
(11, 1200.00, '2025-04-05', '企业赞助'),
(8, 200.00, '2025-04-20', '义卖所得'),
(10, 800.00, '2025-05-01', '劳动节献爱心'),
(7, 100.00, '2025-05-15', '月捐');

-- 物资库存 (更丰富，让柱状图好看)
INSERT INTO Inventory (itemName, category, quantity, unit) VALUES 
('皇加密封猫粮', '食物', 50, '袋'), 
('处方罐头', '食物', 120, '罐'), 
('宠物专用消毒液', '清洁', 80, '瓶'),
('吸尘器滤芯', '清洁', 20, '盒'),
('伊丽莎白圈', '医疗', 35, '个'),
('一次性手套', '医疗', 200, '双'),
('大型犬笼', '其他', 10, '个'),
('猫爬架', '其他', 5, '套');

-- 接种记录
INSERT INTO VaccinesAdministered(animalID, vaccineID, vaccineName, dateGiven, dateExpires) VALUES 
(1, 1, '狂犬疫苗2025版', '2025-01-10', '2026-01-10'),
(2, 3, '八联疫苗', '2025-02-05', '2026-02-05'),
(3, 2, '猫三联Pro', '2025-03-01', '2026-03-01'),
(11, 1, '狂犬疫苗2025版', '2025-04-12', '2026-04-12');

-- 领养/寄养记录
INSERT INTO FostersAndAdoptions(animalID, patronID, fosteredOrAdopted, date) VALUES 
(1, 3, 'F', '2025-01-20'),
(4, 5, 'A', '2025-03-10'),
(12, 11, 'A', '2025-05-02');

-- 待领养信息
INSERT INTO Adoptable(animalID, restrictions) VALUES 
(2, "需要大空间运动"), (3, "性格高冷"), (5, "食量大"), (6, "需要定期美容"), (7, "亲人但怕生"), (8, "看家护院"), (9, "精力旺盛"), (10, "适合新手");

SET FOREIGN_KEY_CHECKS = 1;