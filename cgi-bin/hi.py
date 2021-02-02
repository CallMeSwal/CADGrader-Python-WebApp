#!G:/Python35/python.exe

#import libraries
import cgi, cgitb
import sys
from grader import grader
import MySQLdb
import traceback
import uuid
import json
import shutil
import os

cgitb.enable()  # for troubleshooting

#the cgi library gets vars from html
data = cgi.FieldStorage()

#build dictionary
dataDict = {}
dataDict['assName'] = data["assName"].value
'''
dataDict['ansFiles'] = data["ansFiles"].value.split(',')
dataDict['studentFiles'] = data["studentFiles"].value.split(',')
dataDict['mMetrics'] = data["mMetrics"].value.split(',')
dataDict['tolerance'] = data["tolerance"].value.split(',')
'''
#date = data["markingDate"].value

#get grades package
#g = grader(dataDict)
#l = g.getPackage()


#json_data = json.dumps(dataDict)

#this is the actual output
print("Content-Type: text/html\n")

print("The foo data is: " + data["assName"].value)
print("<br />")
'''
print("The bar data is: " + data["tolerance"].value)
print("<br />")
'''
