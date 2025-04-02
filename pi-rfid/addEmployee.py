from dotenv import load_dotenv
import os
import requests
from Read import readID

load_dotenv()
url = os.getenv('url')
headers = {"Content-Type": "application/x-www-form-urlencoded"}
def getHeaders(token):
    return {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/x-www-form-urlencoded"
    }

def signup():
    name = os.getenv('name')
    password = os.getenv('password')
    data = {'name': name, 'password': password}
    response = requests.post(url+'/signup', data=data, headers=headers)
    
    if(response.status_code == 200):
        print("Signup Sucesss!")
    
    token = login()
    print('Login Success!')

def login():
    #name = input("Enter username: ")
    #password = input("Enter password: ")
    #data = {'name': name, 'password': password}
    data = {'name': 'aniketh', 'password': '123456'}
    response = requests.post(url+'/login', data=data, headers=headers)
    
    return response.json()['token']

def addEmployee():
    name = input("Enter Name:")
    email = input("Enter Email:")
    role = input("Enter Role: ")
    id = readID()

    data = {"name": name, "email": email, "role": role, "id": id}
    response = requests.post(url+'/employee', data=data,headers=getHeaders(token))
    if(response.status_code==200):
        print("Added Employee Succesfully!")



option = input("Login or Signup?(l/s)")

if(option == 'l'):
    global token
    token = login()
    print("Login Success!")
else:
    print("Signup")    
    signup()

addEmployee()


