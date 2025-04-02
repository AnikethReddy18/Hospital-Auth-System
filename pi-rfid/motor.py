from time import sleep
import RPi.GPIO as GPIO

GPIO.setmode(GPIO.BOARD)
GPIO.setup(18, GPIO.OUT)
pwm = GPIO.PWM(18, 50)
pwm.start(0)
pwm.ChangeDutyCycle(5)  
sleep(0.5)  
pwm.ChangeDutyCycle(0)  
sleep(2)  
pwm.ChangeDutyCycle(10) 
sleep(0.5)
pwm.ChangeDutyCycle(0) 
GPIO.cleanup() 