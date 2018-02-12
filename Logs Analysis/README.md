# Logs analysis project

### Setting up software
There are multiple programs that you will have to install before you can run this project.

#### Software and data links
 * [Vagrant 2.0.2](https://www.vagrantup.com/downloads.html)
 * [Virtual Box 5.1 (Newer versions may not work)](https://www.virtualbox.org/wiki/Download_Old_Builds_5_1)
 * [SQL Database](https://d17h27t6h515a5.cloudfront.net/topher/2016/August/57b5f748_newsdata/newsdata.zip)
 * [Python 2.7.14](https://www.python.org/downloads/)

##### Installation
 1. Install Python, virtual box, and vagrant to you computer.
 2. Download/Clone the [FSND VM repository](https://github.com/udacity/fullstack-nanodegree-vm).
 3. Unzip the SQL database into your VM repository (FSND-Virtual-Machine\vagrant).
 4. Download/Clone this repository into the VM repository too so you can run these results and modify the query yourself (FSND-Virtual-Machine\vagrant).
 5. Open you CLI and move to the same vagrant directory (FSND-Virtual-Machine\vagrant).
 6. Enter in the command:

        vagrant up
 7. After that runs enter in the next command:

        vagrant ssh

 8. You are now running your VM. Enter:

        cd /vagrant
    in order to get into the shared directory and see your files.

##### Connecting to the database and running the python script
1. Enter:

        psql -d news -f newsdata.sql
   to load the data into a local database.
2. Command to run the python script (which outputs results.txt):

        python sql_query.py

