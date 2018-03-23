create table POST (ID integer not null auto_increment, IS_DISPLAY bit not null, MOD_DATE datetime not null, REG_DATE datetime not null, TITLE varchar(255) not null, CONTENTS longtext not null, primary key (ID));
create table TAG (POST_ID integer not null, TAG varchar(64) not null, primary key (POST_ID, TAG));
alter table TAG add constraint FKgd4sna4a522j8q4fjr8vcc368 foreign key (POST_ID) references POST (ID);
