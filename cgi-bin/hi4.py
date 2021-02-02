#!G:/Python35/python.exe
import sys
import json

data = json.load(sys.stdin)
#this is the actual output
print("Content-Type: text/html\n")
print("The foo data is: " + str(data["lat"]))
print("<br />")
print("The bar data is: " + str(data["lon"]))
print("<br />")
print(data)
