#!/usr/bin/env python

import RPi.GPIO as GPIO
from mfrc522 import SimpleMFRC522

reader = SimpleMFRC522()

def readID():
    try:
        print("Place the tag")
        id, text = reader.read()
        return id
    finally:
        GPIO.cleanup()

