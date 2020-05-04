INSERT INTO Accounts (username,password) VALUES ('Ivan C','password');
INSERT INTO Accounts (username,password) VALUES ('YX S','password');
INSERT INTO Accounts (username,password) VALUES ('BS R','password');

INSERT INTO Restaurants (rest_id,rname,address,area,minAmt) VALUES (1,'A-North Chicken Rice Shop','Blk 637, Yishun St 61','NORTH', 20);
INSERT INTO Restaurants (rest_id,rname,address,area,minAmt) VALUES (2,'B-East Nasi Lemak Store','23 Changi West Village','EAST', 20);
INSERT INTO Restaurants (rest_id,rname,address,area,minAmt) VALUES (3,'C-South XLB store','Marina Bay Sands 23 Westford Rd','SOUTH', 20);
INSERT INTO Restaurants (rest_id,rname,address,area,minAmt) VALUES (4,'D-West Western Food Store','64 Jurong Rd','WEST', 20);

INSERT INTO Staff (staff_id,sname,rest_id,username) VALUES (10, 'Yuan Xin', 1, 'YX S');
INSERT INTO Customers (cid , cname, credit_card_number, join_date, username) VALUES (20,'Ivan','2080 7117 4551 2585','2018-02-14','Ivan C');
INSERT INTO Riders (rider_id,rname,rider_type,base_salary,username) VALUES (30,'Bing sen','FT', 2000,'BS R');

INSERT INTO Shifts (shift_id,time_start1,time_end1,time_start2,time_end2) VALUES (1,'10:00:00','14:00:00','15:00:00','19:00:00');
INSERT INTO Shifts (shift_id,time_start1,time_end1,time_start2,time_end2) VALUES (2,'11:00:00','15:00:00','16:00:00','20:00:00');
INSERT INTO Shifts (shift_id,time_start1,time_end1,time_start2,time_end2) VALUES (3,'12:00:00','16:00:00','17:00:00','21:00:00');
INSERT INTO Shifts (shift_id,time_start1,time_end1,time_start2,time_end2) VALUES (4,'13:00:00','17:00:00','18:00:00','22:00:00');

INSERT INTO Food (fid,rest_id,fname,price,daily_limit,category) VALUES (101,1,'Roasted Chicken Rice',5,90,'Local');
INSERT INTO Food (fid,rest_id,fname,price,daily_limit,category) VALUES (102,1,'Steamed Chicken Rice',6,85,'Local');
INSERT INTO Food (fid,rest_id,fname,price,daily_limit,category) VALUES (103,2,'Classic Nasi Lemak',7,59,'Local');
INSERT INTO Food (fid,rest_id,fname,price,daily_limit,category) VALUES (104,2,'Special Nasi Lemak with Truffle Sauce',10,80,'Local');
INSERT INTO Food (fid,rest_id,fname,price,daily_limit,category) VALUES (105,3,'Pork Xiao Long Bao (x5)',5,58,'Chinese');
INSERT INTO Food (fid,rest_id,fname,price,daily_limit,category) VALUES (106,3,'Pot stickers (x5)',5.5,88,'Chinese');
INSERT INTO Food (fid,rest_id,fname,price,daily_limit,category) VALUES (107,4,'Chicken Chop',4,55,'Western');
INSERT INTO Food (fid,rest_id,fname,price,daily_limit,category) VALUES (108,4,'Pork Chop',5,53,'Western');


INSERT INTO Promotions(pid) VALUES (1);
INSERT INTO Promotions(pid) VALUES (2);
INSERT INTO FDS_Promotions(pid, promo_rate, promo_type, promo_cat, start_datetime, end_datetime, promo_min_cost, promo_max_discount_limit, promo_max_num_redemption, promo_details_text) VALUES (1, 1, 'PERCENT', 'DELIVERY', '01/01/2020 12:00:00', '30/12/2020 23:59:59', 10, null, null, 'Free delivery for all of 2020!');
INSERT INTO Restaurant_Promotions(pid, promo_rate, promo_type, promo_cat, start_datetime, end_datetime, promo_min_cost, promo_max_discount_limit, promo_max_num_redemption, promo_details_text, rest_id) VALUES (2, 10, 'DOLLAR', 'CART', '01/05/2020 12:00:00', '30/05/2020 12:00:00', 15, 15, 100, '10$ off with minimum order of 15$ at Western Food Store!', 4);

INSERT INTO Orders (oid,order_placed,rider_depart_for_rest,rider_arrive_rest,rider_depart_for_delivery_location,order_delivered,payment_method,cart_fee, delivery_fee, discount_amount, delivery_location,rider_id,rider_rating, cid, pid) VALUES (1,'18/07/2018 19:39:07','18/07/2018 19:40:07','18/07/2018 19:46:07','18/07/2018 19:58:07','18/07/2018 20:04:07','CREDITCARD', 21,5,5,'Ivan House 1',30,5,20,1);
INSERT INTO Orders (oid,order_placed,rider_depart_for_rest,rider_arrive_rest,rider_depart_for_delivery_location,order_delivered,payment_method,cart_fee, delivery_fee, discount_amount,delivery_location,rider_id,rider_rating, cid, pid) VALUES (2,'24/07/2018 11:33:51','24/07/2018 11:35:51','24/07/2018 11:41:51','24/07/2018 11:50:51',null,'CASHONDELIVERY',22,2,0,'Ivan House 2',30,4,20,null);

INSERT INTO ShoppingCarts(oid, fid, quantity) VALUES (1, 101, 3);
INSERT INTO ShoppingCarts(oid, fid, quantity) VALUES (1, 102, 1);
INSERT INTO ShoppingCarts(oid, fid, quantity) VALUES (2, 107, 3);
INSERT INTO ShoppingCarts(oid, fid, quantity) VALUES (2, 108, 2);


/*
    1 FDS promotion
2 Food promotion
 */








