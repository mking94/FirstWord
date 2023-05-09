# FirstWord:
FirstWord is a unique educational platform that utilizes artificial intelligence to help children identify objects and improve their language and cognitive skills.
# Usage:
  ## Deploy with apache:
```
git clone https://github.com/mking94/FirstWord.git
cd FirstWord
./setup.sh
```
  ## Run without apache:
```
git clone https://github.com/mking94/FirstWord.git
cd FirstWord
```
```
pip install Flask
pip install pymongo
pip install Pillow
pip install Flask-Cors 
pip install flask-session
pip install tensorflow
```
```
apt install mongodb
mongo firstword --eval 'db.createCollection("Users"); db.createCollection("rate"); db.createCollection("models"); db.createCollection("Notification")'
```
```
python index.py //To run server
```
```
npm install
npm start
```
# Technologies:
  ♦ ReactJS
 
  ♦ Flask
  
  ♦ MongoDB
# Dependencies:

| Library    | Version |
| ---------- | ------- |
| Python     | 3.7.3   |
| Flask      | 1.0.2   |
| Apache     | 2.4.41  |

# Demo:
A fully functional demo is available at [Holberton school sandbox](http://6e51c3252094.ae068b5a.hbtn-cod.io/)
# License: 
This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
# Associated:
This project is associated with <a href="www.holbertonschool.com"><img src="https://www.entreprises-magazine.com/wp-content/uploads/2020/05/Holberton-School.jpg" style="width:105px;margin-top:5px" alt="Holberton School logo"> </a>
# Authors:
  * [Maher Ben Dada](https://github.com/mking94)
