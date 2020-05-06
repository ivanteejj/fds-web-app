INSERT INTO Year (year) VALUES ('2020');
INSERT INTO Year (year) VALUES ('2019');
INSERT INTO Year (year) VALUES ('2018');
INSERT INTO Year (year) VALUES ('2017');
INSERT INTO Year (year) VALUES ('2016');

INSERT INTO Month (month) VALUES('1');
INSERT INTO Month (month) VALUES('2');
INSERT INTO Month (month) VALUES('3');
INSERT INTO Month (month) VALUES('4');
INSERT INTO Month (month) VALUES('5');
INSERT INTO Month (month) VALUES('6');
INSERT INTO Month (month) VALUES('7');
INSERT INTO Month (month) VALUES('8');
INSERT INTO Month (month) VALUES('9');
INSERT INTO Month (month) VALUES('10');
INSERT INTO Month (month) VALUES('11');
INSERT INTO Month (month) VALUES('12');

INSERT INTO DaysInWeek (day) VALUES('0');
INSERT INTO DaysInWeek (day) VALUES('1');
INSERT INTO DaysInWeek (day) VALUES('2');
INSERT INTO DaysInWeek (day) VALUES('3');
INSERT INTO DaysInWeek (day) VALUES('4');
INSERT INTO DaysInWeek (day) VALUES('5');
INSERT INTO DaysInWeek (day) VALUES('6');

INSERT INTO Hour (hour) VALUES('0');
INSERT INTO Hour (hour) VALUES('1');
INSERT INTO Hour (hour) VALUES('2');
INSERT INTO Hour (hour) VALUES('3');
INSERT INTO Hour (hour) VALUES('4');
INSERT INTO Hour (hour) VALUES('5');
INSERT INTO Hour (hour) VALUES('6');
INSERT INTO Hour (hour) VALUES('7');
INSERT INTO Hour (hour) VALUES('8');
INSERT INTO Hour (hour) VALUES('9');
INSERT INTO Hour (hour) VALUES('10');
INSERT INTO Hour (hour) VALUES('11');
INSERT INTO Hour (hour) VALUES('12');
INSERT INTO Hour (hour) VALUES('13');
INSERT INTO Hour (hour) VALUES('14');
INSERT INTO Hour (hour) VALUES('15');
INSERT INTO Hour (hour) VALUES('16');
INSERT INTO Hour (hour) VALUES('17');
INSERT INTO Hour (hour) VALUES('18');
INSERT INTO Hour (hour) VALUES('19');
INSERT INTO Hour (hour) VALUES('20');
INSERT INTO Hour (hour) VALUES('21');
INSERT INTO Hour (hour) VALUES('22');
INSERT INTO Hour (hour) VALUES('23');

INSERT INTO Areas (area) VALUES('NORTH');
INSERT INTO Areas (area) VALUES('SOUTH');
INSERT INTO Areas (area) VALUES('EAST');
INSERT INTO Areas (area) VALUES('WEST');
INSERT INTO Areas (area) VALUES('CENTRAL');

INSERT INTO Accounts (username,password) VALUES ('Ivan C','password');
INSERT INTO Accounts (username,password) VALUES ('Jackson C','password');
INSERT INTO Accounts (username,password) VALUES ('Bob C','password');
INSERT INTO Accounts (username,password) VALUES ('YX S','password');
INSERT INTO Accounts (username,password) VALUES ('A R','password');
INSERT INTO Accounts (username,password) VALUES ('B R','password');
INSERT INTO Accounts (username,password) VALUES ('C R','password');
INSERT INTO Accounts (username,password) VALUES ('D R','password');
INSERT INTO Accounts (username,password) VALUES ('E R','password');

INSERT INTO Restaurants (rid,rname,address,area,minAmt) VALUES (1,'A-North Chicken Rice Shop','Blk 637, Yishun St 61','NORTH', 20);
INSERT INTO Restaurants (rid,rname,address,area,minAmt) VALUES (2,'B-East Nasi Lemak Store','23 Changi West Village','EAST', 20);
INSERT INTO Restaurants (rid,rname,address,area,minAmt) VALUES (3,'C-South XLB store','Marina Bay Sands 23 Westford Rd','SOUTH', 20);
INSERT INTO Restaurants (rid,rname,address,area,minAmt) VALUES (4,'D-West Western Food Store','64 Jurong Rd','WEST', 20);

INSERT INTO Staff (staff_id,sname,rid,username) VALUES (10, 'Yuan Xin', 1, 'YX S');
INSERT INTO Customers (cid , cname, credit_card_number, join_date, username) VALUES (20,'Ivan','2080 7117 4551 2585','14/03/2020','Ivan C');
INSERT INTO Customers (cid , cname, credit_card_number, join_date, username) VALUES (21,'Jackson','2081 7117 4551 2585','17/03/2020','Jackson C');
INSERT INTO Customers (cid , cname, credit_card_number, join_date, username) VALUES (22,'Bob','2082 7117 4551 2585','22/04/2020','Bob C');
INSERT INTO Riders (rider_id,rname,rider_type,base_salary,username) VALUES (30,'Anderson','FT', 2000,'A R');
INSERT INTO Riders (rider_id,rname,rider_type,base_salary,username) VALUES (31,'Benjamin','FT', 3000,'B R');
INSERT INTO Riders (rider_id,rname,rider_type,base_salary,username) VALUES (32,'Calvin','FT', 4000,'C R');
INSERT INTO Riders (rider_id,rname,rider_type,base_salary,username) VALUES (33,'Donald','PT', 1200,'D R');
INSERT INTO Riders (rider_id,rname,rider_type,base_salary,username) VALUES (34,'Emerald','PT', 1000,'E R');

INSERT INTO Shifts (shift_id,time_start1,time_end1,time_start2,time_end2) VALUES (1,'10:00:00','14:00:00','15:00:00','19:00:00');
INSERT INTO Shifts (shift_id,time_start1,time_end1,time_start2,time_end2) VALUES (2,'11:00:00','15:00:00','16:00:00','20:00:00');
INSERT INTO Shifts (shift_id,time_start1,time_end1,time_start2,time_end2) VALUES (3,'12:00:00','16:00:00','17:00:00','21:00:00');
INSERT INTO Shifts (shift_id,time_start1,time_end1,time_start2,time_end2) VALUES (4,'13:00:00','17:00:00','18:00:00','22:00:00');

INSERT INTO Schedules(sid, rider_id) VALUES (1, 30);
BEGIN;
    INSERT INTO Monthly_Work_Schedule(sid, week, sche_date, shift_id) VALUES (1, 1, '1/4/2020', 1);
    INSERT INTO Monthly_Work_Schedule(sid, week, sche_date, shift_id) VALUES (1, 1, '2/4/2020', 2);
    INSERT INTO Monthly_Work_Schedule(sid, week, sche_date, shift_id) VALUES (1, 1, '3/4/2020', 3);
    INSERT INTO Monthly_Work_Schedule(sid, week, sche_date, shift_id) VALUES (1, 1, '4/4/2020', 4);
    INSERT INTO Monthly_Work_Schedule(sid, week, sche_date, shift_id) VALUES (1, 1, '5/4/2020', 4);
    INSERT INTO Monthly_Work_Schedule(sid, week, sche_date, shift_id) VALUES (1, 2, '8/4/2020', 1);
    INSERT INTO Monthly_Work_Schedule(sid, week, sche_date, shift_id) VALUES (1, 2, '9/4/2020', 2);
    INSERT INTO Monthly_Work_Schedule(sid, week, sche_date, shift_id) VALUES (1, 2, '10/4/2020', 3);
    INSERT INTO Monthly_Work_Schedule(sid, week, sche_date, shift_id) VALUES (1, 2, '11/4/2020', 4);
    INSERT INTO Monthly_Work_Schedule(sid, week, sche_date, shift_id) VALUES (1, 2, '12/4/2020', 4);
    INSERT INTO Monthly_Work_Schedule(sid, week, sche_date, shift_id) VALUES (1, 3, '15/4/2020', 1);
    INSERT INTO Monthly_Work_Schedule(sid, week, sche_date, shift_id) VALUES (1, 3, '16/4/2020', 2);
    INSERT INTO Monthly_Work_Schedule(sid, week, sche_date, shift_id) VALUES (1, 3, '17/4/2020', 3);
    INSERT INTO Monthly_Work_Schedule(sid, week, sche_date, shift_id) VALUES (1, 3, '18/4/2020', 4);
    INSERT INTO Monthly_Work_Schedule(sid, week, sche_date, shift_id) VALUES (1, 3, '19/4/2020', 4);
    INSERT INTO Monthly_Work_Schedule(sid, week, sche_date, shift_id) VALUES (1, 4, '22/4/2020', 1);
    INSERT INTO Monthly_Work_Schedule(sid, week, sche_date, shift_id) VALUES (1, 4, '23/4/2020', 2);
    INSERT INTO Monthly_Work_Schedule(sid, week, sche_date, shift_id) VALUES (1, 4, '24/4/2020', 3);
    INSERT INTO Monthly_Work_Schedule(sid, week, sche_date, shift_id) VALUES (1, 4, '25/4/2020', 4);
    INSERT INTO Monthly_Work_Schedule(sid, week, sche_date, shift_id) VALUES (1, 4, '26/4/2020', 4);
COMMIT;

INSERT INTO Schedules(sid, rider_id) VALUES (2, 31);
BEGIN;
INSERT INTO Monthly_Work_Schedule(sid, week, sche_date, shift_id) VALUES (2, 1, '1/4/2020', 1);
INSERT INTO Monthly_Work_Schedule(sid, week, sche_date, shift_id) VALUES (2, 1, '2/4/2020', 2);
INSERT INTO Monthly_Work_Schedule(sid, week, sche_date, shift_id) VALUES (2, 1, '3/4/2020', 3);
INSERT INTO Monthly_Work_Schedule(sid, week, sche_date, shift_id) VALUES (2, 1, '4/4/2020', 4);
INSERT INTO Monthly_Work_Schedule(sid, week, sche_date, shift_id) VALUES (2, 1, '5/4/2020', 4);
INSERT INTO Monthly_Work_Schedule(sid, week, sche_date, shift_id) VALUES (2, 2, '8/4/2020', 1);
INSERT INTO Monthly_Work_Schedule(sid, week, sche_date, shift_id) VALUES (2, 2, '9/4/2020', 2);
INSERT INTO Monthly_Work_Schedule(sid, week, sche_date, shift_id) VALUES (2, 2, '10/4/2020', 3);
INSERT INTO Monthly_Work_Schedule(sid, week, sche_date, shift_id) VALUES (2, 2, '11/4/2020', 4);
INSERT INTO Monthly_Work_Schedule(sid, week, sche_date, shift_id) VALUES (2, 2, '12/4/2020', 4);
INSERT INTO Monthly_Work_Schedule(sid, week, sche_date, shift_id) VALUES (2, 3, '15/4/2020', 1);
INSERT INTO Monthly_Work_Schedule(sid, week, sche_date, shift_id) VALUES (2, 3, '16/4/2020', 2);
INSERT INTO Monthly_Work_Schedule(sid, week, sche_date, shift_id) VALUES (2, 3, '17/4/2020', 3);
INSERT INTO Monthly_Work_Schedule(sid, week, sche_date, shift_id) VALUES (2, 3, '18/4/2020', 4);
INSERT INTO Monthly_Work_Schedule(sid, week, sche_date, shift_id) VALUES (2, 3, '19/4/2020', 4);
INSERT INTO Monthly_Work_Schedule(sid, week, sche_date, shift_id) VALUES (2, 4, '22/4/2020', 1);
INSERT INTO Monthly_Work_Schedule(sid, week, sche_date, shift_id) VALUES (2, 4, '23/4/2020', 2);
INSERT INTO Monthly_Work_Schedule(sid, week, sche_date, shift_id) VALUES (2, 4, '24/4/2020', 3);
INSERT INTO Monthly_Work_Schedule(sid, week, sche_date, shift_id) VALUES (2, 4, '25/4/2020', 4);
INSERT INTO Monthly_Work_Schedule(sid, week, sche_date, shift_id) VALUES (2, 4, '26/4/2020', 4);
COMMIT;


INSERT INTO Food (fid,rid,fname,price,daily_limit,category) VALUES (101,1,'Roasted Chicken Rice',5,90,'Local');
INSERT INTO Food (fid,rid,fname,price,daily_limit,category) VALUES (102,1,'Steamed Chicken Rice',6,85,'Local');
INSERT INTO Food (fid,rid,fname,price,daily_limit,category) VALUES (103,2,'Classic Nasi Lemak',7,59,'Local');
INSERT INTO Food (fid,rid,fname,price,daily_limit,category) VALUES (104,2,'Special Nasi Lemak with Truffle Sauce',10,80,'Local');
INSERT INTO Food (fid,rid,fname,price,daily_limit,category) VALUES (105,3,'Pork Xiao Long Bao (x5)',5,58,'Chinese');
INSERT INTO Food (fid,rid,fname,price,daily_limit,category) VALUES (106,3,'Pot stickers (x5)',5.5,88,'Chinese');
INSERT INTO Food (fid,rid,fname,price,daily_limit,category) VALUES (107,4,'Chicken Chop',4,55,'Western');
INSERT INTO Food (fid,rid,fname,price,daily_limit,category) VALUES (108,4,'Pork Chop',5,53,'Western');


INSERT INTO Promotions(pid, promo_rate, promo_type, promo_cat, start_datetime, end_datetime, promo_min_cost, promo_max_discount_limit, promo_max_num_redemption, promo_details_text, rid)
VALUES (1, 1, 'PERCENT', 'DELIVERY', '01/01/2020 12:00:00', '30/12/2020 23:59:59', 10, null, null, 'Free delivery for all of 2020!', null);
INSERT INTO Promotions(pid, promo_rate, promo_type, promo_cat, start_datetime, end_datetime, promo_min_cost, promo_max_discount_limit, promo_max_num_redemption, promo_details_text, rid)
VALUES (2, 10, 'DOLLAR', 'CART', '01/03/2020 12:00:00', '30/03/2020 12:00:00', 15, 15, 100, '10$ off with minimum order of 15$ at Western Food Store during March!', 4);
INSERT INTO Promotions(pid, promo_rate, promo_type, promo_cat, start_datetime, end_datetime, promo_min_cost, promo_max_discount_limit, promo_max_num_redemption, promo_details_text, rid)
VALUES (3, 5, 'DOLLAR', 'CART', '01/04/2020 12:00:00', '30/06/2020 12:00:00', 10, 5, 100, '5$ off with minimum order of 10$ at South XLB store during April! First 50 customers only!', 3);

INSERT INTO Orders (oid,order_placed,rider_depart_for_rest,rider_arrive_rest,rider_depart_for_delivery_location,order_delivered,payment_method,cart_fee, delivery_fee, rider_bonus, discount_amount, delivery_location,delivery_location_area,rider_id,rider_rating, cid, pid) VALUES (1,'18/03/2020 19:39:07','18/03/2020 19:40:07','18/03/2020 19:46:07','18/03/2020 19:58:07','18/03/2020 20:04:07','CREDITCARD', 21,5,5,1,'Ivan House 1','NORTH',30,5,20,1);
INSERT INTO Orders (oid,order_placed,rider_depart_for_rest,rider_arrive_rest,rider_depart_for_delivery_location,order_delivered,payment_method,cart_fee, delivery_fee,rider_bonus, discount_amount, delivery_location,delivery_location_area,rider_id,rider_rating, cid, pid) VALUES (2,'24/04/2020 11:33:51','24/04/2020 11:35:51','24/04/2020 11:41:51','24/04/2020 11:50:51','24/04/2020 11:55:51','CASHONDELIVERY',22,7,10,1,'Ivan House 2','SOUTH',30,4,20,2);
INSERT INTO Orders (oid,order_placed,rider_depart_for_rest,rider_arrive_rest,rider_depart_for_delivery_location,order_delivered,payment_method,cart_fee, delivery_fee,rider_bonus, discount_amount, delivery_location,delivery_location_area,rider_id,rider_rating, cid, pid) VALUES (3,'23/03/2020 12:39:07','23/03/2020 12:40:07', '23/03/2020 13:20:07', '23/03/2020 13:30:07', '23/03/2020 14:00:07','CREDITCARD', 20,50,5,5,'Jackson House 1','EAST',30,5,21,2);
INSERT INTO Orders (oid,order_placed,rider_depart_for_rest,rider_arrive_rest,rider_depart_for_delivery_location,order_delivered,payment_method,cart_fee, delivery_fee, rider_bonus,discount_amount, delivery_location,delivery_location_area,rider_id,rider_rating, cid, pid) VALUES (4,'11/04/2020 16:39:07','11/04/2020 17:10:07', '11/04/2020 17:15:07', null, null,'CASHONDELIVERY', 24,5,5,1,'Jackson House 1','EAST',30,5,21,2);
INSERT INTO Orders (oid,order_placed,rider_depart_for_rest,rider_arrive_rest,rider_depart_for_delivery_location,order_delivered,payment_method,cart_fee, delivery_fee, rider_bonus,discount_amount, delivery_location,delivery_location_area,rider_id,rider_rating, cid, pid) VALUES (5,'19/04/2020 20:39:07','19/04/2020 21:03:07', '19/04/2020 21:24:07', '19/04/2020 21:29:07', '19/04/2020 21:35:07','CASHONDELIVERY', 9,5,0,1,'Bob House 1','WEST',30,4,22,null);
INSERT INTO Orders (oid,order_placed,rider_depart_for_rest,rider_arrive_rest,rider_depart_for_delivery_location,order_delivered,payment_method,cart_fee, delivery_fee, rider_bonus,discount_amount, delivery_location,delivery_location_area,rider_id,rider_rating, cid, pid) VALUES (6,'01/05/2020 10:03:07','01/05/2020 10:15:07', '01/05/2020 10:25:07', '01/05/2020 10:31:037', '01/05/2020 11:01:02','CREDITCARD', 22,7,7,1,'Ivan House 1','NORTH',30,5,20,1);
INSERT INTO Orders (oid,order_placed,rider_depart_for_rest,rider_arrive_rest,rider_depart_for_delivery_location,order_delivered,payment_method,cart_fee, delivery_fee,rider_bonus, discount_amount, delivery_location,delivery_location_area,rider_id,rider_rating, cid, pid) VALUES (7,'24/04/2020 11:33:51','24/04/2020 11:35:51','24/04/2020 11:41:51','24/04/2020 11:50:51','24/04/2020 11:58:51','CASHONDELIVERY',22,7,10,1,'Ivan House 2','SOUTH',30,4,20,3);
INSERT INTO Orders (oid,order_placed,rider_depart_for_rest,rider_arrive_rest,rider_depart_for_delivery_location,order_delivered,payment_method,cart_fee, delivery_fee, rider_bonus,discount_amount, delivery_location,delivery_location_area,rider_id,rider_rating, cid, pid) VALUES (8,'19/04/2020 20:39:07','19/04/2020 21:03:07', '19/04/2020 21:24:07', '19/04/2020 21:29:07', '19/04/2020 21:35:07','CASHONDELIVERY', 9,5,0,1,'Bob House 1','WEST',30,4,22, 3);

INSERT INTO Orders (oid,order_placed,rider_depart_for_rest,rider_arrive_rest,rider_depart_for_delivery_location,order_delivered,payment_method,cart_fee, delivery_fee, rider_bonus,discount_amount, delivery_location,delivery_location_area,rider_id,rider_rating, cid, pid) VALUES (9,'11/04/2020 16:39:07','11/04/2020 17:10:07', '11/04/2020 17:15:07', '11/04/2020 17:20:07', '11/04/2020 17:25:07','CASHONDELIVERY', 24,5,5,1,'Jackson House 1','EAST',31,5,21,2);
INSERT INTO Orders (oid,order_placed,rider_depart_for_rest,rider_arrive_rest,rider_depart_for_delivery_location,order_delivered,payment_method,cart_fee, delivery_fee, rider_bonus,discount_amount, delivery_location,delivery_location_area,rider_id,rider_rating, cid, pid) VALUES (10,'12/04/2020 16:39:07','12/04/2020 17:10:07', '12/04/2020 17:15:07', '12/04/2020 17:20:07', '12/04/2020 17:25:07','CASHONDELIVERY', 9,5,0,1,'Bob House 1','WEST',31,4,22,null);
INSERT INTO Orders (oid,order_placed,rider_depart_for_rest,rider_arrive_rest,rider_depart_for_delivery_location,order_delivered,payment_method,cart_fee, delivery_fee, rider_bonus,discount_amount, delivery_location,delivery_location_area,rider_id,rider_rating, cid, pid) VALUES (11,'13/04/2020 13:39:07','13/04/2020 13:10:07', '13/04/2020 13:15:07', '13/04/2020 13:20:07', '13/04/2020 13:25:07','CREDITCARD', 22,7,7,1,'Ivan House 1','NORTH',31,5,20,1);
INSERT INTO Orders (oid,order_placed,rider_depart_for_rest,rider_arrive_rest,rider_depart_for_delivery_location,order_delivered,payment_method,cart_fee, delivery_fee,rider_bonus, discount_amount, delivery_location,delivery_location_area,rider_id,rider_rating, cid, pid) VALUES (12,'24/04/2020 11:33:51','24/04/2020 11:35:51','24/04/2020 11:41:51','24/04/2020 11:50:51','24/04/2020 11:58:51','CASHONDELIVERY',22,7,10,1,'Ivan House 2','SOUTH',32,4,20,3);
INSERT INTO Orders (oid,order_placed,rider_depart_for_rest,rider_arrive_rest,rider_depart_for_delivery_location,order_delivered,payment_method,cart_fee, delivery_fee, rider_bonus,discount_amount, delivery_location,delivery_location_area,rider_id,rider_rating, cid, pid) VALUES (13,'19/04/2020 20:39:07','19/04/2020 21:03:07', '19/04/2020 21:24:07', '19/04/2020 21:29:07', '19/04/2020 21:35:07','CASHONDELIVERY', 9,5,0,1,'Bob House 1','WEST',32,4,22, 3);
INSERT INTO Orders (oid,order_placed,rider_depart_for_rest,rider_arrive_rest,rider_depart_for_delivery_location,order_delivered,payment_method,cart_fee, delivery_fee, rider_bonus,discount_amount, delivery_location,delivery_location_area,rider_id,rider_rating, cid, pid) VALUES (14,'11/04/2020 16:39:07','11/04/2020 17:10:07', '11/04/2020 17:15:07', null, null,'CASHONDELIVERY', 24,5,5,1,'Jackson House 1','EAST',32,5,21,2);
INSERT INTO Orders (oid,order_placed,rider_depart_for_rest,rider_arrive_rest,rider_depart_for_delivery_location,order_delivered,payment_method,cart_fee, delivery_fee, rider_bonus,discount_amount, delivery_location,delivery_location_area,rider_id,rider_rating, cid, pid) VALUES (15,'19/04/2020 20:39:07','19/04/2020 21:03:07', '19/04/2020 21:24:07', '19/04/2020 21:29:07', '19/04/2020 21:35:07','CASHONDELIVERY', 9,5,0,1,'Bob House 1','WEST',33,4,22,null);
INSERT INTO Orders (oid,order_placed,rider_depart_for_rest,rider_arrive_rest,rider_depart_for_delivery_location,order_delivered,payment_method,cart_fee, delivery_fee, rider_bonus,discount_amount, delivery_location,delivery_location_area,rider_id,rider_rating, cid, pid) VALUES (16,'01/05/2020 10:03:07','01/05/2020 10:15:07', '01/05/2020 10:25:07', '01/05/2020 10:31:037', '01/05/2020 11:01:02','CREDITCARD', 22,7,7,1,'Ivan House 1','NORTH',31,5,20,1);
INSERT INTO Orders (oid,order_placed,rider_depart_for_rest,rider_arrive_rest,rider_depart_for_delivery_location,order_delivered,payment_method,cart_fee, delivery_fee,rider_bonus, discount_amount, delivery_location,delivery_location_area,rider_id,rider_rating, cid, pid) VALUES (17,'24/04/2020 11:33:51','24/04/2020 11:35:51','24/04/2020 11:41:51','24/04/2020 11:50:51','24/04/2020 11:58:51','CASHONDELIVERY',22,7,10,1,'Ivan House 2','SOUTH',33,4,20,3);
INSERT INTO Orders (oid,order_placed,rider_depart_for_rest,rider_arrive_rest,rider_depart_for_delivery_location,order_delivered,payment_method,cart_fee, delivery_fee, rider_bonus,discount_amount, delivery_location,delivery_location_area,rider_id,rider_rating, cid, pid) VALUES (18,'19/04/2020 20:39:07','19/04/2020 21:03:07', '19/04/2020 21:24:07', '19/04/2020 21:29:07', '19/04/2020 21:35:07','CASHONDELIVERY', 9,5,0,1,'Bob House 1','WEST',34,4,22, 3);


INSERT INTO ShoppingCarts(oid, fid, quantity, fname, food_price_purchased) VALUES (1, 101, 3, 'Roasted Chicken Rice', 5);
INSERT INTO ShoppingCarts(oid, fid, quantity, fname, food_price_purchased) VALUES (1, 102, 1, 'Steamed Chicken Rice', 6);
INSERT INTO ShoppingCarts(oid, fid, quantity, fname, food_price_purchased) VALUES (2, 107, 3, 'Chicken Chop',4);
INSERT INTO ShoppingCarts(oid, fid, quantity, fname, food_price_purchased) VALUES (2, 108, 2, 'Pork Chop',5);
INSERT INTO ShoppingCarts(oid, fid, quantity, fname, food_price_purchased) VALUES (3, 105, 3, 'Pork Xiao Long Bao (x5)',5);
INSERT INTO ShoppingCarts(oid, fid, quantity, fname, food_price_purchased) VALUES (3, 106, 1, 'Pot stickers (x5)', 5.5);
INSERT INTO ShoppingCarts(oid, fid, quantity, fname, food_price_purchased) VALUES (4, 103, 2, 'Classic Nasi Lemak', 7);
INSERT INTO ShoppingCarts(oid, fid, quantity, fname, food_price_purchased) VALUES (5, 107, 1, 'Chicken Chop',4);
INSERT INTO ShoppingCarts(oid, fid, quantity, fname, food_price_purchased) VALUES (5, 108, 1, 'Pork Chop',5);
INSERT INTO ShoppingCarts(oid, fid, quantity, fname, food_price_purchased) VALUES (6, 101, 2, 'Roasted Chicken Rice', 5);
INSERT INTO ShoppingCarts(oid, fid, quantity, fname, food_price_purchased) VALUES (6, 102, 2, 'Steamed Chicken Rice', 6);
INSERT INTO ShoppingCarts(oid, fid, quantity, fname, food_price_purchased) VALUES (7, 105, 3, 'Pork Xiao Long Bao (x5)',5);
INSERT INTO ShoppingCarts(oid, fid, quantity, fname, food_price_purchased) VALUES (7, 106, 1, 'Pot stickers (x5)', 5.5);
INSERT INTO ShoppingCarts(oid, fid, quantity, fname, food_price_purchased) VALUES (8, 106, 6, 'Pot stickers (x5)', 5.5);

SELECT pg_catalog.setval(pg_get_serial_sequence('Promotions', 'pid'), MAX(pid)) FROM Promotions;
SELECT pg_catalog.setval(pg_get_serial_sequence('Orders', 'oid'), MAX(oid)) FROM Orders;
SELECT pg_catalog.setval(pg_get_serial_sequence('Food', 'fid'), MAX(fid)) FROM Food;
SELECT pg_catalog.setval(pg_get_serial_sequence('Restaurants', 'rid'), MAX(rid)) FROM Restaurants;
SELECT pg_catalog.setval(pg_get_serial_sequence('Customers', 'cid'), MAX(cid)) FROM Customers;
SELECT pg_catalog.setval(pg_get_serial_sequence('Staff', 'staff_id'), MAX(staff_id)) FROM Staff;
SELECT pg_catalog.setval(pg_get_serial_sequence('Riders', 'rider_id'), MAX(rider_id)) FROM Riders;
SELECT pg_catalog.setval(pg_get_serial_sequence('Schedules', 'sid'), MAX(sid)) FROM Schedules;
