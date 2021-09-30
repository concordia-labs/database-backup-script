# **Database backup script**

NodeJS script to manage the backup schedule of a server database.

## **Usage**

* Setup the project with the command `make setup`
* Create a `.env` file on the project root folder, following the `.env.example` file:
    ```python
    DB_HOST=localhost
    DB_NAME=my_database
    DB_USER=username
    DB_PASSWORD=mypassword
    CRON_PERIOD='0 0 * * 1' # Default cron set to Monday 00:00 with a weekly recurrency
    ```
    * *If you have doubts about the cron configuration, visit the [crontab guru](https://crontab.guru/) website.*
* Execute the script with `make run`.
* Done! Now you have your database dump schedule script up and running.

## **Extra**

* A new *debug* file is created inside the `logs` folder for every time you run the `index.js` file, and all the logging done during the execution is saved there.
* An *error* log file will be saved inside the `logs` folder every time an error occurs.
* The database dumps will be saved inside the `dumps` folder with the `.sql.gz` extension, so they will be compressed files, to optimize space.