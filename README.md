# TradeBiBata Setup

## Installation

This guide assumes you have the following installed:

-   git or github desktop [github desktop download](https://desktop.github.com/)
-   npm [npm download & install](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
-   VScode [download](https://code.visualstudio.com/download)

If not please see the relevant installation guides

From your command line navigate to where you want to save the repository,
Run the following commands to clone the repository and setup the folders.

```
git clone https://github.com/Team-1-SIT725/SIT725-T3-2022-Team1_Repo.git

cd SIT725-T3-2022-Team1_Repo

mkdir upload
mkdir uploadAdr
mkdir profile-img
```

If you system has vscode setup as system path use `code .` otherwise open vscode and use open folder to open the SIT725-T3-2022-Team1_Repo directory.

In the root directory create a new file called `.env` and create the following environmental entries.

```
# .env file
# This file contains all the environment variables for the application
# This file is not tracked by git, so you can put your own values here
# and they will not be committed to the repository

#environment settings
NODE_ENV = 'development' #change to production when you are ready to deploy
PORT = 3000

#database settings
MONGO_URI_DEV = ""
MONGO_URI_PROD = ""

#email settings
EMAIL_HOST = ""
EMAIL_USERNAME = ""
EMAIL_PASSWORD = ""
FROM_EMAIL = ""

# User name and password for test account
USER_NAME = ""
PASSWORD = ""
```

This .env file contains settings need to run the but are sensitive and not synced to github by default.
`NODE_ENV` controle where the server is running in development (dev) or production (prod) mode by default Node JS runs in dev changing to prod will use the production database if setup and switch of dev only addons.

`PORT` control the port number your web server will run on by default it's 3000 but you can change this to something else provided it's not in use.

If you have both a dev and prod environment populate the Mongo URI for both environments if you are new to MongoDB see this [section](#mongodb-setup) on setting up a new account and getting your URI.

Email settings are for the outgoing mail server where email verification and password reset email will come from. For example if your using gmail as your email host you would use the following

```
EMAIL_HOST = "smtp.gmail.com"
EMAIL_USERNAME = "myemailaccount@gmail.com"
EMAIL_PASSWORD = "" #note this is not your account login password 2FA and application password needed.
FROM_EMAIL = "myemailaccount@gmail.com"
```

See this [section](#gmail-setup) for details instruction for setting up 2FA and an application specific password.

Run this command to install all the node packages

```
npm install
```

## Running TradeBiBata

Once everything is installed and configured you can start TradeBiBata by running the following comment from the SIT725-T3-2022-Team1_Repo directory

`npm start`

enter `http://localhost:3000/` in your web browser and you will be presented with the login screen. Create a new account and test the system out.

Congratulations!!! your are setup and ready to got for more information and guides on using the different parts of TradeBiBata please see the [Wiki](https://github.com/Team-1-SIT725/SIT725-T3-2022-Team1_Repo/wiki)

## MongoDB setup

## Gmail Setup
