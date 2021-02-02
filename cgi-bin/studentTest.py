#!G:/Python35/python.exe
import cgi, cgitb
import json
import sys
from singleGrader import graderStudent
import traceback
import uuid
import os

cgitb.enable()  # for troubleshooting

#the cgi library gets vars from html
data = cgi.FieldStorage()
#this is the actual output
print("Content-Type: text/html\n")
#print("The foo data is: " + data["foo"].value)
#print("<br />")
#print("The bar data is: " + str(data["bar"].value))
#j = json.loads(data["bar"].value)
#print("<br />")
if("bar" in data):
    j = json.loads(data["bar"].value)
    if("lat" in j and "lon" in j):
        print("The JSON VALUES" + str(j["lat"]) + str(j["lon"]))
    if("ansFiles" in j):
        #print("The JSON VALUES" + str(j["ansFiles"]) + str(j["studentFiles"]) + str(j["mMetrics"]) + str(j["tolerance"]))       
        #print(j["assName"])
        j["ansFiles"]=str(j["ansFiles"][0])
        j["studentFiles"]=str(j["studentFiles"][0])
        g = graderStudent(j)
        l = g.getPackage()
        #should just pass this back to js
        print("GRADES")
        if(j["mMetrics"][0]):
            print("Volume: ", l[0][0])
        if(j["mMetrics"][1]):
            print("Surface Area: ", l[0][1])
        if(j["mMetrics"][2]):
            print("Center of Gravity: ", l[0][2])
        if(j["mMetrics"][3]):
            print("Moment of Inertia: ", l[0][3])
        
#print("<br />")
#print("hi")
#print(data)
