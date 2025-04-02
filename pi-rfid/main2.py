from dotenv import load_dotenv
import os
from Read import readID
import requests
from time import sleep
import subprocess

load_dotenv()
room_id = os.getenv('roomID')
name, password = os.getenv('name'), os.getenv('password')
url = os.getenv('url')


token = requests.post(url+'/login', {'name': name, 'password': password}, headers={"Content-Type": "application/x-www-form-urlencoded"}).json()['token']
headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/x-www-form-urlencoded"   }

while True:
    id = readID()
    response = requests.post(url+"/log", {'employeeId': id, 'roomId': room_id}, headers=headers)
    if response.status_code == 200:
        print("Access Successful, door opening...")
        result = subprocess.run(["python", "motor.py"])
        sleep(2)
    else:
        print("Access Denied")
        sleep(5)


