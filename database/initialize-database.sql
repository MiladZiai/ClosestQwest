CREATE TABLE IF NOT EXISTS account(
    accountId INTEGER PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    password CHAR(60) NOT NULL,
    CONSTRAINT usernameUnique UNIQUE (username)
);

CREATE TABLE IF NOT EXISTS thread(
    threadId INTEGER PRIMARY KEY AUTO_INCREMENT,
    threadName VARCHAR(50) NOT NULL,
    threadOfAccount INTEGER NULL,
    FOREIGN KEY (threadOfAccount) REFERENCES account(accountId),
    CONSTRAINT threadNameUnique UNIQUE (threadName)
);

CREATE TABLE IF NOT EXISTS post(
    postId INTEGER PRIMARY KEY AUTO_INCREMENT,
    postTitle VARCHAR(50) NOT NULL,
    postContent TEXT NOT NULL,
    postOnThread INTEGER NOT NULL,
    postOfAccount INTEGER NOT NULL,
    FOREIGN KEY (postOnThread) REFERENCES thread(threadId),
	FOREIGN KEY (postOfAccount) REFERENCES account(accountId),
	CONSTRAINT postTitleUnique UNIQUE (postTitle)
);