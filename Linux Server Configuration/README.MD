# Linux Server Configuration

IP Address for ssh: 54.244.164.59
[Server link](http://ec2-54-244-164-59.us-west-2.compute.amazonaws.com/)

### Security

##### Installing linux updates

		sudo apt-get update
		sudo apt-get upgrade

##### Secure SSH
 
	        sudo nano /etc/ssh/sshd_config
		
Change the line:
	
		Port 22
to

		Port 2200

Change the line:

		PermitRootLogin prohibit-password
to

		PermitRootLogin no
		
Then, save the file and restart ssh

		sudo service ssh restart

##### Configuring the UFW firewall
 
 		sudo ufw allow 2200/tcp
		sudo ufw allow ntp
		sudo ufw allow http
		sudo ufw enable
		
### Create and connect grader account for project reviewer

##### Creating the grader account and giving it sudo powers

		sudo adduser grader
		sudo nano /etc/sudoers.d/grader
		
   This will open up a file that links back to sudoers.
   
   		grader ALL=(ALL) NOPASSWD:ALL
		
   Save this file and now the grader account will have sudo powers!

##### Allowing grader SSH access
On a local machine, enter the following command:
		
		ssh-keygen
When asked for what to call the keys, save a file in:

		~/.ssh/grader
And create a password for your keys.


Keep the public key accessible (grader.pub), and connect using the original account, and enter in the following commands in the home directory of your grader account:
		
		sudo su grader
		mkdir .ssh
		touch .ssh/authorized_keys
		nano .ssh/authorized_keys
		
Paste your public key (grader.pub) into this file and save it.		

###### Adding security to the .ssh directory and authorized_keys file
After creating the authorized_keys file, enter in the following commands:

		sudo chmod 700 .ssh
		sudo chmod 644 .ssh/authorized_keys
These secure the directory and file so no unauthorized personel can access them.

###### Logging in using the grader account
Now connect to the grader account for the rest of the configuration:

		ssh grader@IP_ADDRESS -p 2200 -i ~/.ssh/grader
and now you're connected to the grader account via SSH!

### Synchronize Server

##### Configuring the timezone and install NTP.

		sudo dpkg-reconfigure tzdata
Select None of the above, and then UTC for the timezone.
 
 		sudo apt-get install ntp
NTP helps keep the server's time sychronized.

### Installing Python, packages, and the project

##### Install Git and downloading the catalog project, packages, and make prevent the repo from being accessed via a browser
 Source: (Digital Ocean: Deploying a Flask Application on an Ubuntu VPS)[https://www.digitalocean.com/community/tutorials/how-to-deploy-a-flask-application-on-an-ubuntu-vps#step-two-%E2%80%93-creating-a-flask-app]
 
 		cd /var/www
		sudo apt-get install git
		sudo git clone https://github.com/MrJustPeachy/FSND.git
		sudo apt-get install python-pip
		sudo pip install psycopg2 flask sqlalchemy httplib2 json oauth2client requests
Now we need to extract just the catalog project out and put it into the correct file structure

		sudo mkdir -p catalog/catalog
		sudo mv "FSND/Catalog Project"/* catalog/catalog/
		sudo rm -r FSND/
		
Next step is to prevent the repo from being publicly accessible via a browser

		sudo nano /var/www/catalog/.htaccess
Inside the file type the following:

		RedirectMatch 404 /\.git
		
##### Installing apache2 to run the application
Source: (Digital Ocean: Deploying a Flask Application on an Ubuntu VPS)[https://www.digitalocean.com/community/tutorials/how-to-deploy-a-flask-application-on-an-ubuntu-vps#step-one%E2%80%94-install-and-enable-mod_wsgi]

 		sudo apt-get install apache2
vist your server through a browser and check to make sure that you see the Apache2 default page that has text that says: "It works!"


Next install WSGI to extend the functionality of Apache.

		sudo apt-get install libapache2-mod-wsgi
Now Apache needs to be restarted to support WSGI.

		sudo service apache2 restart
Find hostname and put it into an apache config
	
		hostname
Take this value and put it into the fqdn.conf file made below

		sudo nano /etc/apache2/conf-available/fqdn.conf
In fqdn.conf:

		ServerName *HOSTNAME*
And the last step is to enable the config file:

		sudo a2enconf fqdn

##### Extending apache and configuring it further
Source: (Digital Ocean: Deploying a Flask Application on an Ubuntu VPS)[https://www.digitalocean.com/community/tutorials/how-to-deploy-a-flask-application-on-an-ubuntu-vps#step-four-%E2%80%93-configure-and-enable-a-new-virtual-host]

Now we'll create the main application config

		sudo nano /etc/apache2/sites-available/catalog.conf
Inside catalog.conf:

		<VirtualHost *:80>
			ServerName *PUBLIC_IP_ADDRESS*
			ServerAdmin ubuntu@*PUBLIC_IP_ADDRESS*
			ServerAlias *DNS NAME OF SERVER / HUMAN READABLE URL*
			WSGIScriptAlias / /var/www/catalog/catalog.wsgi
			<Directory /var/www/catalog/catalog/>
			Order allow,deny
			Allow from all
			</Directory>
			Alias /static /var/www/catalog/catalog/static
			<Directory /var/www/catalog/catalog/static/>
			Order allow,deny
			Allow from all
			</Directory>
			ErrorLog ${APACHE_LOG_DIR}/error.log
			LogLevel warn
			CustomLog ${APACHE_LOG_DIR}/access.log combined
		</VirtualHost>

Save the file, then enter

		sudo a2ensite catalog
		
Restart apache to enable the catalog virtual host

		sudo service apache2 reload
Create the file config file

		sudo nano /var/www/catalog/catalog.wsgi
		
In it enter the following:
	
		#!/usr/bin/env python2
		
		import sys
		import logging
		logging.basicConfig(stream=sys.stderr)
		sys.path.insert(0,"/var/www/catalog/")

		from catalog import app as application
		application.secret_key = 'Add your secret key found in your main file here'
		
Finally restart apache again

		sudo service apache2 reload
		
##### Edit python files so client_secrets.json can be loaded in and the database can be loaded in

Change the line in catalog.py

		json.loads(open('client_secrets.json', 'r')
to

		json.loads(open(r'/var/www/catalog/catalogclient_secrets.json', 'r')
		
and this line

		engine = create_engine('sqlite:///catalogwebsite.db')
		
to

		engine = create_engine('postgresql://catalog:*CATALOG USER PASSWORD*@localhost/catalog')
		
next we need to change catalog.py to __init__.py

		sudo mv /var/www/catalog/catalog/catalog.py /var/www/catalog/catalog/__init__.py
		
and finally in catalog.py, change the following line

		oauth_flow = flow_from_clientsecrets('client_secrets.json', scope='')
to

		oauth_flow = flow_from_clientsecrets(r'/var/www/catalog/catalog/client_secrets.json', scope='')
		
In database_setup.py and data.py, change:

		engine = create_engine('sqlite:///catalogwebsite.db')
		
to

		engine = create_engine('postgresql://catalog:*CATALOG USER PASSWORD*@localhost/catalog')

##### Initialize and secure the database
Source: (Digital Ocean: How to Secure PostgreSQL on an Ubuntu VPS)[https://www.digitalocean.com/community/tutorials/how-to-secure-postgresql-on-an-ubuntu-vps]

	sudo apt-get install postgresql
	sudo su postgres
	psql
After entering those commands, your prompt should change, meaning you are in the postgresql shell. Enter in the following commands to create the database:
	
	CREATE USER catalog WITH PASSWORD *CATALOG USER PASSWORD*;
	ALTER USER catalog CREATEDB;
	CREATE DATABASE catalog WITH OWNER catalog;
Go into the database as postgres user:

	\c catalog
	REVOKE ALL ON SCHEMA public FROM public;
	GRANT ALL ON SCHEMA public TO catalog;
This gives rights to the database only to catalog user

	\q
	exit
Will return you back to the user shell. Finally, we need to ensure that no remote connections can occur to our database:

	sudo nano /etc/postgresql/9.5/main/pg_hba.conf
Check to make sure that only the following lines are uncommented:

	local   all             postgres                                peer
	local   all             all                                     peer
	host    all             all             127.0.0.1/32            md5
	host    all             all             ::1/128                 md5
and nothing else. We now have a functional database!

###### Run our initial python files
	
	sudo python database_setup.py
	sudo python data.py
and finally restart apache to install/update any changes!

	sudo service apache2 reload
The site is now live with the template information. Now we just have to fix the google sign-in button and we are complete
###### Configuring google oAuth login button

Go to [this link](https://console.developers.google.com/apis/credentials) and click on your API key used for this project. Under Authorized JavaScript origins put the DNS name of your server [which this website will tell you](https://whatismyipaddress.com/ip-hostname). Then put the same URL with the login path (ex: .....com/login) under Authorized redirect URIs and now OAuth will work!

Congrats. The server should be up and running smoothly. If you have any troubles along the way, view the error log (/var/log/apache2/error.log) for information to help you solve your problem.
