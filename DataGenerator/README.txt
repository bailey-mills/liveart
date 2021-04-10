-----------------------------
SETTING UP THE DATA GENERATOR
-----------------------------

1. Run 'liveart_dg' database scripts in './liveart/scripts/Data Generator/'
	1. DataGenerator.sql
	2. Run all other DataGenerator_X.sql scripts

2. Set values in App.config
- Changes connectionString value for "LIVEART" (main database)
- Changes connectionString value for "liveart_dg" (data generation sample data database)

3. Run application

4. Click 'User' button. Press 'Preview' to see if it works.

5. Enter the number of users to create and press 'Output' to generate a script. (Don't run in debug if doing >1000-2000+ users/events, it may take some time).



---------------
IMPORTANT NOTES
---------------
- You cannot generate events until there are users in the database, GENERATE USERS AND RUN THE SCRIPT FIRST
- The foreign key IDs are based on your current auto_increment IDs, so if you're creating multiple scripts, run it after you create it one at a time.