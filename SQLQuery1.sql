CREATE TABLE userLoginTable (
  UserID INT PRIMARY KEY,
  Username VARCHAR(50),
  Password VARCHAR(50)
);


CREATE TABLE recordTable (
  Id INT PRIMARY KEY,
  Title VARCHAR(100),
  Detail VARCHAR(255),
  CreatedTime DATETIME,
  EndTime DATETIME,
  Status INT,
  UserID INT,
  FOREIGN KEY (UserID) REFERENCES userLoginTable(UserID)
);