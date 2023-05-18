# Database Setup
## Install Docker Desktop
Download from [here](https://www.docker.com/products/docker-desktop/).
You will need to create an account with Docker.
## Create MySQL Container
To create a MySQL Docker container, run the following script:  
`docker run -e MYSQL_ROOT_PASSWORD=mysecretpassword -p 3307:3306 mysql:latest`
where 
- *MYSQL_ROOT_PASSWORD* becomes an environment variable as the root password for the database. 
- *mysecretpassword* should be replaced with the password you desire for the MySQL database password in the docker container. 
- *3307:3306* forwards port 3306 on the docker container to 3307 on the host machine because the MySQL database is by default on port 3306, but needs to be available on the host computer. 
- *mysql:latest* simply gives the template for the new docker container. 
## Add Volumes Backup & Share Extension
1. Open Docker Desktop app
2. On the left hand side, click "Add Extensions".
3. Search for "Volumes Backup & Share".
4. Click "Install".
## (Optional) Install MySQL Workbench
Download from [here](https://dev.mysql.com/downloads/workbench/).
## (Optional) Connect to Docker Database
1. Open MySQL Workbench.
2. In the top bar, select "Database > Connect to Database...".
3. Change port to 3307 or the custom port number used when creating the MySQL Docker container. 
4. Click "Ok".

Now the connection is available in the app. Click on the connection option and enter the password for the MySQL database on the docker container, which is *mysecretpassword*.

# Express Backend Setup
## Install Necessary Modules
run `npm install`in the expressbackend directory, which will install the necessary node_modules folder.
## Create Environment Variables File
Create a .env file in the expressbackend directory.
The contents should contain the following variables:

``` .env
DB_NAME=my_database
DB_USER=my_user
DB_PASSWORD=my_password
DB_HOST=localhost
DB_PORT=my_port

APP_SECRET_KEY=super_secret_key
TOKEN_SECRET_KEY=another_super_secret_key
```
where
- *my_database* should be `jotsdb` to match the database for this project
- *my_user* should be `root`
- *my_password* should match *mysecretpassword* when creating the MySQL docker container. 
- *localhost* should literally be `localhost` or `127.0.0.1` since localhost may not work
- *my_port* should be `3307` or the custom port on the host machine from the docker container
- *super_secret_key* and *another_super_secret_key* are custom strings of your design that are at least 15-20 characters preferably.

# Running the Backend
## Startup the MySQL Docker Container
1. Open Docker Desktop
2. In the "Containers" tab, click on the play triangle button to start the MySQL container.
The container is now running with the database
## Importing Updated Database
1. Open the "Volumes Backup & Share" extension page in Docker Desktop app.
2. Select the up arrow button in line with the MySQL container, which will open a file explorer window
3. Select the .tar.zst file for the volume with the updated database, likely stored in this repo under a folder for the database.
## Start the Backend Project
Under the expressbackend directory, run `npm start`. The server will be hosted on port 3000.

# Testing the Backend
## Install Rest Client in VSCode
Add the "REST Client" extension in VSCode.
This will allow you to run http requests to test the REST API of the express backend.
## Sending HTTP Request
Using .http files, which there are some already in the project, you can test the API by using the HTTP request format of the REST Client extension. Simply click the "Send Request" button above a request to test the API with that request. 
