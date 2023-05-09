#!/bin/bash
apt install apache2
apt install libapache2-mod-wsgi-py3
apt install mongodb
mongo firstword --eval 'db.createCollection("Users"); db.createCollection("rate"); db.createCollection("models"); db.createCollection("Notification")'
pip install Flask
pip install pymongo
pip install Pillow
pip install Flask-Cors 
pip install flask-session
pip install tensorflow
npm install
npm run build
mv index.py /var/www/html
mv app.wsgi /var/www/html
mv build/* /var/www/html
mv 000-default.conf /etc/apache2/sites-available/000-default.conf
sudo service apache2 restart
