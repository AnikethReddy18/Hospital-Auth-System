import RPi.GPIO as GPIO
from mfrc522 import SimpleMFRC522

reader = SimpleMFRC522()

option = input("Read or Write? (r/w)")

if(option == 'r'):
	id, text = reader.read()
	print(text)
else:	
	text = input("Enter New Data: ")
	print("Place your tag")
	reader.write(text)
	print("Done")

GPIO.cleanup()
