from dotenv import load_dotenv
import os
from Read import readID
import requests
from time import sleep
import RPi.GPIO as GPIO

load_dotenv()
room_id = os.getenv('roomID')
name, password = os.getenv('name'), os.getenv('password')
url = os.getenv('url')

GPIO.setmode(GPIO.BOARD)
GPIO.setup(18, GPIO.OUT)
pwm = GPIO.PWM(18, 50)
pwm.start(0)

def open_doors():
    pwm.ChangeDutyCycle(5)  
    sleep(0.5)  
    pwm.ChangeDutyCycle(0)  
    sleep(2)  
    pwm.ChangeDutyCycle(10) 
    sleep(0.5)
    pwm.ChangeDutyCycle(0) 
    GPIO.cleanup()

token = requests.post(url+'/login', {'name': name, 'password': password}, headers={"Content-Type": "application/x-www-form-urlencoded"}).json()['token']
headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/x-www-form-urlencoded"   }

while True:
    id = readID()
    response = requests.post(url+"/log", {'employeeId': id, 'roomId': room_id}, headers=headers)
    if response.status_code == 200:
        print("Access Successful, door opening...")
        open_doors()
        sleep(2)
    else:
        print("Access Denied")
        sleep(5)


