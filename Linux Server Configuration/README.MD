# Linux Server Configuration

### Security

##### Installing linux updates

		sudo apt-get update
		sudo apt-get upgrade

##### Secure SSH
 
	        sudo nano /etc/ssh/sshd_config
		
Change the line:
	
		Port 20
to

		Port 2200

Change the line:

		PermitRootLogin yes
to

		PermitRootLogin no
		
Then, save the file and restart ssh

		sudo service ssh restart

##### Configuring the UFW firewall
 
 		sudo ufw allow 2200/tcp
		sudo ufw allow ntp
		sudo ufw enable
		
### Create and connect grader account for project reviewer

##### Creating the grader account and giving it sudo powers

		adduser grader
		sudo nano /etc/sudoers.d/grader
		
   This will open up a file that links back to sudoers.
   
   		grader ALL=(ALL) NOPASSWD:ALL
		
   Save this file and now the grader account will have sudo powers!

##### Allowing grader SSH access
On a local machine, enter the following command:
		
		ssh-keygen
When asked for what to call the keys, save a file in:

		~/.ssh/grader
		
Keep the public key accessible (grader.pub), and connect using the original account, and enter in the following commands:
		
		sudo nano /home/grader/.ssh/authorized_keys
Paste your public key into this file and save it.		

###### Adding security to the .ssh directory and authorized_keys file
After creating the authorized_keys file, enter in the following commands:

		sudo chmod 700 .ssh
		sudo chmod 644 .ssh/authorized_keys
These secure the directory and file so no unauthorized personel can access them.

###### Logging in using the grader account
Now connect to the grader account for the rest of the configuration:

		ssh grader@54.186.59.227 -p 2200 -i ~/.ssh/grader
and now you're connected to the grader account via SSH!

##### Configuring the timezone and install NTP.

		sudo dpkg-reconfigure tzdata
Select UTC for the timezone.
 
 		sudo apt-get install ntp
NTP helps keep the server's time sychronized.

##### Installing server packages to run the application
 
 		sudo apt-get install apache2
vist your server through a browser and check to make sure that you see the Apache2 default page that has text that says: "It works!"


Next install WSGI to extend the functionality of Apache.

		sudo apt-get install libapache2-mod-wsgi
Now Apache needs to be restarted to support WSGI.

		sudo service apache2 restart

##### Install Git and downloading the catalog project and necessary packages
 
		sudo apt-get install git
		sudo git clone https://github.com/MrJustPeachy/FSND.git
		sudo apt-get install python-pip
		sudo pip install psycopg2 flask sqlalchemy httplib2 json oauth2client
		
