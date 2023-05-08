from flask import Flask, session, request, jsonify
from flask_session import Session
from flask_cors import CORS
import pymongo
import secrets
import random
import string
import hashlib
import os
from bson.objectid import ObjectId
import time
import base64
import calendar
import io
import numpy as np
from tensorflow.keras.preprocessing import image
import tensorflow as tf
import glob
import json
from PIL import Image, ImageFile
ImageFile.LOAD_TRUNCATED_IMAGES = True

app = Flask(__name__)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['SESSION_COOKIE_SAMESITE'] = 'Strict'
app.config['SECRET_KEY'] = secrets.token_hex(16)
Session(app)
CORS(app)
user_login = {}


@app.route("/api/logout", methods=['POST'])
def logout():
    if request.method == 'POST':
        user_login.pop(app.config['SECRET_KEY'])
        os.system("rm "+app.config['SECRET_KEY'])


@app.route("/api/verify", methods=['POST'])
def verify():
    if request.method == 'POST':
        dbcnx = pymongo.MongoClient('mongodb://localhost:27017')
        db = dbcnx['firstword']
        collection = db.get_collection("Users")
        try:
            email = user_login[app.config['SECRET_KEY']]
            verify = list(collection.find({"email": email}))[0]['verify']
            if verify in [0, "0"]:
                if str(request.form['code']) != list(collection.find({"email": email}))[0]['verify_code']:
                    response = jsonify({'result': False})
                    response.headers.add('Access-Control-Allow-Origin', '*')
                    return response
                else:
                    collection.update_one({'email': email}, {'$set': {'verify': '1'}})
                    response=jsonify({'result': True})
                    response.headers.add('Access-Control-Allow-Origin', '*')
                    return response
            else:
                response=jsonify({'result': True})
                response.headers.add('Access-Control-Allow-Origin', '*')
                return response
        except Exception as e:
            pass

@ app.route("/api/isVerify", methods=['POST'])
def isVerify():
    if request.method == 'POST':
        dbcnx = pymongo.MongoClient('mongodb://localhost:27017')
        db = dbcnx['firstword']
        collection = db.get_collection("Users")
        try:
            email = user_login[app.config['SECRET_KEY']]
            verify = list(collection.find({"email": email}))[0]['verify']
            if verify in [1, '1']:
                response = jsonify({'result': True})
                response.headers.add('Access-Control-Allow-Origin', '*')
                return response
            else:
                response = jsonify({'result': False})
                response.headers.add('Access-Control-Allow-Origin', '*')
                return response
        except Exception as e:
            response = jsonify({'result': False})
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response


@ app.route("/api/login", methods=['POST'])
def login():
    if request.method == 'POST':
        dbcnx=pymongo.MongoClient('mongodb://localhost:27017')
        db=dbcnx['firstword']
        collection=db.get_collection("Users")
        usrIn=list(collection.find({"email": str(
            request.form['email']), "password": str(request.form['password'])}))
        if len(usrIn) == 1:
            user_login[app.config['SECRET_KEY']]=str(request.form['email'])
            response=jsonify({'result': True})
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response
        else:
            response=jsonify({'result': False})
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response

@ app.route("/api/check_login", methods=['POST'])
def check_login():
    if request.method == 'POST':
        try:
            if app.config['SECRET_KEY'] in user_login:
                response=jsonify({'result': True})
                response.headers.add('Access-Control-Allow-Origin', '*')
                return response
            else:
                response=jsonify({'result': False})
                response.headers.add('Access-Control-Allow-Origin', '*')
                return response
        except:
            response=jsonify({'result': False})
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response



@ app.route("/api/signup", methods=['POST'])
def signup():
    if request.method == 'POST':
        dbcnx = pymongo.MongoClient("mongodb://localhost:27017")
        db = dbcnx['firstword']
        collection = db.get_collection("Users")
        usr = list(collection.find({"email": str(request.form['email'])}))
        if len(usr) == 0:
            user_login[app.config['SECRET_KEY']] = request.form['email']
            code = str(random.randrange(111111, 999999, 6))
            collection.insert_one(
                {   'email': str(request.form['email']),
                    "fname":str(request.form['fname']),
                    "password": str(request.form['password']),
                    "type": str(request.form['type']),
                    "verify": 0,
                    "verify_code": code})
            response = jsonify({'result': True, 'verify_code': code, 'email': request.form['email']})
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response
        else:
            response = jsonify({'result': False})
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response
 
@ app.route("/api/forgot", methods=['POST'])
def forgot():
    if request.method == 'POST':
        dbcnx = pymongo.MongoClient("mongodb://localhost:27017")
        db = dbcnx['firstword']
        collection = db.get_collection("Users")
        usr = list(collection.find({"email": str(request.form['email'])}))
        password = str(''.join(random.choices(string.ascii_uppercase + string.digits, k = 8)))
        if len(usr) == 1:
            collection.update_one({'email': str(request.form['email'])},{'$set': {"password": hashlib.md5(password.encode()).hexdigest()}})
            response = jsonify({'result': True, 'new_password': password, 'email': request.form['email']})
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response
        else:
            response = jsonify({'result': False})
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response 
@ app.route("/api/isDeveloper", methods=['POST'])
def isDeveloper():
    if request.method == 'POST':
        dbcnx = pymongo.MongoClient('mongodb://localhost:27017')
        db = dbcnx['firstword']
        collection = db.get_collection("Users")
        try:
            email = user_login[app.config['SECRET_KEY']]
            typee = list(collection.find({"email": email}))[0]['type']
            if typee == "developer":
                response = jsonify({'result': True})
                response.headers.add('Access-Control-Allow-Origin', '*')
                return response
            else:
                response = jsonify({'result': False})
                response.headers.add('Access-Control-Allow-Origin', '*')
                return response
        except Exception as e:
            response = jsonify({'result': False})
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response

@ app.route("/api/rate", methods=['POST'])
def rate():
    if request.method == 'POST':
        like = dislike = 0
        dbcnx = pymongo.MongoClient("mongodb://localhost:27017")
        db = dbcnx['firstword']
        collection = db.get_collection("rate")
        email = user_login[app.config['SECRET_KEY']]
        aux = list(collection.find({"email": email}))
        print(request.form['dislike']+" like="+request.form['like'])
        if len(aux) != 0:
            if int(aux[0]['like']) == 1 and int(request.form['dislike']) == 1 :
                like = 0
                dislike = 1
            elif int(aux[0]['like']) == 0 and int(request.form['like']) == 1 :
                like = 1
                dislike = 0
            elif int(aux[0]['dislike']) == 1 and int(request.form['like']) == 1 :
                like = 1
                dislike = 0
            elif int(aux[0]['dislike']) == 0 and int(request.form['like']) == 1 :
                like = 0
                dislike = 1
            collection.update_one({'email': email, 'idModel':str(request.form['idModel'])},{'$set': {"like": like, "dislike": dislike}})
            all_like = len(list(collection.find({"like":1})))
            all_dislike = len(list(collection.find({"dislike":1})))
            usr = db.get_collection("Users")
            doc = list(usr.find({"email": user_login[app.config['SECRET_KEY']]}))
            fname = doc[0]["fname"]
            notify = db.get_collection("Notifications")
            aux = list(collection.find({'_id': ObjectId(str(request.form['idModel']))}))
            emailDev = aux[0]["developedBy"]
            notify.insert_one({"emailDev": emailDev, "notify":fname+" was rate your AI model", "time":time.strftime("%d/%m/%Y, %H:%M:%S")})
            response = jsonify({'result': True, 'like': all_like, 'dislike': all_dislike})
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response
        else:
            collection.insert_one({ 'email': email,
                    'like':str(request.form['like']),
                    'dislike': str(request.form['dislike']),
                    'idModel': str(request.form['idModel'])})
            response = jsonify({'result': True, 'like': (all_like + int(request.form['like'])), 'dislike': (like + int(request.form['dislike']))})
            aux = list(collection.find({'_id': ObjectId(str(request.form['idModel']))}))
            emailDev = aux[0]["developedBy"]
            notify.insert_one({"emailDev": emailDev, "notify":fname+" was rate your AI model", "time":time.strftime("%d/%m/%Y, %H:%M:%S")})
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response
            

@ app.route("/api/getModels", methods=['POST'])
def getModels():
    if request.method == 'POST':
        dbcnx = pymongo.MongoClient("mongodb://localhost:27017")
        db = dbcnx['firstword']
        collection = db.get_collection("models")
        aux = list(collection.find({}))
        response = jsonify({'result': True, 'content': str(aux)})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response      

@ app.route("/api/getRate", methods=['POST'])
def getRate():
    if request.method == 'POST':
        dbcnx = pymongo.MongoClient("mongodb://localhost:27017")
        db = dbcnx['firstword']
        collection = db.get_collection("rate")
        email = user_login[app.config['SECRET_KEY']]
        aux = list(collection.find({'email': email, 'idModel':str(request.form['idModel'])}))
        if len(aux) > 0 :
            aux = aux[0]
            all_like = len(list(collection.find({"like":1})))
            all_dislike = len(list(collection.find({"dislike":1})))            
            response = jsonify({'result': True, 'content': list(aux.keys())[list(aux.values()).index(1)], 'like':all_like ,'dislike':all_dislike})
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response                
        else :
            aux = list(collection.find({'idModel':str(request.form['idModel'])}))
            if len(aux) > 0:
                all_like = len(list(collection.find({"like":1})))
                all_dislike = len(list(collection.find({"dislike":1})))   
                response = jsonify({'result': True, 'content':'none', 'like':all_like, 'dislike':all_dislike})
                response.headers.add('Access-Control-Allow-Origin', '*')
                return response
            else:
                response = jsonify({'result': False})
                response.headers.add('Access-Control-Allow-Origin', '*')
                return response

@ app.route("/api/getfeedback", methods=['POST'])
def getfeedback():
    if request.method == 'POST':
        dbcnx = pymongo.MongoClient("mongodb://localhost:27017")
        db = dbcnx['firstword']
        collection = db.get_collection("models")
        aux = list(collection.find({'_id': ObjectId(str(request.form['idModel']))}))
        if len(aux) > 0 :
            response = jsonify({'result': True, 'content': str(aux)})
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response                
        else :
            response = jsonify({'result': False})
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response

@ app.route("/api/addfeedback", methods=['POST'])
def addfeedback():
    if request.method == 'POST':
        dbcnx = pymongo.MongoClient("mongodb://localhost:27017")
        db = dbcnx['firstword']
        usr = db.get_collection("Users")
        doc = list(usr.find({"email": user_login[app.config['SECRET_KEY']]}))
        fname = doc[0]["fname"]
        collection = db.get_collection("models")
        aux = list(collection.find({'_id': ObjectId(str(request.form['idModel']))}))
        emailDev = aux[0]["developedBy"]
        aux = aux[0]["feedback"]
        aux.append({'fullname':fname,'comment':str(request.form['comment'])})
        collection.update_one({'_id': ObjectId(str(request.form['idModel']))},{'$set': {"feedback": aux}})
        notify = db.get_collection("Notifications")
        notify.insert_one({"emailDev":emailDev,"notify":fname+" was comment your AI model","time":time.strftime("%d/%m/%Y, %H:%M:%S")})
        response = jsonify({'result': True})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response                

@ app.route("/api/ismymodel", methods=['POST'])
def ismymodel():
    if request.method == 'POST':
        dbcnx = pymongo.MongoClient("mongodb://localhost:27017")
        db = dbcnx['firstword']
        collection = db.get_collection("models")
        email = user_login[app.config['SECRET_KEY']]
        aux = list(collection.find({"developedBy": email}))
        if len(aux) > 0 :
            response = jsonify({'result': True})
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response  
        else :
            response = jsonify({'result': False})
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response
        
@ app.route("/api/getnotification", methods=['POST'])
def getnotification():
    if request.method == 'POST':
        dbcnx = pymongo.MongoClient("mongodb://localhost:27017")
        db = dbcnx['firstword']
        collection = db.get_collection("Notifications")
        aux = list(collection.find({'emailDev': user_login[app.config['SECRET_KEY']]}))
        if len(aux) > 0 :
            response = jsonify({'result': True, 'content': str(aux)})
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response  
        else :
            response = jsonify({'result': False, 'content':'none'})
            response.headers.add('Access-Control-Allow-Origin', '*')
            return respnse


@ app.route("/api/checkpsd", methods=['POST'])
def checkpsd():
    if request.method == 'POST':
        dbcnx=pymongo.MongoClient('mongodb://localhost:27017')
        db=dbcnx['firstword']
        collection=db.get_collection("Users")
        usrIn=list(collection.find({"email": str(
            user_login[app.config['SECRET_KEY']]), "password": str(request.form['psd'])}))
        if len(usrIn) == 1:
            collection.update_one({'email': user_login[app.config['SECRET_KEY']]}, {'$set': {'password': str(request.form['newpsd'])}})
            response=jsonify({'result': True})
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response
        else:
            response=jsonify({'result': False})
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response       

@ app.route("/api/deletemodel", methods=['POST'])
def deletemodel():
    if request.method == 'POST':
        dbcnx=pymongo.MongoClient('mongodb://localhost:27017')
        db=dbcnx['firstword']
        collection=db.get_collection("models")
        filepath = list(collection.find({'_id':ObjectId(str(request.form['idModel']))}))
        filepath = filepath[0]['filepath']
        collection.delete_one({'_id':ObjectId(str(request.form['idModel']))})
        os.system('rm '+filepath)
        response=jsonify({'result': True})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

@ app.route("/api/upload", methods=['POST'])
def upload():
    if request.method == 'POST':
        dbcnx=pymongo.MongoClient('mongodb://localhost:27017')
        db=dbcnx['firstword']
        collection=db.get_collection("models")
        b64 = str(request.form['file'])
        b64 = b64[b64.index(',')+1:].encode()
        filename = "./models/"+str(calendar.timegm(time.gmtime()))+'.h5'
        file_result = open(filename, 'wb')
        file_result.write(base64.b64decode(b64))
        collection.insert_one({"description":str(request.form['description']),'target':str(request.form['target']),'filepath':filename, 'developedBy': user_login[app.config['SECRET_KEY']] ,'feedback':[]})
        response=jsonify({'result': True})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

@ app.route("/api/predict", methods=['POST'])
def predict():
    if request.method == 'POST':
        try:
            b64 = str(request.form['img'])
            b64 = b64[b64.index(',')+1:].encode()
            file = io.BytesIO()
            file.write(base64.b64decode(b64))
            file.seek(0)
            img = image.load_img(file, target_size=(256, 256))
            img_array = image.img_to_array(img)
            img_array = np.expand_dims(img_array, axis=0)
            img_array /= 255.
            models = glob.glob("./models/*")
            best_model = ""
            predicted_class = None
            for model in models:
                modele = tf.keras.models.load_model(model)
                predictions = modele.predict(img_array)
                current_predicted_class = np.argmax(predictions[0])
                if predicted_class is None or predictions[0][predicted_class] < predictions[0][current_predicted_class]:
                    predicted_class = current_predicted_class
                    best_model = model
            best_model = best_model.replace('\\','/')
            dbcnx = pymongo.MongoClient('mongodb://localhost:27017')
            db = dbcnx['firstword']
            collection = db.get_collection("models")
            res = list(collection.find({"filepath":best_model}))
            if len(res) > 0 :
                response = jsonify({'result': True, 'content':str(res[0]['target'][str(predicted_class)])})
                response.headers.add('Access-Control-Allow-Origin', '*')
                return response
            else :
                response = jsonify({'result': True, 'content':'I dont know'})
                response.headers.add('Access-Control-Allow-Origin', '*')
                return response
        except Exception as e:
            print(e)
        response = jsonify({'result': True, 'content':'I dont know'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
     

if __name__ == "__main__":
    app.run(debug=True)
