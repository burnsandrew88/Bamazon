DROP DATABASE IF EXISTS musicDB;

CREATE DATABASE musicDB;

USE musicDB; 

CREATE TABLE songs (
	id INTEGER  AUTO_INCREMENT PRIMARY KEY,
	title VARCHAR (50), 
	artist VARCHAR (50), 
    genre VARCHAR(50)
);

INSERT INTO songs (title, artist, genre)
VALUES ("Back in Black", "AC/DC", "Rock"),
				("Drones", "Muse", "Alternative Rock"), 
                ("Colder Weather", "Zac Brown Band", "Country"),
                ("Black Honey", "Thrice", "Alternative Rock");

SELECT * FROM songs;
