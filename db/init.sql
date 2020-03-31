--triggers
--1. to have a trigger such that when a new customer make the first order, the 10% discount is automatically applied
--2. to check num of riders for any hourly interval
--3. to check the total cost of order is above min_amt of a restaurant after update on order_status from incomplete to placed
--4. to check whether food_items which belongs to the same order come from the same restaurant(front end)
--5. might need to refresh the sold_qty of Food



DROP TABLE IF EXISTS 	Accounts, Restaurants, Menus, Food, Staff, Customers, 
						Orders, Makes, ShoppingCarts, Promotions, 
						FDS_Promotions, Restaurant_Promotions, 
						FDS_Promo_Applies, Delivery_Reviews, 
						Food_Reviews, Riders, Rider_Works, 
						Schedules, Shifts, Monthly_Work_Schedule,
						Weekly_Work_Schedule CASCADE;
						
DROP TYPE IF EXISTS CAT_ENUM, AREA_ENUM CASCADE;


CREATE TYPE AREA_ENUM AS ENUM (
	'NORTH',
	'SOUTH',
	'WEST',
	'EAST',
	'CENTRAL'
);

CREATE TYPE CAT_ENUM AS ENUM (
    'Local', 
	'Asian', 
	'Japanese', 
	'Western', 
	'Italian', 
	'Vegetarian', 
    'Fast Food', 
	'Breakfast', 
	'Desserts', 
	'Beverage'
);

CREATE TABLE Accounts (
	username				TEXT,
	password			TEXT NOT NULL,
	access_rights		TEXT,
	PRIMARY KEY (username)
);

CREATE TABLE Restaurants (
    rest_id 			INTEGER,
    rname           	TEXT NOT NULL,
    address         	TEXT NOT NULL,
	area				AREA_ENUM NOT NULL,
    minAmt         		NUMERIC NOT NULL
						CHECK (minAmt >= 0),
    PRIMARY KEY (rest_id)
);

CREATE TABLE Food (
    fid             		INTEGER,
	rest_id					INTEGER NOT NULL,
    fname           		TEXT NOT NULL,
    price           		NUMERIC NOT NULL
							CHECK (price > 0),
    daily_limit     		INTEGER
							CHECK (daily_limit >= 0),
	daily_sold_qty			INTEGER NOT NULL DEFAULT (0)
							CHECK (daily_sold_qty >= 0),
	daily_availability		TEXT NOT NULL DEFAULT('AVAILABLE')
							CHECK (daily_availability in ('AVAILABLE', 'NOT AVAILABLE')),
    category        		CAT_ENUM NOT NULL,
    PRIMARY KEY (fid),
	FOREIGN KEY (rest_id) REFERENCES Restaurants (rest_id) on delete cascade
);

CREATE TABLE Staff (
	staff_id            INTEGER,
	sname           	TEXT NOT NULL,
    rest_id             INTEGER NOT NULL,
	username				TEXT,
    PRIMARY KEY (staff_id),
    FOREIGN KEY (rest_id) REFERENCES Restaurants (rest_id),
	FOREIGN KEY (username) REFERENCES Accounts (username)
);

CREATE TABLE Customers(
	cid						INTEGER,
	cname 					TEXT NOT NULL,
	points					INTEGER NOT NULL DEFAULT(0)
							CHECK(points >= 0),
	credit_card_number		VARCHAR(19) UNIQUE,
	join_date				DATE,
	username					TEXT,
	PRIMARY KEY (cid),
	FOREIGN KEY (username) REFERENCES Accounts (username)
);

CREATE TABLE Riders(
    rider_id            INTEGER,
	rname				TEXT NOT NULL,
    incentive           NUMERIC DEFAULT 0,
    rider_type          VARCHAR(2) NOT NULL
                        CHECK (rider_type in ('FT','PT')),
    base_salary         NUMERIC NOT NULL
                        CHECK (base_salary > 0),
	username				TEXT,
    PRIMARY KEY (rider_id),
	FOREIGN KEY (username) REFERENCES Accounts (username)
);

CREATE TABLE Orders(
	oid										INTEGER,
	order_placed							timestamp NOT NULL,
	rider_depart_for_rest					timestamp,
	rider_arrive_rest						timestamp,
	rider_depart_for_delivery_location		timestamp,
	order_delivered							timestamp,
	payment_method							TEXT NOT NULL
											CHECK (payment_method IN ('CREDITCARD','CASHONDELIVERY')),
	delivery_fee							numeric NOT NULL
											CHECK (delivery_fee >= 0),
	total_cost								numeric NOT NULL
											CHECK (total_cost >= 0),
	delivery_location						TEXT NOT NULL,
	rider_id								INTEGER NOT NULL,
	rider_rating							INTEGER NOT NULL DEFAULT(5)
											CHECK (rider_rating >= 1 AND rider_rating <= 5),
	cid										INTEGER NOT NULL,
	PRIMARY KEY (oid),
	FOREIGN KEY (rider_id) references Riders (rider_id),
	FOREIGN KEY (cid) references Customers (cid),
	CHECK(
		(EXTRACT(HOUR FROM order_placed) >= 10 AND EXTRACT(HOUR FROM order_placed) <= 22)
		AND
		(EXTRACT(HOUR FROM rider_depart_for_rest) >= 10 AND EXTRACT(HOUR FROM rider_depart_for_rest) <= 22)
		AND
		(EXTRACT(HOUR FROM rider_arrive_rest) >= 10 AND EXTRACT(HOUR FROM rider_arrive_rest) <= 22)
		AND
		(EXTRACT(HOUR FROM rider_depart_for_delivery_location) >= 10 AND EXTRACT(HOUR FROM rider_depart_for_delivery_location) <= 22)
		AND
		(EXTRACT(HOUR FROM order_delivered) >= 10 AND EXTRACT(HOUR FROM order_delivered) <= 22)
	)
);

CREATE TABLE ShoppingCarts(
	oid			INTEGER,
	fid			INTEGER,
	quantity	INTEGER NOT NULL
				CHECK (quantity > 0),
	PRIMARY KEY (oid,fid),
	FOREIGN KEY (oid) REFERENCES Orders (oid),
	FOREIGN KEY (fid) REFERENCES Food (fid)
);

CREATE TABLE Promotions(
    pid        				INTEGER,
    promo_rate      		INTEGER NOT NULL
							CHECK (promo_rate > 0),
    start_datetime  		TIMESTAMP,
    end_datetime    		TIMESTAMP
							CHECK (end_datetime > start_datetime),
	num_times				INTEGER NOT NULL
							CHECK (num_times >= 0),
	infinite_num_times		BOOLEAN DEFAULT(FALSE),
	PRIMARY KEY (pid)
);

CREATE TABLE FDS_Promotions(
    pid        		INTEGER,
    promo_type  	VARCHAR(10) NOT NULL
					CHECK (promo_type IN ('Delivery', 'Order')),
	PRIMARY KEY (pid),
	FOREIGN KEY (pid) REFERENCES Promotions (pid) on delete cascade
);

CREATE TABLE Restaurant_Promotions(
    pid       			INTEGER,				
	rest_id				INTEGER,
	threshold_amt		NUMERIC,
	PRIMARY KEY (pid),
	FOREIGN KEY (pid) REFERENCES Promotions (pid) on delete cascade,
	FOREIGN KEY (rest_id) REFERENCES Restaurants (rest_id)
);

CREATE TABLE FDS_Promo_Applies(
    cid         INTEGER,
    pid    		INTEGER,
    PRIMARY KEY (cid, pid),
	FOREIGN KEY (cid) REFERENCES Customers (cid),
	FOREIGN KEY (pid) REFERENCES FDS_Promotions (pid)
);

CREATE TABLE Food_Reviews(
    oid         INTEGER,
    fid     	INTEGER,
    remark      VARCHAR(1000) NOT NULL,
    PRIMARY KEY (oid, fid),
	FOREIGN KEY (oid) REFERENCES Orders (oid),
	FOREIGN KEY (fid) REFERENCES Food (fid)
);

CREATE TABLE Schedules (
    sid              	INTEGER,
	sche_date			DATE,
	rider_id			INTEGER,
    PRIMARY KEY (sid, sche_date),
	FOREIGN KEY (rider_id) REFERENCES Riders (rider_id)
);

CREATE TABLE Shifts (
    shift_id            INTEGER,
    time_start1         TIME NOT NULL,
	time_end1           TIME NOT NULL,
    time_start2         TIME NOT NULL,
    time_end2           TIME NOT NULL,
	PRIMARY KEY (shift_id)
);

CREATE TABLE Monthly_Work_Schedule (
    sid              	INTEGER,
	sche_date			DATE,
    shift_id            INTEGER,
	PRIMARY KEY (sid, sche_date),
	FOREIGN KEY (sid, sche_date) REFERENCES Schedules (sid,sche_date),
	FOREIGN KEY (shift_id) REFERENCES Shifts (shift_id)
);

CREATE TABLE Weekly_Work_Schedule (
    sid              	INTEGER,
	sche_date			DATE,
	time_start          TIME NOT NULL,
    time_end            TIME NOT NULL
						CHECK (time_end < time_start + INTERVAL '4 hours'),
	duration			INTEGER NOT NULL,
    PRIMARY KEY (sid, sche_date),
	FOREIGN KEY (sid, sche_date) REFERENCES Schedules (sid, sche_date)
);




-- Trigger function to update menu availability on every order placed
CREATE OR REPLACE FUNCTION update_food_availability() RETURNS TRIGGER AS 
$$
DECLARE
	rec RECORD;
	daily_sold_qty INTEGER;
	daily_limit INTEGER;
	exceed_limit BOOLEAN;
BEGIN
  
	FOR rec IN SELECT fid, quantity
			FROM ShoppingCarts
			WHERE oid = NEW.oid
	LOOP
	SELECT daily_sold_qty INTO daily_sold_qty
		FROM Food
		WHERE fid = rec.fid;
	SELECT daily_limit INTO daily_limit
		FROM Food
		WHERE fid = rec.fid;
	IF rec.quantity + daily_sold_qty > daily_limit THEN
		exceed_limit = true;
	ELSIF rec.quantity + daily_sold_qty = daily_limit THEN
		UPDATE Food
		SET daily_sold_qty = daily_sold_qty + rec.quantity,
			availability = 'NOT AVAILABLE'
		WHERE fid = rec.fid;
	ELSE
		UPDATE Food
		SET daily_sold_qty = daily_sold_qty + rec.quantity
		WHERE fid = rec.fid;
	END IF;
	END LOOP;
	
	IF exceed_limit THEN
		RAISE exception 'Unable to make the order';
	ELSE
		RETURN NEW;
	END IF;
	
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS food_daily_limit_trigger ON Orders;
CREATE TRIGGER food_daily_limit_trigger
    BEFORE INSERT ON Orders
    FOR EACH ROW
    EXECUTE FUNCTION update_food_availability();
	
	
	

CREATE OR REPLACE FUNCTION create_first_order_discount() RETURNS TRIGGER AS
$$
DECLARE
	num_rec INTEGER;
BEGIN
	
	SELECT count(*) INTO num_rec
	FROM Promotions;
	
	num_rec = num_rec + 1;
	
	INSERT INTO Promotions
	VALUES (num_rec,10,NULL,NULL,1);
	
	INSERT INTO FDS_Promotions
	VALUES (num_rec,'Order');
	
	INSERT INTO FDS_Promo_Applies
	VALUES (NEW.cid,num_rec);
	
	RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS first_order_discount_trigger ON Customers;
CREATE TRIGGER first_order_discount_trigger
	AFTER INSERT ON Customers
	FOR EACH ROW
	EXECUTE FUNCTION create_first_order_discount();






