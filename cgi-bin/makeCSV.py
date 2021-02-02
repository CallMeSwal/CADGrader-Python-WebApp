#!G:/Python35/python.exe
import cgi, cgitb
import json
import sys
import traceback
from datetime import date
import csv
import random

cgitb.enable()  # for troubleshooting

#the cgi library gets vars from html
data = cgi.FieldStorage()
#this is the actual output
print("Content-Type: text/html\n")

if("bar" in data):
    #get data from module
    j = json.loads(data["bar"].value)
    tableArr = j["tableArr"]
    #define filename by date
    now=date.today()
    filename=str(now)+"_"+str(random.randint(1001, 9999))+".csv"
    fileURL="http://localhost:92/website_local/CSV_Files/"+filename
    f=open("../CSV_Files/"+filename, "w", newline="")
    c=csv.writer(f)
    c.writerows(tableArr)
    f.close()
    print(fileURL)
        
#print("<br />")
#print("hi")
#print(data)
