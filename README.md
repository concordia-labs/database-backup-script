# **Database backup script**

A simple NodeJS script to manage the scheduled backup of a database.

## **Usage**

* Setup the project with the command `make **setup`**
* Create a `.env` file on the project root folder, following the `.env.example` file:
    ```python
    DB_HOST=localhost
    DB_NAME=my_database
    DB_USER=my_username
    DB_PASSWORD=my_password
    CRON_PERIOD='0 0 * * 1' # Default cron set to Monday 00:00 with a weekly recurrency
    KEEP_LOG_FILE=true # Toggles wether or not the script manages the log files to keep track of the execution 
    CRONITOR_API_KEY=your_api_key # Optional, will only be needed if you wish to integrate with Cronitor to monitor the script execution
    CRONITOR_MONITOR_KEY=your_monitor_key # Optional, will only be needed if you wish to integrate with Cronitor to monitor the script execution
    ENVIRONMENT=local # Defines the environment where the script will be running, useful for Cronitor integration
    ```
    * *If you have doubts about the cron configuration, visit the [crontab guru](https://crontab.guru/) website.*
* Execute the script with `make run`.
* Done! Now you have your database dump schedule script up and running.
* The database dumps will be saved inside the `dumps` folder with the `.sql.gz` extension, so they will be compressed files, to optimize space.

---

## **Extras**

### **Automatic script logging**

When the `KEEP_LOG_FILE` env var is set to `true`, the following behavior happens:
  * A new *debug* file is created inside the `logs` folder for every time you execute the `index.js` file, and all the logging done during the execution is saved there.
  * An *error* log file is saved inside the `logs` folder every time an error occurs.

When the `KEEP_LOG_FILE` env var is set to `false`, the log files are not saved, and the logging is only printed in the console.

We recommend to enable the `KEEP_LOG_FILE` when running locally or in any environment where any other logging applications are not available.

### **Cronitor integration**

The script also support's the [Cronitor](https://cronitor.io/) platform, so you can easily monitor your script execution.

All you need to do to start using the integration is fill the `CRONITOR_API_KEY` and `CRONITOR_MONITOR_KEY` variables with your credentials.