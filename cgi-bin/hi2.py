#!G:/Python35/python.exe
import sys
import json
import MySQLdb
import traceback
import uuid
import os

#from grader import grader

data = json.load(sys.stdin)
print("Content-Type: text/html\n")
print("")
print("The foo data is: " + str(data["assName"]))
print("<br />")
print("The foo data is: " + str(data["ansFiles"]))
print("<br />")
print("The foo data is: " + str(data["studentFiles"]))
print("<br />")
print("The foo data is: " + str(data["mMetrics"]))
print("<br />")
import imp
print("hiiii"+str(imp.find_module('numpy')))
import numpy
print("The foo data is: " + str(data["tolerance"]))
print("<br />")
print("The foo data is: " + str(data["markingDate"]))
print("<br />")
#import idna

'''
print("The bar data is: " + str(data["lon"]))
print("<br />")
print("The bar data is: " + str(data["can"]))
print("<br />")
'''
