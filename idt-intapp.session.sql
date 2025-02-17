--@block
DROP TABLE ap_local;
DROP TABLE ap_other;
DROP TABLE s2_local;
DROP TABLE s2_other;
DROP TABLE sa_local;
DROP TABLE sa_other;
DROP TABLE jb_local;
DROP TABLE jb_other;

--@block
CREATE TABLE ap_local(
    service_no VARCHAR(255) PRIMARY KEY,
    date VARCHAR(255),
    pic VARCHAR(20),
    name VARCHAR(100),
    contact VARCHAR(40),
    status VARCHAR(255),
    email VARCHAR(255),
    address TEXT,
    purchase_date VARCHAR(255),
    invoice VARCHAR(255),
    received_items VARCHAR(250),
    pin TEXT,
    issues TEXT,
    solutions TEXT,
    status_desc TEXT,
    remarks TEXT,
    cost INT DEFAULT 0,
    locker INT,
    received_by VARCHAR(20),
    idt_pc VARCHAR(10)
);

--@block
CREATE TABLE s2_local LIKE ap_local;
CREATE TABLE sa_local LIKE ap_local;
CREATE TABLE jb_local LIKE ap_local;
CREATE TABLE ap_other LIKE ap_local;
CREATE TABLE s2_other LIKE ap_local;
CREATE TABLE sa_other LIKE ap_local;
CREATE TABLE jb_other LIKE ap_local;

--@block

CREATE INDEX name_idx ON ap_local(name);
CREATE INDEX name_idx ON ap_other(name);
CREATE INDEX name_idx ON s2_local(name);
CREATE INDEX name_idx ON s2_other(name);
CREATE INDEX name_idx ON sa_local(name);
CREATE INDEX name_idx ON sa_other(name);
CREATE INDEX name_idx ON jb_local(name);
CREATE INDEX name_idx ON jb_other(name);

CREATE INDEX email_idx ON ap_local(email);
CREATE INDEX email_idx ON ap_other(email);
CREATE INDEX email_idx ON s2_local(email);
CREATE INDEX email_idx ON s2_other(email);
CREATE INDEX email_idx ON sa_local(email);
CREATE INDEX email_idx ON sa_other(email);
CREATE INDEX email_idx ON jb_local(email);
CREATE INDEX email_idx ON jb_other(email);

CREATE INDEX contact_idx ON ap_local(contact);
CREATE INDEX contact_idx ON ap_other(contact);
CREATE INDEX contact_idx ON s2_local(contact);
CREATE INDEX contact_idx ON s2_other(contact);
CREATE INDEX contact_idx ON sa_local(contact);
CREATE INDEX contact_idx ON sa_other(contact);
CREATE INDEX contact_idx ON jb_local(contact);
CREATE INDEX contact_idx ON jb_other(contact);

CREATE INDEX received_items_idx ON ap_local(received_items);
CREATE INDEX received_items_idx ON ap_other(received_items);
CREATE INDEX received_items_idx ON s2_local(received_items);
CREATE INDEX received_items_idx ON s2_other(received_items);
CREATE INDEX received_items_idx ON sa_local(received_items);
CREATE INDEX received_items_idx ON sa_other(received_items);
CREATE INDEX received_items_idx ON jb_local(received_items);
CREATE INDEX received_items_idx ON jb_other(received_items);


--@block
CREATE TABLE auth_users(
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    email VARCHAR(255) UNIQUE,
    roles VARCHAR(10) DEFAULT "Normal"
);

--@block
INSERT INTO auth_users (email, roles) VALUES ("danishaiman2000@gmail.com", "Admin");

--@block
INSERT INTO s2_local (service_no, date, name, contact, status, email, address, purchase_date, invoice, received_items, issues, solutions, remarks) VALUES ('WSS2401001', '6/1/2024', 'ERIN CHOY', '019-2807201', 'Completed', NULL, 'USJ 13', '12/2016', NULL, NULL, 'GPU ARTIFACTING, FULL SERVICING', 'WILL DECIDE TO COME BACK FOR GPU PURCHASE ANOTHER DAY', NULL), ('WSS2401002', '6/1/2024', 'TAN KEN WEEN', '011-21051638', 'Completed', NULL, 'SS4', '11/2020', NULL, NULL, 'POWER BUTTON STUCKED, FORMAT C DRIVE, CLEANING', NULL, NULL), ('WSS2401003', '6/1/2024', 'ABDULLAH HASNI', '016-6715226', 'Pass Ampang', NULL, 'CYBERJAYA', '12/2022', NULL, NULL, "CAN'T TURN ON", 'mobo faulty, send to dixon 9/1/2024,', 'loan b760m-A'), ('WSS2401004', '6/1/2024', 'CAITLIN', '016-8351829', 'Completed', NULL, 'PERLA @ ARA SENTRAL', '10/2023', NULL, NULL, 'BLUESCREEN', 'ram faulty, swap tested ok', NULL), ('WSS2401005', '6/1/2024', 'ADRIAN', '016-5886829', 'Pass Setia Alam', NULL, 'OLD KLANG ROAD', 'JU115-18 (6/2018)', NULL, NULL, 'AFTER SHUTDOWN WHEN TURNING BACK ON WILL GO TO BIOS, SUSPECT AIO OVERHEAT', NULL, NULL), ('WSS2401006', '7/1/2024', 'SATISHRAO POTHORAJOO', '017-9981536', 'Completed', NULL, 'PHILEO DAMANSARA ', '2/2016', NULL, NULL, "PC CAN'T TURN ON", 'PSU FAULTY, BOUGHT NEW & SWAP', "DOESN'T WANT TO GO BACK TO SETIA ALAM, AFTER SERVICED THERE HAD PROBLEMS IN 3 DAYS, COMPLAINED VERY BAD CABLE MANAGEMENT & LACK OF ATTENTION TO DETAIL, FIXED ISSUE HIMSELF"), ('WSS2401007', '7/1/2024', 'CHEE HOE', '018-7736368', 'Completed', NULL, 'SERI KEMBANGAN', 'JY052-21 (7/2021)', NULL, NULL, 'FAN MAKING NOISE & UPGRADE PARTS', 'UPGRADE CPU, COOLER, BOARD, RAM & PSU', 'RAM & PSU NOT OURS CHARGE RM100'), ('WSS2401008', '7/1/2024', 'EVAN TOO WING YUEN', '011-33141593', 'Completed', NULL, 'PARISIEN TOWER, BLOCK D', '5/2020', NULL, NULL, 'STICKY LIQUID FOUND ON FANS & GPU, CLEANING', 'DUST CLEANED, MIGHT COME BACK SOME OTHER TIME FOR DETAILED TESTS', 'MIGHT BE FLUID FROM FAN BEARING, FAN PHYSICAL DAMAGED BY SCREWS BEING TOO TIGHT'), ('WSS2401009', '7/1/2024', 'KOH ENG SANG', '016-5918387', 'Completed', NULL, 'METRO PRIMA KEPONG', '04/2022', NULL, NULL, 'CHANGE CASE, NX410 WHITE, CLEANING', NULL, NULL), ('WSS2401010', '8/1/2024', 'CHEAN KAH YAO', '011-61543179', 'Completed', NULL, 'KELANA JAYA', '12/2015', NULL, NULL, 'NO DISPLAY, C DRIVE NOT DETECTED', 'CONTACT CLEAN & CHANGE SATA PORT', NULL), ('WSS2401011', '9/1/2024', 'MR TAN', '018-2068050', 'Pending', NULL, 'PUCHONG', '12/2022', NULL, NULL, 'PC FREEZES, BLUESCREEN, SOMETIMES CAN BOOT, SOMETIMES BIOS MENTION NO BOOT MEDIA', NULL, NULL), ('WSS2401012', '9/1/2024', 'PATRICK PENG', '012-9350883', 'Completed', NULL, 'INDERA SUBANG CONDO', ' PJ221665 (5/2022)', NULL, NULL, 'BLUESCREEN FEW TIMES', 'SWAPPED NEW RAMS', NULL), ('WSS2401013', '9/1/2024', 'ENG JIA ZHE', '012-9272008', 'Completed', NULL, 'PUCHONG', 'MA431-21 (3/2021)', NULL, NULL, 'DUST CLEANING & FORMAT', 'DONE CLEANING & FORMAT', NULL), ('WSS2401014', '9/1/2024', 'ANDREW HONG', '016-2502060', 'Pending', NULL, 'KAYU ARA', '8/2018', NULL, NULL, "CAN'T BOOT TO WINDOWS, HANGS AT LOADING SCREEN", NULL, 'PC CAME BEFORE 2 TIMES'), ('WSS2401015', '9/1/2024', 'XAVIER CHOW', '012-4948602', 'Completed', NULL, 'TROPICANA METROPARK', '11/2019', NULL, NULL, "CAN'T BOOT TO WINDOWS, WRONG BOOT MANAGER, MULTIPLE OS INSIDE", 'UPDATE BIOS & RECONFIGURED BIOS SETTINGS', NULL), ('WSS2401016', '10/1/2024', 'LEONG XU DONG', '012-7212508', 'Completed', NULL, 'UNITED POINT RESIDENCE', '4/2022', NULL, NULL, "PC CAN'T TURN ON", 'SWAPPED TO NEW PSU', NULL), ('WSS2401017', '10/1/2024', 'SUN TAN EIA', '016-2462814', 'Completed', NULL, 'RAWANG', '12/2020', NULL, NULL, "PC NO DISPLAY, CAN'T BOOT", 'SWAPPED TO NEW RAMS, DUST CLEAN', NULL), ('WSS2401018', '10/1/2024', 'CHIA YUEN', '016-5566788', 'Completed', NULL, 'BANGSAR SOUTH', 'MY220-22 (5/2022)', NULL, NULL, "CAN'T BOOT, NO DISPLAY", 'DUST CLEANED, CONTACT CLEANED, UPDATED BIOS & STRESS TESTED', '2 OF THE SAME PCS CAME BEFORE, BOUGHT 4 SAME PCS'), ('WSS2401019', '11/1/2024', 'WONG TING SEN', '018-3231959', 'Completed', NULL, 'SERI KEMBANGAN', 'NV149-23 (11/2023)', NULL, NULL, 'CASE & AIO CHANGE, CHECK GPU FANS, RMA AIO', 'Change case + cooler + gpu bracket, pay and collect at ampang', 'Pass PC Cooler AIO to Dixon for warranty claim'), ('WSS2401020', '11/1/2024', 'JONG KWAN YUNG', '016-8109045', 'Completed', NULL, 'OLD KLANG ROAD', '2018', NULL, NULL, "CAN'T BOOT TO WINDOWS, STUCK AT BIOS", 'Windows Corrupt, reformat windows 11 Pro, deep dust cleaning', NULL), ('WSS2401021', '12/1/2024', 'CARL', '012-4565478', 'Pending', NULL, 'KELANA JAYA', 'JL391-16 (7/2016)', NULL, NULL, 'BOOTS TO BIOS SOMETIMES, PC ALWAYS REBOOT ONCE WHEN TURNING ON, POWER BUTTON FAULTY, BLUESCREEN', NULL, 'BACKUP DATA IF SSD HAVE ISSUES'), ('WSS2401022', '12/1/2024', 'JACKIE', '016-5928947', 'Completed', NULL, 'PETALING JAYA', 'PJ400039 (1/2024)', NULL, NULL, 'WEIRD SOUND AFTER GOING IN GAME', 'BLUETOOTH SPEAKER HAVE TO DISABLE MIC TO SOLVE SOUND ISSUE', 'QUALITY OF SOUND WILL DROP WHEN BLUETOOTH AUDIO & MIC IN USE TOGETHER'), ('WSS2401023', '12/1/2024', 'LIM CHEE HOE', '016-6208261', 'Completed', NULL, 'SERI KEMBANGAN', 'NON-ITPC', NULL, NULL, 'SSD DEAD', 'BUY LEXAR NM790 RM279 & INSTALL WINDOWS RM80', NULL), ('WSS2401024', '12/1/2024', 'M. DANIAL', '018-2493606', 'Completed', NULL, 'SEREMBAN JAYA', '8/2023', NULL, NULL, 'DUST CLEANING ', 'DUST CLEANED', NULL), ('WSS2401025', '12/1/2024', 'LING TOH HING', '018-7709299', 'Pending', NULL, 'PETALING JAYA', 'MY358-21 (5/2021)', NULL, NULL, 'CANNOT TURN ON', NULL, NULL), ('WSS2401026', '12/1/2024', 'ETHEN YEO', '016-3770833', 'Pending', NULL, 'SHAH ALAM', 'NON-ITPC', NULL, NULL, 'RANDOM RESTARTS, BLACK SCREEN BUT HAVE AUDIO', NULL, NULL), ('WSS2401027', '12/1/2024', 'JASON NG KA HIAN', '6588646487', 'Pass Ampang', NULL, 'SG BASED, CURRENTLY BUKIT DAMANSARA', 'SE584-21 (9/2021)', NULL, NULL, 'WINDOWS STUCK AT RECOVERY. SOMETIMES WILL BLACK SCREEN. ', NULL, NULL), ('WSS2401028', '13/1/2024', 'LEE', '017-2683178', 'Pass Ampang', NULL, 'PUCHONG', '3/2020', NULL, NULL, 'PC BOOT LOOP, CHANGE CASE AX61', NULL, NULL), ('WSS2401029', '13/1/2024', 'KERWIN', '016-2232266', 'Pending', NULL, 'DAMANSARA', '3/2023', NULL, NULL, 'RANDOMLY SCREEN OFF, PC LIGHTS STILL ON, DUST CLEAN', NULL, NULL), ('WSS2401030', '13/1/2024', 'WONG', '012-6166445', 'Completed', NULL, NULL, 'NON-ITPC', NULL, NULL, 'KNOCKED PC, THEN NO DISPLAY BUT HAVE POWER', 'DUST & CONTACT CLEANED, STRESS TESTED', 'RM200 SERVICE, CAN WAIT 1 WEEK'), ('WSS2401031', '14/1/2024', 'BERNARD', '016-4852140', 'Completed', NULL, 'ICON CITY, PETALING JAYA', '1/2023', NULL, NULL, 'DUST CLEAN, THERMAL PASTE CHANGE', NULL, NULL), ('WSS2401032', '14/1/2024', 'NG', '016-2104388', 'Completed', NULL, 'DAMANSARA JAYA', '5/2019', NULL, NULL, "PC CAN'T TURN ON, PC FREEZE WHEN SHAKE PC", 'CHANGE PSU, DUST & CONTACT CLEAN', NULL), ('WSS2401033', '14/1/2024', 'KEN', '016-5075817', 'Completed', NULL, 'SETAPAK', '6/2020', NULL, NULL, "HAVE POWER, NO DISPLAY, CAN'T FORCE SHUTDOWN", 'DUST CLEAN & CONTACT CLEAN', NULL), ('WSS2401034', '14/1/2024', 'TIMMY', '017-3564013', 'Completed', NULL, 'M CENTURA SENTUL', '10/2023', NULL, NULL, 'OCCASIONAL BLACK SCREEN DURING USE, DUST CLEANING, BLUESCREEN, USING SAME MONITOR FOR LAPTOP NO ISSUES', 'DUST CLEAN & CONTACT CLEAN, SWAP TO NEW RAMS', NULL), ('WSS2401035', '14/1/2024', 'TIMMY', '017-3564013', 'Pending', NULL, 'M CENTURA SENTUL', 'JU327-18 (06/2018)', NULL, NULL, 'DUST CLEANING, POWER ON NO SIGNAL, NEED TO RESTART A FEW TIMES', NULL, 'MOTHERBOARD BROKEN, CUSTOMER MOST LIKELY WANT TO GET 2ND HAND TO REPLACE'), ('WSS2401036', '14/1/2024', 'CHAD MAN', '018-2466351', 'Completed', NULL, 'PETALING JAYA', '3/2023', NULL, NULL, 'DUST CLEAN, INSTALL NEW WINDOWS IN NEW NM710 1TB, BACK UP C DRIVE DATA TO NEW SSD', 'INSTALLED SSD & WINDOWS', 'WINDOWS 11 HOME, LALAMOVE ONCE READY'), ('WSS2401037', '14/1/2024', 'ZY', '0126799437', 'Completed', NULL, 'PUCHONG', 'NON-ITPC', NULL, NULL, 'REDO CABLE MANAGEMENT & ENQUIRE UPGRADES', 'CABLE MANAGEMENT DONE', 'RM60 SERVICE, BOUGHT RAM & SSD FOR ANOTHER PC'), ('WSS2401038', '14/1/2024', 'ANTHONY', '012-3159660Q', 'Pending', NULL, 'SUBANG 2', 'NON-ITPC', NULL, NULL, 'WINDOWS AFTER BOOT LAGGY FOR 1 MINUTE+, SOMETIMES GPU NO DISPLAY AFTER BOOT, WANT TO CHANGE CASE, AIO & FANS ,CHECK FOR OTHER ISSUES', NULL, 'RM200 SERVICE, CAN WAIT 2 WEEKS+, WANT VERY DETAILED CHECKING, BAD EXPERIENCE WITH OTHER STORES'), ('WSS2401039', '14/1/2024', 'ARIFIN', '012-9135860', 'Completed', NULL, 'IDAMAN PUTERA', '8/2021', NULL, NULL, 'DUST CLEANING', NULL, NULL), ('WSS2401040', '14/1/2024', 'ALEXANDRIA', '019-3330093', 'Completed', NULL, 'SUBANG', '5/2022', NULL, NULL, "NO DISPLAY, CAN'T BOOT", 'RAM TESTED IS FAULTY, RMA & LOAN', NULL), ('WSS2401041', '15/1/2024', 'FOONG', '013-3528352', 'Pending', NULL, 'PUCHONG', 'JA013-24 (01/2024)', NULL, NULL, "IF DIDN'T TURN OFF SOCKET POWER, THE NEXT DAY CAN'T BOOT. HAVE TO FORCE SHUTDOWN THE PC OR RESET ONCE THEN CAN BOOT, ADDS TO SSD UNSAFE SHUTDOWN RECORD. OCCT TEST WILL STOP BECAUSE CPU TEMPS REACH 100C. RAM XMP SUDDENLY TURNED OFF ONCE, CUSTOMER HAD TO TURN IT BACK ON IN BIOS.", NULL, "CUSTOMER FELT ODD THAT CPU TEMPS CAN REACH 100C EVEN IF ITS UNDER STRESS TEST, ITS PRETTY ODD BECAUSE IF BIOS TUNED PROPERLY LIKE POWER LIMIT/TEMP LIMIT WON'T HAVE THIS ISSUE. CUSTOMER ALSO COMPLAINED THAT WHEN HE RECEIVED THE PC, FAN SPEED IS SET TO 100% ALL THE TIME, THIS IS VERY NOISY, HAD TO RETUNE FAN SPEED HIMSELF IN BIOS. HOW COME DIDN'T SET POWER LIMIT/ TEMP LIMIT & WHY FANS SET TO 100%? HQ STAFF ASK HIM TO COME TO SS2 TO LOOK FOR JOHN/RICHARD, SO WILL TEST THE PC AT SS2"), ('WSS2401042', '16/1/2024', 'TAN KIAN MUN', '016-2120700', 'Completed', NULL, 'BUKIT JELUTONG', 'S0823086 (08/2023)', NULL, NULL, 'GPU ARTIFACTING & WHEN PLAYING GAMES, GAMES ALSO STUTTER FREQUENTLY, SOMETIMES WHEN NOT GAMING WILL HAVE THE SAME ISSUES ALSO', 'RMA 4070 GPU, LOAN RTX 4060', NULL), ('WSS2401043', '16/1/2024', 'SONYA (KALEY SDN BHD)', '012-3364033', 'Pass Ampang', NULL, 'BANDAR PUTERI, PUCHONG', 'JA050-24 (1/2024)', NULL, NULL, 'PC AUTO RESTART DURING USE, AFTER FEW TIMES AUTO RESTART, WILL GO TO BIOS, BOOT FAILURE DETECTED', 'Ampang - overheat issue, re-assemble AIO, reapply using Artic SIlve 5, set limit for TDP, prim95 + furmark 4 hours no restart / crash, maybe something loose during transportation', 'send back to SS2 for lalamove arrangement back to customer office'), ('WSS2401044', '16/1/2024', 'MR TARIK SRHIR', '01111251724', 'Pending', NULL, 'PUCHONG', 'PJ225092 (12/2023)', NULL, NULL, 'YOUTUBE FLICKERING SOMETIMES, GAME FREEZE & PC AUTO RESTART, RECENTLY GAME CRASH TO DESKTOP, POP UP ERROR RAN OUT OF MEMORY, HAVE TO RESTART PC ONLY THEN CAN RUN GAMES AGAIN', NULL, "MENTIONED PC HAS A LOUD CLICK AFTER SHUTDOWN, PREVIOUSLY DIDN'T HAVE THIS ISSUE, MOST LIKELY NORMAL PSU CLICK DURING SHUTDOWN"), ('WSS2401045', '16/1/2024', 'CHOW THIEN LEONG', '016-5517150', 'Completed', NULL, 'PENULLG', '7/2015', NULL, NULL, 'BACKUP C DRIVE, OTHER DRIVES DONT TOUCH, REFORMAT WINDOWS 10 HOME', 'FORMAT & INSTALLED WINDOWS 10 HOME', 'COLLECTING ON 18/1/2024'), ('WSS2401046', '17/1/2024', 'DING', '016-5722037', 'Completed', NULL, 'SUNWAY NAUTICA', 'JY187-23 (7/2023)', NULL, NULL, 'RANDOMLY GET FAN NOISE, CASE FAN RGB NOT WORKING', NULL, NULL), ('WSS2401047', '17/1/2024', 'ONG SE REN', '017-7723410', 'Completed', NULL, 'SUBANG JAYA', '2/2019', NULL, NULL, 'NO DISPLAY', 'DUST & CONTACT CLEANED', 'SERVICE RM200'), ('WSS2401048', '17/1/2024', 'GO', '016-4111358', 'Pending', NULL, 'BANGSAR', 'NON-ITPC', NULL, NULL, "RUN CSGO WILL AUTO RESTART, DON'T FORMAT", 'PSU FAULTY', NULL), ('WSS2401049', '18/1/2024', 'JOE', '013-6707943', 'Pass Setia Alam', NULL, 'TAMAN BULLION MEWAH, BATU CAVES', 'AG310-23 (8/2023)', NULL, NULL, 'BLUESCREEN FREQUENTLY DURING USE, OVERHEATING', NULL, 'NEED IT URGENTLY, GIGABYTE G5 MF NOTEBOOK, SN232015001520'), ('WSS2401050', '18/1/2024', 'SENG', '012-6910256', 'Pending', NULL, 'BANDAR MENJARALA', 'NON-ITPC', NULL, NULL, 'AUTO RESTART, CANNOT START EA GAMES, HAVE FAN NOISE', NULL, NULL), ('WSS2401051', '18/1/2024', 'ETHAN', '012-5207164', 'Pending', NULL, 'KOTA DAMANSARA', '8/2016', NULL, NULL, 'FORMAT ALL DRIVES & CLEANING, FRONT USB 1 PORT NOT WORKING, DIST HAVE ERROR CHECKING', NULL, 'WANT TO COLLECT ON 21/1/2024'), ('WSS2401052', '19/1/2024', 'FONG', '011-55435743', 'Completed', NULL, 'PETALING JAYA', '7/2020', NULL, NULL, 'FANS MAKING NOISE', 'BOUGHT & INSTALLED NEW FANS, DUST CLEAN', NULL), ('WSS2401053', '19/1/2024', 'YAP CHEE YUNG', '018-2859456', 'Completed', NULL, 'TAMAN WANGSA PERMAI, SUNGAI BULOH', 'JA501-20 (01/2020)', NULL, NULL, 'PC FREEZES OFTEN', 'DUST & CONTACT CLEANED, UPDATE BIOS & TUNED, STRESS TESTED 2 HOUR NO FREEZE', NULL), ('WSS2401054', '19/1/2024', 'AZIM', '012-3600000', 'Pending', NULL, 'MONT KIARA', '9/2022', NULL, NULL, 'UPGRADE NZXT KRAKEN 360 RGB BLACK, LEXAR 2TB OS DRIVE, LEXAR 4TB 2ND DRIVE, OLD SSD FORMAT & RETURN BACK TO CUSTOMER', NULL, NULL);

INSERT INTO sa_local (service_no, date, name, contact, status, email, address, purchase_date, invoice, received_items, issues, solutions, remarks) VALUES ('WSA2401001', '7/1/2024', 'AYU ', '012-7113673', 'Completed', NULL, NULL, 'NOT ITPC', NULL, NULL, 'FAULTY MOTHERBOARD ', 'CHANGE TO A NEW MOTHERBOARD ', NULL), ('WSA2401002', '6/1/2024', 'ADRIAN', '016-5886829', 'Pass Setia Alam', NULL, 'OLD KLANG ROAD', 'JU115-18 (6/2018)', NULL, NULL, 'AFTER SHUTDOWN WHEN TURNING BACK ON WILL GO TO BIOS, SUSPECT AIO OVERHEAT', 'Aio send RMA (42464)', 'customer want upgrade cpu, mb & ram. Not urgent, customer wait AIO done RMA'), ('WSA2401003', '12/1/2024', 'Chia Seng Guan', '013-509 1149', 'Completed', NULL, 'Pulau Ketam', '02/21', NULL, NULL, 'm.2 faulty, oxidized contact pin', 'customer buy new ssd, upgrade ram   ChiaChiewTeng\n94k Jalan Dua 42940 Pulau Ketam Selangor \n0135091149', 'gdex to customer. send back hq for packing'), ('WSA2401004', '13/1/2024', 'chan wai hong', '016-3122634', 'Completed', NULL, NULL, 'NOT ITPC', NULL, NULL, 'NO DISPLAY', 'ram loose,clean contact ram, gpu. Burn in test 4 hours ', NULL), ('WSA2401005', '13/01/2024', 'Muhammad Huzaifah', '013-7524243', 'Completed', NULL, NULL, 'NOT ITPC', NULL, NULL, 'NO DISPLAY', 'clean contact ram, gpu. dust cleaning. pc no problem', 'service charge + cleaning -- RM130'), ('WSA2401006', '13/1/2024', 'adi', '012-2507797', 'Completed', NULL, NULL, '06/23', NULL, NULL, 'NO POWER, DUST CLEANING', 'change to CSK650 + RM100', NULL), ('WSA2401007', '11/1/2024', 'saravaNULL', '016-6527569', 'Pending', NULL, NULL, 'laptop not ITPC', NULL, NULL, 'upgrade ssd , ram replace battery ', NULL, NULL), ('WSA2401008', '14/1/2024', 'Eva', '016-9497489', 'Pending', NULL, NULL, '05/19', NULL, NULL, 'pc crash after format win 11, hang in genshin. Dust cleaning ', 'ram mixed, 3200mzh & 2666mhz . Adjust xmp to 2666mhz.Previously is 1866mhz. Adjust ram position ', 'ram kit different. gskill 1 set, hyperx 1 set'), ('WSA2401009', '15/1/2024', 'Roslina', '014-8331983', 'Completed', NULL, NULL, 'NOT ITPC', NULL, NULL, 'pc upgrade ram & ssd. dust cleaning', 'upgrade ssd 512gb + 8gb ram. ', NULL), ('WSA2401010', '15/1/2024', 'Pierce', '016-9208337', 'Completed', NULL, NULL, '10/23', NULL, NULL, 'psu faulty (CSK550)', 'swapped to csk650 + RM50', NULL), ('WSA2401011', '15/1/2024', 'JF Nutritech Sdn Bhd', '016-6685875', 'Completed', NULL, NULL, 'NOT ITPC', NULL, NULL, 'format windows', NULL, NULL), ('WSA2401012', '15/1/2024', 'Ng Kok Hao', '019-2222036', 'Completed', NULL, NULL, 'IDT PC', NULL, NULL, 'format ssd', 'done format', NULL), ('WSA2401013', '17/1/2024', 'Satest Balaraman', '012-32995463', 'Pending', NULL, NULL, '05/21', NULL, NULL, 'fps drop ingame, pc suddenly shut down', NULL, NULL), ('WSA2401014', '17/1/2024', 'Khim', '019-900 7784', 'Completed', NULL, 'Setia Alam', '07/22', NULL, NULL, 'pc no display', 'swap new ram aegis 8gb 3200mhz  -2pcs, dust clean', NULL), ('WSA2401015', '19/1/2024', 'ALI AZMAN ', '014-8139201', 'Completed', NULL, NULL, '05/20', NULL, NULL, 'ssd faulty', 'Sent RMA, dust clean, format to win11 & updated all', NULL);

INSERT INTO ap_local (service_no, date, name, contact, status, email, address, purchase_date, invoice, received_items, issues, solutions, remarks) VALUES ('WAP2401001', '06/01/2024', 'HERMAN LIM KIN OON', '011-33409601', 'Completed', NULL, NULL, 'NOT ITPC (ASUS LAPTOP)', NULL, NULL, 'ADD 1TB SATA/NVME SSD, BACKUP DATA', 'Replace New Gigabyte Sata 1tb SSD RM269, Services Charge rm100', NULL), ('WAP2401002', '09/01/2024', 'NOR SHARIKAH', '017-5512891', 'Completed', NULL, NULL, '7.1.23 / JA087-23', NULL, NULL, 'NO DISPLAY (SUSPECT GPU)', 'Sleeve cable issue, Customer buy new one, RM100 for both. Mobo faulty,', 'Change both gpu and 24 pin psu sleeved'), ('WAP2401003', '09/01/2024', 'POON HONG JUN', '0123667791', 'Completed', NULL, NULL, 'NOT ITPC', NULL, NULL, 'CHANGE NEW CASE', 'NX270 RM169, SERVICE CHARGE RM150', NULL), ('WAP2401004', '09/01/2024', 'HAFIZ JOHARI', '0192724748', 'Completed', NULL, NULL, '3/2015', NULL, NULL, 'CANT ACCESS WINDOWS (SUSPECT SSD), UPGRADE PART', 'CPU problem, due to old system, customer prefer purchase new pc', NULL), ('WAP2401005', '09/01/2024', 'ETMOND', '0122991730', 'Pending', NULL, NULL, '2/2023', NULL, NULL, 'RANDOM BLANK SCREEN WHEN HIGH GRAPHICS SOFTWARE / RENDER', 'SEND ZOTAC 4070 TI TRINITY OC FOR WARRANTY CLAIM', 'LOAN MSI 4070 VENTUS 2X (NEW UNIT) V602-V5130129SB2310003353'), ('WAP2401006', '09/01/2024', '-', '01114254237', 'Completed', NULL, NULL, '-', NULL, NULL, 'Power Button Faulty, Unable to boot', 'Replace new Casing', NULL), ('WAP2401007', '09/01/2024', 'Navintran', '01136051227', 'Completed', NULL, NULL, '07/21', NULL, NULL, '- Windows corrupt, suspect windows / SSD', 'ram issue, replaced tested ok, reformat widnows ocrrupted', NULL), ('WAP2401008', '09/01/2024', 'Chiew Wee Chin', '0167190869', 'Completed', NULL, 'No 14, Main Bazaar 98700 Limbang Sarawak', '-', NULL, NULL, 'Dust clean & update bios, pack back to sarawak', 'yes', NULL), ('WAP2401009', '09/01/2024', 'mr Asri', '0166698103', 'Completed', NULL, NULL, 'Non IDT PC / IDT Old Customer', NULL, NULL, 'x4 Office PC need to check for upgrade / repair', 'upgrade processor, change some faulty ssd, add wifi and EX400', NULL), ('WAP2401010', '10/01/2024', 'HAO', '0133498788', 'Completed', NULL, NULL, NULL, NULL, NULL, 'Random no display', 'tested no issue, 2 monitor also no issue, dust clean, ram and contact spray., updated all', NULL), ('WAP2401011', '10/01/2024', 'Chinn Ming Yu ', '0182060802', 'Completed', NULL, NULL, '12/2021', NULL, NULL, 'play game bsod, request format C drive only', 'C drive ggbyte nvme sent rma, m30 1 to 1 swap', NULL), ('WAP2401012', '10/01/2024', 'Mr Ivan Tan', '0176012374', 'Completed', NULL, NULL, '7/21', NULL, NULL, 'Random Restart when Play Game', 'test all working fine, deep cleaning, update latest bios, DDU and install latest nvidia driver', NULL), ('WAP2401013', '10/01/2024', 'Jacke Fong', '0183420966', 'Completed', NULL, NULL, 'Non IDT PC', NULL, NULL, 'Overheat after change cooler, rm100 services', 'Deep dust cleaning + Reapply Artic Silver 5 thermal paste', NULL), ('WAP2401014', '10/01/2024', 'Chiew Wee Chin', '01135056090', 'Completed', NULL, 'No 14, Main Bazaar 98700 Limbang Sarawak', 'SE386-22', NULL, NULL, 'Pc fans run at full speed, then monitor lost signal, Change hyte Y70 case', 'Remove 12VHPWR Adapter, Add CORSAIR 600W PCIe 5.0 12VHPWR rm79', NULL), ('WAP2401015', '10/01/2024', 'Wong Chian Hong', '0123193573', 'Completed', NULL, 'Motorola Solutions PeNULLg', 'SE293-23', NULL, NULL, 'No display after booting up', 'driver issue, tested ok, reroute ssd as requested, added free RM sata cable', NULL), ('WAP2401016', '11/01/2024', 'tan wai kit', '0102147850', 'Completed', NULL, NULL, 'ap 2020', NULL, NULL, 'bsod when play game, copy files also bsod, want to replace mp510 to nm710 1tb , win 11 home ', 'Change SSD and change RAM', NULL), ('WAP2401017', '12/01/2024', 'Kuan Jansen', '0122323883', 'Completed', NULL, NULL, NULL, NULL, NULL, 'No Power (suspect psu)', 'mobo / cpu faulty', NULL), ('WAP2401018', '12/01/2024', 'Clement Teoh', '0122801092', 'Completed', NULL, NULL, NULL, NULL, NULL, 'Random freeze during gaming / normal usage', 'C partition not enough space, remove some game, dust cleaning + update all', NULL), ('WAP2401019', '12/01/2024', 'Mohammad Izzat', '0179391195', 'Completed', NULL, 'Kuantan', '3/23', NULL, NULL, 'windows boot problem + dust cleaning', 'set back at bios and remove other bootable', NULL), ('WAP2401020', '12/01/2024', 'Adam Amsyar', '0127090676', 'Pending', NULL, 'Ampang', '3rd party', NULL, NULL, 'BSOD / Hang', 'Motherboard / CPU problem, need change both due to old model', NULL), ('WAP2401021', '12/01/2024', 'Chung Wye Leon', '0162248368', 'Completed', NULL, 'Sri Kembangan', 'JU072-20', NULL, NULL, 'Nzxt fan not running + deep dust cleaning', NULL, NULL), ('WAP2401022', '13/01/2024', 'Woon Chengyi', '0123826712', 'Completed', NULL, 'Cheras', '3/2019', NULL, NULL, 'Change SSD (customer bring himself) + 1tb Sata SSD', 'Dust cleaning, add ssd, format windows 10 home', NULL), ('WAP2401023', '13/01/2024', 'Mr Joshua', '0182722373', 'Completed', NULL, NULL, 'MY441/23', NULL, NULL, 'Logiteh G304 Wireless sensor issue', 'Claim for warranty (loan 1 logitech office mouse)', 'waiting for warranty claim'), ('WAP2401024', '13/01/2024', 'Keith', '0169033668', 'Pending', NULL, NULL, 'Non IDT PC', NULL, NULL, 'Random freeze and blank screen, fan all full speed', NULL, NULL), ('WAP2401025', '15/01/2024', 'Abdul Bafitg', '0182356493', 'Pending', NULL, NULL, '2 PC Non IDT', NULL, NULL, 'Upgrade', NULL, NULL), ('WAP2401026', '15/01/2024', 'Liow Wil-Lie', '01116576823', 'Completed', NULL, 'Bukit Jalil', 'DE377/22', NULL, NULL, 'Random Freeze / Hang', 'Kingston NV2 256gb corrupt, swap with Gigabyte 256gb, 1 to 1 exchange', NULL), ('WAP2401027', '15/01/2024', 'Azri Zain', '0123870430', 'Pending', NULL, NULL, NULL, NULL, NULL, 'MSI RTX 4090 Suprim X24 Artifact (before this help him repair for burning cable mod adapter)', 'pass to dixon sent for warranty', 'waiting for warranty claim'), ('WAP2401028', '15/01/2024', 'Faliq Ikhwan', '0122675614', 'Completed', NULL, NULL, 'Non IDT PC RM100', NULL, NULL, 'Boot Loop', 'Customer upgrade new CPU,Mobo and RAM', NULL), ('WAP2401029', '16/01/2024', 'Danish', '0179300191', 'Completed', NULL, NULL, NULL, NULL, NULL, 'Boot Loop / auto restart', 'Motherboard Issue, replace with buffer mobo', NULL), ('WAP2401030', '16/01/2024', 'Ng Liang Quan (JB)', '0197999866', 'Completed', NULL, 'JB', 'JB', NULL, NULL, 'USB port not functioning', 'Deep dust cleaning, clean usb with contact cleaner, test all port working fine, update bios + driver, pass back to dixon', NULL), ('WAP2401031', '16/01/2024', 'Tan Yap Shin (JB)', '0127797217', 'Pending', NULL, 'jb', 'jb', NULL, NULL, 'BSOD', 'Processor dead, recommend customer to upgrade new proc + mobo', NULL), ('WAP2401032', '17/01/2024', 'Alex Diong', '01173636212', 'Completed', NULL, 'Flat Pandan Perdana', '9/23', NULL, NULL, 'Random BSOD', 'Replace Aegis 8gb ddr4 3200mhz RAM', NULL), ('WAP2401033', '17/01/2024', 'Izzah', '0136215263', 'Pending', NULL, NULL, '10/21', NULL, NULL, 'No Power (suspect psu)', 'Motherboard dead, send for warranty claim, ', 'Waiting for warranty claim, loan Asus H510M-E CSM'), ('WAP2401034', '18/01/2024', 'Lee Kwok Noe', '0143337812', 'Pending', NULL, 'Taman Bukit Segar', 'JA116-24', NULL, NULL, 'Random Crash / Blank Screen when play game, NEW PC', NULL, NULL), ('WAP2401035', '19/01/2024', 'Evon Ong', '0103710775', 'Pending', NULL, 'Jalan Mandarina', '04/04/2023', NULL, NULL, 'Philips 24M1N32002 - Panel Glitching Issue', 'Send for warranty claim', 'Loan MSI MP242 (Buffer Unit)'), ('WAP2401036', '19/01/2024', 'Luo Yong Kang', '0129088622', 'Pending', NULL, 'Melawati', '4/21', NULL, NULL, 'Blank Screen', NULL, NULL);

--@block

SELECT * FROM ap_local WHERE service_no = "WAP2412068";

--@block

CREATE TABLE ap_local_history(
    history_id INT AUTO_INCREMENT PRIMARY KEY,
    service_no VARCHAR(255),
    date VARCHAR(255),
    pic VARCHAR(20),
    name TEXT,
    contact TEXT,
    status VARCHAR(255),
    email VARCHAR(255),
    address TEXT,
    purchase_date VARCHAR(255),
    invoice VARCHAR(255),
    received_items VARCHAR(250),
    pin TEXT,
    issues TEXT,
    solutions TEXT,
    status_desc TEXT,
    remarks TEXT,
    cost INT DEFAULT 0,
    locker INT,
    received_by VARCHAR(20),
    idt_pc VARCHAR(10),
    change_type ENUM('INSERT', 'UPDATE', 'DELETE') NOT NULL,
    change_timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);

--@block

CREATE TABLE s2_local_history LIKE ap_local_history;
CREATE TABLE sa_local_history LIKE ap_local_history;
CREATE TABLE jb_local_history LIKE ap_local_history;

--@block

CREATE TRIGGER ap_after_insert
AFTER INSERT ON ap_local
FOR EACH ROW
BEGIN
    INSERT INTO ap_local_history(service_no, date, pic, name, contact, status, email, address, purchase_date, invoice, received_items, pin, issues, solutions, status_desc, remarks, cost, locker, received_by, idt_pc, change_type)
    VALUES (NEW.service_no, NEW.date, NEW.pic, NEW.name, NEW.contact, NEW.status, NEW.email, NEW.address, NEW.purchase_date, NEW.invoice, NEW.received_items, NEW.pin, NEW.issues, NEW.solutions, NEW.status_desc, NEW.remarks, NEW.cost, NEW.locker, NEW.received_by, NEW.idt_pc, "INSERT");
END;
CREATE TRIGGER ap_after_update
AFTER UPDATE ON ap_local
FOR EACH ROW
BEGIN
    INSERT INTO ap_local_history(service_no, date, pic, name, contact, status, email, address, purchase_date, invoice, received_items, pin, issues, solutions, status_desc, remarks, cost, locker, received_by, idt_pc, change_type)
    VALUES (NEW.service_no, NEW.date, NEW.pic, NEW.name, NEW.contact, NEW.status, NEW.email, NEW.address, NEW.purchase_date, NEW.invoice, NEW.received_items, NEW.pin, NEW.issues, NEW.solutions, NEW.status_desc, NEW.remarks, NEW.cost, NEW.locker, NEW.received_by, NEW.idt_pc, "UPDATE");
END;
CREATE TRIGGER ap_after_delete
AFTER DELETE ON ap_local
FOR EACH ROW
BEGIN
    INSERT INTO ap_local_history(service_no, date, pic, name, contact, status, email, address, purchase_date, invoice, received_items, pin, issues, solutions, status_desc, remarks, cost, locker, received_by, idt_pc, change_type)
    VALUES (OLD.service_no, OLD.date, OLD.pic, OLD.name, OLD.contact, OLD.status, OLD.email, OLD.address, OLD.purchase_date, OLD.invoice, OLD.received_items, OLD.pin, OLD.issues, OLD.solutions, OLD.status_desc, OLD.remarks, OLD.cost, OLD.locker, OLD.received_by, OLD.idt_pc, "DELETE");
END;
CREATE TRIGGER s2_after_insert
AFTER INSERT ON s2_local
FOR EACH ROW
BEGIN
    INSERT INTO s2_local_history(service_no, date, pic, name, contact, status, email, address, purchase_date, invoice, received_items, pin, issues, solutions, status_desc, remarks, cost, locker, received_by, idt_pc, change_type)
    VALUES (NEW.service_no, NEW.date, NEW.pic, NEW.name, NEW.contact, NEW.status, NEW.email, NEW.address, NEW.purchase_date, NEW.invoice, NEW.received_items, NEW.pin, NEW.issues, NEW.solutions, NEW.status_desc, NEW.remarks, NEW.cost, NEW.locker, NEW.received_by, NEW.idt_pc, "INSERT");
END;
CREATE TRIGGER s2_after_update
AFTER UPDATE ON s2_local
FOR EACH ROW
BEGIN
    INSERT INTO s2_local_history(service_no, date, pic, name, contact, status, email, address, purchase_date, invoice, received_items, pin, issues, solutions, status_desc, remarks, cost, locker, received_by, idt_pc, change_type)
    VALUES (NEW.service_no, NEW.date, NEW.pic, NEW.name, NEW.contact, NEW.status, NEW.email, NEW.address, NEW.purchase_date, NEW.invoice, NEW.received_items, NEW.pin, NEW.issues, NEW.solutions, NEW.status_desc, NEW.remarks, NEW.cost, NEW.locker, NEW.received_by, NEW.idt_pc, "UPDATE");
END;
CREATE TRIGGER s2_after_delete
AFTER DELETE ON s2_local
FOR EACH ROW
BEGIN
    INSERT INTO s2_local_history(service_no, date, pic, name, contact, status, email, address, purchase_date, invoice, received_items, pin, issues, solutions, status_desc, remarks, cost, locker, received_by, idt_pc, change_type)
    VALUES (OLD.service_no, OLD.date, OLD.pic, OLD.name, OLD.contact, OLD.status, OLD.email, OLD.address, OLD.purchase_date, OLD.invoice, OLD.received_items, OLD.pin, OLD.issues, OLD.solutions, OLD.status_desc, OLD.remarks, OLD.cost, OLD.locker, OLD.received_by, OLD.idt_pc, "DELETE");
END;
CREATE TRIGGER sa_after_insert
AFTER INSERT ON sa_local
FOR EACH ROW
BEGIN
    INSERT INTO sa_local_history(service_no, date, pic, name, contact, status, email, address, purchase_date, invoice, received_items, pin, issues, solutions, status_desc, remarks, cost, locker, received_by, idt_pc, change_type)
    VALUES (NEW.service_no, NEW.date, NEW.pic, NEW.name, NEW.contact, NEW.status, NEW.email, NEW.address, NEW.purchase_date, NEW.invoice, NEW.received_items, NEW.pin, NEW.issues, NEW.solutions, NEW.status_desc, NEW.remarks, NEW.cost, NEW.locker, NEW.received_by, NEW.idt_pc, "INSERT");
END;
CREATE TRIGGER sa_after_update
AFTER UPDATE ON sa_local
FOR EACH ROW
BEGIN
    INSERT INTO sa_local_history(service_no, date, pic, name, contact, status, email, address, purchase_date, invoice, received_items, pin, issues, solutions, status_desc, remarks, cost, locker, received_by, idt_pc, change_type)
    VALUES (NEW.service_no, NEW.date, NEW.pic, NEW.name, NEW.contact, NEW.status, NEW.email, NEW.address, NEW.purchase_date, NEW.invoice, NEW.received_items, NEW.pin, NEW.issues, NEW.solutions, NEW.status_desc, NEW.remarks, NEW.cost, NEW.locker, NEW.received_by, NEW.idt_pc, "UPDATE");
END;
CREATE TRIGGER sa_after_delete
AFTER DELETE ON sa_local
FOR EACH ROW
BEGIN
    INSERT INTO sa_local_history(service_no, date, pic, name, contact, status, email, address, purchase_date, invoice, received_items, pin, issues, solutions, status_desc, remarks, cost, locker, received_by, idt_pc, change_type)
    VALUES (OLD.service_no, OLD.date, OLD.pic, OLD.name, OLD.contact, OLD.status, OLD.email, OLD.address, OLD.purchase_date, OLD.invoice, OLD.received_items, OLD.pin, OLD.issues, OLD.solutions, OLD.status_desc, OLD.remarks, OLD.cost, OLD.locker, OLD.received_by, OLD.idt_pc, "DELETE");
END;
CREATE TRIGGER jb_after_insert
AFTER INSERT ON jb_local
FOR EACH ROW
BEGIN
    INSERT INTO jb_local_history(service_no, date, pic, name, contact, status, email, address, purchase_date, invoice, received_items, pin, issues, solutions, status_desc, remarks, cost, locker, received_by, idt_pc, change_type)
    VALUES (NEW.service_no, NEW.date, NEW.pic, NEW.name, NEW.contact, NEW.status, NEW.email, NEW.address, NEW.purchase_date, NEW.invoice, NEW.received_items, NEW.pin, NEW.issues, NEW.solutions, NEW.status_desc, NEW.remarks, NEW.cost, NEW.locker, NEW.received_by, NEW.idt_pc, "INSERT");
END;
CREATE TRIGGER jb_after_update
AFTER UPDATE ON jb_local
FOR EACH ROW
BEGIN
    INSERT INTO jb_local_history(service_no, date, pic, name, contact, status, email, address, purchase_date, invoice, received_items, pin, issues, solutions, status_desc, remarks, cost, locker, received_by, idt_pc, change_type)
    VALUES (NEW.service_no, NEW.date, NEW.pic, NEW.name, NEW.contact, NEW.status, NEW.email, NEW.address, NEW.purchase_date, NEW.invoice, NEW.received_items, NEW.pin, NEW.issues, NEW.solutions, NEW.status_desc, NEW.remarks, NEW.cost, NEW.locker, NEW.received_by, NEW.idt_pc, "UPDATE");
END;
CREATE TRIGGER jb_after_delete
AFTER DELETE ON jb_local
FOR EACH ROW
BEGIN
    INSERT INTO jb_local_history(service_no, date, pic, name, contact, status, email, address, purchase_date, invoice, received_items, pin, issues, solutions, status_desc, remarks, cost, locker, received_by, idt_pc, change_type)
    VALUES (OLD.service_no, OLD.date, OLD.pic, OLD.name, OLD.contact, OLD.status, OLD.email, OLD.address, OLD.purchase_date, OLD.invoice, OLD.received_items, OLD.pin, OLD.issues, OLD.solutions, OLD.status_desc, OLD.remarks, OLD.cost, OLD.locker, OLD.received_by, OLD.idt_pc, "DELETE");
END;

--@block

CREATE TABLE `warranty_staff_branch`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255),
    `branch` VARCHAR(255),
    `color` VARCHAR(255),
    PRIMARY KEY(`id`)
);