# TradeBiBata Setup

## Installation

This guide assumes you have the following installed:

-   git or Github desktop [github desktop download](https://desktop.github.com/)
-   npm [npm download & install](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
-   VS Code [download](https://code.visualstudio.com/download)
-   Docker [download](https://www.docker.com/products/docker-desktop/) 

If not, please see the relevant installation guides.

#### NB: The dockerized version of this app can be found in the *dockerizedapp* branch

-   From your command line, navigate to where you want to save the repository.
-   Run the following commands to clone the repository and set up the folders.

```
git clone https://github.com/Team-1-SIT725/SIT725-T3-2022-Team1_Repo.git

cd SIT725-T3-2022-Team1_Repo

mkdir upload - directory for storing profile item files
mkdir uploadAdr - directory for storing user address documents
mkdir profile-img - directory for storing profile images.
```

-   If your system has VS Code setup as a system path, use `code .` otherwise, open vs code and use the open folder option to open the SIT725-T3-2022-Team1_Repo directory.

-   In the root directory, create a new file called `.env` and add the following environmental entries.

```
# .env file
# This file contains all the environment variables for the application
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

> -   The .env file contains the settings needed to run the service but is sensitive and not synced to GitHub by default.
>     `NODE_ENV` controls where the server runs in development (dev) or production (prod) mode. By default, Node JS runs in dev; changing to prod will use the production database if set up and switch off dev-only addons.
> -   `PORT` control the port number your web server will run on. By default, it's 3000, but you can change this to something else, provided it's not in use.
> -   If you have both a dev and prod environment populate the Mongo URI for both environments. If you are new to MongoDB, see this [section](#mongodb-setup) on setting up a new account and getting your URI.

> Email settings are for the outgoing mail server where email verification and password reset emails are sent. For example, if your using Gmail as your email host, you would use the following:

```
EMAIL_HOST = "smtp.gmail.com"
EMAIL_USERNAME = "myemailaccount@gmail.com"
EMAIL_PASSWORD = "" #note this is not your account login password 2FA and application password needed.
FROM_EMAIL = "myemailaccount@gmail.com"
```

See this [section](#gmail-setup) for instructions on setting up 2FA and an application-specific password.

-   Run this command to install all the node packages.

```
npm install
```

## Running TradeBiBata

Once everything is installed and configured, you can start TradeBiBata by running the following comment from the SIT725-T3-2022-Team1_Repo directory.

```
npm start
```
Enter `http://localhost:3000/` in your web browser, and you will be presented with the login screen. Create a new account and test the system out.

Congratulations!!! You are setup and ready to go for more information and guides on using the different parts of TradeBiBata please see the [Wiki](https://github.com/Team-1-SIT725/SIT725-T3-2022-Team1_Repo/wiki)

## Running through Docker

This is an easier way to run the app removing the need to clone the repository.

Follow the steps to run the app with docker. To use this method it is important Docker desktop is up on your system.
1. Run *docker pull kachio/team1project:latest* - This pulls the container from a docker repository created for this application.
2. Run *docker run -dp 3000:3000 team1project:latest* - This assigns the app to port 3000.
3. Now you can access the app on `http://localhost:3000/`

## Configure Search

To use search, a search index needs to be configured in MongoDB.
The first time the server is run all the database collections will be created. **\_Please ensure the nodeJS server has been run at least once before proceeding.**
Once you have started the server, all the database tables will be created in MongoDB.

-   Log into MongoDB, click **Browse Collection** on your cluster.

![Image showing browse collection](/docs/assets/BrowseCollection.png)

-   Select search, wait a moment, and click **Create Search Index** once the button appears.

-   Select JSON Editor and click next.

![Create Search Index Dialogue](/docs/assets/CreateSearch.png)

-   On the left, select the item collection
-   Under the index name enter <ItemSeach>
-   Copy and past the following JSON
-   Click Next

```
{
  "mappings": {
    "dynamic": false,
    "fields": {
      "itemName": [
        {
          "foldDiacritics": false,
          "maxGrams": 7,
          "minGrams": 3,
          "tokenization": "edgeGram",
          "type": "autocomplete"
        }
      ]
    }
  }
}
```

![Configuration for the search JSON editor](/docs/assets/searchJSON.png)

On the last screen, click **Create Search Index**.
The index will take 5-10 mins to index the Collection; once complete search will function.

## MongoDB setup

To set up a new MongoDB account go to https://www.mongodb.com/ and click Try Free

-   Register a new account or use SSO to sign up with Google.
-   Complete the registration process and sign in.
-   Complete the survey on the application.
-   Select free shared for your database type.

![view showing MongoDb account types](/docs/assets/AccountType.png)

-   Select your provider and location (defaults will be fine
-   Click **Create cluster**.

-   For security quick start enter a username and password you will need these later to connect to the DB. Click Create User.

![dialog for creating DB username and Password](/docs/assets/UsernamePass.png)

-   Under where would you like to connect form, leave it as My local Environment and enter 0.0.0.0/0 to not restrict access. Click add entry, click finish, and close.

![Image showing how to restrict access based on IP address](/docs/assets/NetworkAccess.png)

-   You should now be presented with your first cluster. To get the connection details for node JS click to connect.

![view showing cluster](/docs/assets/Clusterview.png)

-   Select connect your application.

![view showing connect to your application](/docs/assets/Connect.png)

-   Make sure node.js is selected and copy the connection string. Replace <<password>> with the password you created earlier.

![image showing DB connection string to copy](/docs/assets/URISample.png)

-   Place this string in your .env file against MONGO_URI_DEV or MONGO_URI_PROD, depending on the environment.

```

#database settings
MONGO_URI_DEV = ""
MONGO_URI_PROD = "mongodb+srv://MyTestDB:<password>@cluster0.fzdtijf.mongodb.net/?retryWrites=true&w=majority"

```

## Gmail Setup

This guide will show you how to set up 2FA and an application password on Gmail to use with the TradeBiBata platform.
Sign in to your Gmail account, click the account icon, and select **Manager your Google Account**

![Image showing manage your Google Account](/docs/assets/GoogleAccount.png)

### 2FA Setup

-   select **Security** on the sidebar
-   Under Signing in to Google, select 2-Step Verification

![image showing 2FA setup](/docs/assets/2FASetupMenu.png)

-   Click Get Started
-   Step 1 - Enter your mobile number and click next

![2FA step one, enter Phone number](/docs/assets/2FAPhone.png)

-   Step 2 - A code will be sent to your mobile; enter it and click next
-   Step 3 - Click turn on

2FA is now set up on your Gmail account; return to the main security tab.

### App Passwords

Under signing in to Google, a new item **App passwords** should now be present.

![Image showing signing options for google](/docs/assets/AppPass.png)

-   Select **App passwords**
-   Provide your account password if prompted

![Image showing select app and device](/docs/assets/AppPassSelectApp.png)

-   Under Select app, pick Mail
-   Under Select Device, pick other and enter `NodeJS TradeBiBata`.
-   Click Generate, and you will be presented with a password
-   **_Write This down as it will only be shown once_**

![Generated App Password](/docs/assets/AppPassPassBlur.png)

-   Use this password in your `.env` file under the email settings.

```
#email settings
EMAIL_HOST = "smtp.gmail.com"
EMAIL_USERNAME = "myemailaccount@gmail.com"
EMAIL_PASSWORD = "yournewpassword"
FROM_EMAIL = "myemailaccount@gmail.com"
```
