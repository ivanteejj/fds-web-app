--triggers
--1. to have a trigger such that when a new customer make the first order, the 10% discount is automatically applied
--2. to check num of riders for any hourly interval
--3. to check the total cost of order is above min_amt of a restaurant after update on order_status from incomplete to placed
--4. to check whether food_items which belongs to the same order come from the same restaurant(front end)
--5. might need to refresh the sold_qty of Food



DROP TABLE IF EXISTS 	Accounts, Restaurants, Food, Staff, Customers,
						Orders, ShoppingCarts, Promotions,
						Food_Reviews, Riders, Schedules, Shifts, Monthly_Work_Schedule,
						Weekly_Work_Schedule, Year, Month, DaysInWeek, Hour, Areas CASCADE;
						
DROP TYPE IF EXISTS CAT_ENUM, PROMO_CAT_ENUM, PROMO_TYPE_ENUM CASCADE;




CREATE TYPE CAT_ENUM AS ENUM (
    'Local',
	'Asian',
    'Chinese',
	'Japanese', 
	'Western', 
	'Italian', 
	'Vegetarian', 
    'Fast Food', 
	'Breakfast', 
	'Desserts', 
	'Beverage'
);

CREATE TYPE PROMO_CAT_ENUM as ENUM (
    'CART',
    'DELIVERY'
);

CREATE TYPE PROMO_TYPE_ENUM as ENUM (
    'PERCENT',
    'DOLLAR'
);

CREATE TABLE Year (
    year			double precision,
    primary key (year)
);
CREATE TABLE Month (
    month	        double precision,
    primary key (month)
);
CREATE TABLE DaysInWeek (
    day            double precision,
    primary key (day)
);
CREATE TABLE Hour (
    hour            double precision,
    primary key (hour)
);


CREATE TABLE AREAS (
    area        text,
    primary key (area)
);

CREATE TABLE Accounts (
	username				TEXT,
	password			TEXT NOT NULL,
	access_rights		TEXT,
	PRIMARY KEY (username)
);

CREATE TABLE Restaurants (
    rid 			    INTEGER GENERATED BY DEFAULT AS IDENTITY,
    rname           	TEXT NOT NULL,
    address         	TEXT NOT NULL,
	area				TEXT NOT NULL references Areas (area),
    minAmt         		NUMERIC NOT NULL
						CHECK (minAmt >= 0),
    PRIMARY KEY (rid)
);

CREATE TABLE Food (
    fid             		INTEGER GENERATED BY DEFAULT AS IDENTITY,
	rid					    INTEGER NOT NULL,
    fname           		TEXT NOT NULL,
    price           		NUMERIC NOT NULL
							CHECK (price > 0),
    daily_limit     		INTEGER
							CHECK (daily_limit >= 0),
    category        		CAT_ENUM NOT NULL,
    PRIMARY KEY (fid),
	FOREIGN KEY (rid) REFERENCES Restaurants (rid) on delete cascade
);

CREATE TABLE Staff (
	staff_id            INTEGER GENERATED BY DEFAULT AS IDENTITY,
	sname           	TEXT NOT NULL,
    rid             INTEGER NOT NULL,
	username			TEXT NOT NULL,
    PRIMARY KEY (staff_id),
    FOREIGN KEY (rid) REFERENCES Restaurants (rid),
	FOREIGN KEY (username) REFERENCES Accounts (username)
);

CREATE TABLE Customers(
	cid						INTEGER GENERATED BY DEFAULT AS IDENTITY,
	cname 					TEXT NOT NULL,
	points					INTEGER NOT NULL DEFAULT(0)
							CHECK(points >= 0),
	credit_card_number		VARCHAR(19) UNIQUE,
	join_date				DATE,
	username				TEXT NOT NULL,
	PRIMARY KEY (cid),
	FOREIGN KEY (username) REFERENCES Accounts (username)
);

CREATE TABLE Riders(
    rider_id            INTEGER GENERATED BY DEFAULT AS IDENTITY,
	rname				TEXT NOT NULL,
    rider_type          VARCHAR(2) NOT NULL
                        CHECK (rider_type in ('FT','PT')),
    base_salary         NUMERIC NOT NULL,
	username			TEXT NOT NULL,
    PRIMARY KEY (rider_id),
	FOREIGN KEY (username) REFERENCES Accounts (username)
);

CREATE TABLE Promotions(
        pid        				        INTEGER GENERATED BY DEFAULT AS IDENTITY,
        promo_rate      		        INTEGER NOT NULL,
        CHECK (promo_rate > 0),
        promo_type                      PROMO_TYPE_ENUM NOT NULL,
        promo_cat  	                    PROMO_CAT_ENUM NOT NULL,
        start_datetime  		        timestamp,
        end_datetime    		        timestamp
            CHECK (end_datetime > start_datetime),
        promo_min_cost                  INTEGER,
        promo_max_discount_limit        INTEGER,
        promo_max_num_redemption        INTEGER,
        promo_details_text              TEXT NOT NULL,
        rid				                INTEGER REFERENCES Restaurants (rid),

        PRIMARY KEY (pid)
);


CREATE TABLE Orders(
	oid										INTEGER GENERATED BY DEFAULT AS IDENTITY,
	order_placed							timestamp NOT NULL,
	rider_depart_for_rest					timestamp,
	rider_arrive_rest						timestamp,
	rider_depart_for_delivery_location		timestamp,
	order_delivered							timestamp,
	rider_review							TEXT,
	payment_method							TEXT NOT NULL
											CHECK (payment_method IN ('CREDITCARD','CASHONDELIVERY')),
    cart_fee						    	numeric NOT NULL
                                            CHECK (cart_fee >= 0),
    delivery_fee							numeric NOT NULL
                                            CHECK (delivery_fee >= 0),
	rider_bonus								NUMERIC NOT NULL,
    discount_amount							NUMERIC NOT NULL,
    delivery_location						TEXT NOT NULL,
    delivery_location_area					TEXT NOT NULL references Areas (area),
    rider_id								INTEGER NOT NULL,
	rider_rating							INTEGER NOT NULL DEFAULT(5)
											CHECK (rider_rating >= 1 AND rider_rating <= 5),
	cid										INTEGER NOT NULL,
	pid                                     INTEGER,
	PRIMARY KEY (oid),
	FOREIGN KEY (rider_id) references Riders (rider_id),
	FOREIGN KEY (cid) references Customers (cid),
	FOREIGN KEY (pid) references Promotions (pid),
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
	oid							INTEGER,
	fid							INTEGER,
	quantity					INTEGER NOT NULL
								CHECK (quantity > 0),
	fname 						TEXT NOT NULL,
	food_price_purchased		NUMERIC NOT NULL
								CHECK (food_price_purchased > 0),
	PRIMARY KEY (oid,fid),
	FOREIGN KEY (oid) REFERENCES Orders (oid),
	FOREIGN KEY (fid) REFERENCES Food (fid)
);

CREATE TABLE Food_Reviews(
    oid         INTEGER,
    fid     	INTEGER,
    remark      VARCHAR(1000) NOT NULL,
    ratings     INTEGER
                CHECK (ratings > 0 AND ratings <= 5),
    PRIMARY KEY (oid, fid),
    FOREIGN KEY (oid) REFERENCES Orders (oid),
    FOREIGN KEY (fid) REFERENCES Food (fid)
);

CREATE TABLE Schedules (
    sid              	INTEGER GENERATED BY DEFAULT AS IDENTITY,
	rider_id			INTEGER NOT NULL,
    PRIMARY KEY (sid),
	FOREIGN KEY (rider_id) REFERENCES Riders (rider_id)
);

CREATE TABLE Shifts (
    shift_id            INTEGER GENERATED BY DEFAULT AS IDENTITY,
    time_start1         TIME NOT NULL,
	time_end1           TIME NOT NULL,
    time_start2         TIME NOT NULL,
    time_end2           TIME NOT NULL,
	PRIMARY KEY (shift_id)
);

CREATE TABLE Monthly_Work_Schedule (
    sid              	INTEGER,
	week				INTEGER NOT NULL
						CHECK (week IN (1,2,3,4)),
	sche_date			DATE,
    shift_id            INTEGER NOT NULL,
	PRIMARY KEY (sid, sche_date),
	FOREIGN KEY (sid) REFERENCES Schedules (sid),
	FOREIGN KEY (shift_id) REFERENCES Shifts (shift_id)
);

CREATE TABLE Weekly_Work_Schedule (
    sid              	INTEGER,
	sche_date			DATE,
	time_start          TIME NOT NULL
						CHECK (time_start IN ('10:00:00','11:00:00',
						'12:00:00','13:00:00','14:00:00','15:00:00',
						'16:00:00','17:00:00','18:00:00','19:00:00',
						'20:00:00','21:00:00','22:00:00')), --to enforece constraint that end on hours
    time_end            TIME NOT NULL
						CHECK (time_end <= time_start + INTERVAL '4 hours'
						AND time_start IN ('10:00:00','11:00:00',
						'12:00:00','13:00:00','14:00:00','15:00:00',
						'16:00:00','17:00:00','18:00:00','19:00:00',
						'20:00:00','21:00:00','22:00:00')), --to enforece constraint that end on hours
	duration			INTEGER NOT NULL,
    PRIMARY KEY (sid, sche_date,time_start),
	FOREIGN KEY (sid) REFERENCES Schedules (sid)
);


--enforce the constraint that 4 WWS must be the same
CREATE OR REPLACE FUNCTION check_monthly_work_schedule_constraint() RETURNS TRIGGER AS
$$
DECLARE
    rec Record;
    num INTEGER;
    d1 DATE;
    d2 DATE;
BEGIN

    --check within week
    --num of work day in a week > 5, false
    select count(*) into num
    from Monthly_Work_Schedule
    where sid = NEW.sid
      and week = NEW.week;

    if num > 5 then
        RAISE exception 'MWS constraint 1 violated.';
    end if;

    --the range of date in a week wider than 5 days, false
    select max(sche_date) - min(sche_date) into num
    from Monthly_Work_Schedule
    where sid = NEW.sid
      and week = NEW.week;

    if num >= 5 then
        RAISE exception 'MWS constraint 2 violated.';
    end if;


    --check between (current and pre week) and (current and next week)
    --two days gap between the max date of previous week and min date of current week
    if NEW.week > 1 then


        select max(sche_date) into d1
        from Monthly_Work_Schedule
        where sid = NEW.sid
          and week = NEW.week-1;

        select min(sche_date) into d2
        from Monthly_Work_Schedule
        where sid = NEW.sid
          and week = NEW.week;

        if d2 - d1 <= 2 then
            RAISE exception 'MWS constraint 3 violated.';
        end if;

        select min(sche_date) into d1
        from Monthly_Work_Schedule
        where sid = NEW.sid
          and week = NEW.week-1;

        select max(sche_date) into d2
        from Monthly_Work_Schedule
        where sid = NEW.sid
          and week = NEW.week;

        if d2 - d1 > 11 then
            RAISE exception 'MWS constraint 4 violated.';
        end if;
    end if;

    --two days gap between the min date of current week and max date of next week
    if NEW.week < 4 then
        select max(sche_date) into d1
        from Monthly_Work_Schedule
        where sid = NEW.sid
          and week = NEW.week;

        select min(sche_date) into d2
        from Monthly_Work_Schedule
        where sid = NEW.sid
          and week = NEW.week + 1;

        if d2 -d1 <= 2 then
            RAISE exception 'MWS constraint 5 violated.';
        end if;

        select min(sche_date) into d1
        from Monthly_Work_Schedule
        where sid = NEW.sid
          and week = NEW.week;

        select max(sche_date) into d2
        from Monthly_Work_Schedule
        where sid = NEW.sid
          and week = NEW.week + 1;

        if d2 -d1 > 11 then
            RAISE exception 'MWS constraint 6 violated.';
        end if;
    end if;


    --check across all weeks
    --if same DOW but diff shift id, raise exception
    FOR rec in select *
               from Monthly_Work_Schedule
               where sid = NEW.sid
                 and extract(DOW from NEW.sche_date) = extract(DOW from sche_date)
        LOOP

            IF rec.shift_id <> NEW.shift_id THEN
                RAISE exception 'MWS constraint 7 violated.';
            END IF;
        END LOOP;



    --across all weeks, if range between largest date and smallest date is larger than 25, false
    select max(sche_date) - min(sche_date) into num
    from Monthly_Work_Schedule
    where sid = NEW.sid;

    if num >25 then
        RAISE exception 'MWS constraint 8 violated.';
    end if;


    RETURN NULL;

END;
$$ LANGUAGE plpgsql;


DROP TRIGGER IF EXISTS monthly_work_schedule_trigger on Monthly_Work_Schedule;
CREATE TRIGGER weekly_work_schedule_trigger
    AFTER UPDATE OR INSERT
    ON Monthly_Work_Schedule
    FOR EACH ROW
EXECUTE FUNCTION check_monthly_work_schedule_constraint();






--insert all WWS in a transaction to pass the trigger
--to enforce the constraint that at least one hour interval between two consecutive intervals
CREATE OR REPLACE FUNCTION check_weekly_work_schedule_constraint() RETURNS TRIGGER AS
$$
DECLARE
    rec RECORD;
    one_hour_before time;
    one_hour_after time;
    num INTEGER;
BEGIN

    select coalesce(sum(duration),0) into num
    from Weekly_Work_Schedule
    where sid = NEW.sid;

    if num < 10 OR num > 48 then
        RAISE exception 'The total number of hours in each WWS must be at least 10 and at most 48.';
    end if;



    FOR rec IN SELECT time_start, time_end
               FROM Weekly_Work_Schedule
               WHERE sid = NEW.sid
                 and sche_date = NEW.sche_date
                 and time_start <> NEW.time_start
        LOOP

            one_hour_before:= rec.time_start - '1 hour'::interval;
            one_hour_after:= rec.time_end + '1 hour'::interval;


            if (NEW.time_start >= rec.time_start AND NEW.time_start <= rec.time_end)
                OR (NEW.time_end >= rec.time_start AND NEW.time_end <= rec.time_end) THEN
                RAISE exception 'there is an overlap with the existing records.';
            ELSIF (NEW.time_start >= one_hour_before AND NEW.time_start <= one_hour_after)
                OR (NEW.time_end >= one_hour_before AND NEW.time_end <= one_hour_after) THEN
                RAISE exception 'there must be at least one hour interval.';
            END IF;

        END LOOP;

    RETURN NULL;

END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS weekly_work_schedule_trigger on Weekly_Work_Schedule;
CREATE CONSTRAINT TRIGGER weekly_work_schedule_trigger
    AFTER UPDATE OR INSERT
    ON Weekly_Work_Schedule
    DEFERRABLE INITIALLY DEFERRED
    FOR EACH ROW
EXECUTE FUNCTION check_weekly_work_schedule_constraint();





CREATE OR REPLACE FUNCTION check_cart_items_from_same_rest() RETURNS TRIGGER AS
$$
DECLARE
    rec RECORD;
    restId INTEGER;
BEGIN

    select rid into restId
    from Food natural join Restaurants
    where fid = NEW.fid;

    FOR rec in select rid
               from ShoppingCarts natural join Food
               where oid = NEW.oid
        LOOP

            if rec.rid <> restId then
                RAISE EXCEPTION 'Cart items must be from the same restaurant.';
            end if;
        END LOOP;

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;


DROP TRIGGER IF EXISTS check_cart_items_from_same_rest_trigger on ShoppingCarts;
CREATE TRIGGER check_cart_items_from_same_rest_trigger
    AFTER UPDATE OR INSERT ON ShoppingCarts
    FOR EACH ROW
EXECUTE FUNCTION check_cart_items_from_same_rest();


CREATE OR REPLACE FUNCTION check_FT_Rider_Schedules_constraints() RETURNS TRIGGER AS
$$
DECLARE
    rtype VARCHAR;
BEGIN
    select rider_type into rtype
    from Schedules natural join Riders
    where sid = NEW.sid;

    if rtype <> 'FT' then
        RAISE EXCEPTION 'MWS can only be assigned to full time rider';
    end if;

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS FT_Rider_Schedules_constraints_trigger on Monthly_Work_Schedule;
CREATE TRIGGER FT_Rider_Schedules_constraints_trigger
    AFTER UPDATE OR INSERT ON Monthly_Work_Schedule
    FOR EACH ROW
EXECUTE FUNCTION check_FT_Rider_Schedules_constraints();




CREATE OR REPLACE FUNCTION check_PT_Rider_Schedules_constraints() RETURNS TRIGGER AS
$$
DECLARE
    rtype VARCHAR;
BEGIN
    select rider_type into rtype
    from Schedules natural join Riders
    where sid = NEW.sid;

    if rtype <> 'PT' then
        RAISE EXCEPTION 'WWS can only be assigned to part time rider';
    end if;

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS PT_Rider_Schedules_constraints_trigger on Weekly_Work_Schedule;
CREATE TRIGGER PT_Rider_Schedules_constraints_trigger
    AFTER UPDATE OR INSERT ON Weekly_Work_Schedule
    FOR EACH ROW
EXECUTE FUNCTION check_PT_Rider_Schedules_constraints();






--insert all WWS in a transaction to pass the trigger
--to enforce the constraint that at least one hour interval between two consecutive intervals
CREATE OR REPLACE FUNCTION check_weekly_work_schedule_constraint() RETURNS TRIGGER AS
$$
DECLARE
	rec RECORD;
	one_hour_before time;
	one_hour_after time;
	num INTEGER;
BEGIN
	
	select coalesce(sum(duration),0) into num
	from Weekly_Work_Schedule
	where sid = NEW.sid;
	
	if num < 10 OR num > 48 then
		RAISE exception 'The total number of hours in each WWS must be at least 10 and at most 48.';
	end if;
	
	
	
	
	
	
	
	FOR rec IN SELECT time_start, time_end
			FROM Weekly_Work_Schedule
			WHERE sid = NEW.sid
			and sche_date = NEW.sche_date
			and time_start <> NEW.time_start
	LOOP
		
		one_hour_before:= rec.time_start - '1 hour'::interval;
		one_hour_after:= rec.time_end + '1 hour'::interval;
		
		
		if (NEW.time_start >= rec.time_start AND NEW.time_start <= rec.time_end)
		OR (NEW.time_end >= rec.time_start AND NEW.time_end <= rec.time_end) THEN
			RAISE exception 'there is an overlap with the existing records.';
		ELSIF (NEW.time_start >= one_hour_before AND NEW.time_start <= one_hour_after)
		OR (NEW.time_end >= one_hour_before AND NEW.time_end <= one_hour_after) THEN
			RAISE exception 'there must be at least one hour interval.';
		END IF;
	
	END LOOP;
	
	RETURN NULL;

END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS weekly_work_schedule_trigger on Weekly_Work_Schedule;
CREATE CONSTRAINT TRIGGER weekly_work_schedule_trigger
	AFTER UPDATE OR INSERT 
	ON Weekly_Work_Schedule
	DEFERRABLE INITIALLY DEFERRED
	FOR EACH ROW
	EXECUTE FUNCTION check_weekly_work_schedule_constraint();
