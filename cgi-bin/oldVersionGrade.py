#!G:/Python35/python.exe
import cgi, cgitb
import json
import sys
from grader import grader
import MySQLdb
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
print("<br />")
if("bar" in data):
    j = json.loads(data["bar"].value)
    if("lat" in j and "lon" in j):
        print("The JSON VALUES" + str(j["lat"]) + str(j["lon"]))
    if("assName" in j):
        print("The JSON VALUES" + str(j["assName"]) + str(j["markingDate"]) + str(j["ansFiles"]) + str(j["studentFiles"]) + str(j["mMetrics"]) + str(j["tolerance"]))       
        #print(j["assName"])
        g = grader(data["bar"].value)
        l = g.getPackage()
        date = str(j["markingDate"])
        # Open database connection
        db = MySQLdb.connect("localhost","root","","cadgrader" )

        # prepare a cursor object using cursor() method
        cursor = db.cursor()

        for ass in l:
            try:
               # Execute the SQL command
               sql = """INSERT INTO marking_data(Student_Number, Assignment_Name, Submission_File_Name, Answer_File_Name, Version, Vol_Mark, SA_Mark, CoG_Mark, MoI_Mark, Subjective_Mark, Total_Mark, Flag, Identifier, Marking_Date, Reasons_Flagged) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"""
               cursor.execute(sql, (ass[0], ass[1], ass[2], ass[3],  ass[5], ass[4][0], ass[4][1], ass[4][2], ass[4][3], ass[4][4], 30, ass[6], uuid.uuid4(), date, "None"))
               # Commit your changes in the database
               db.commit()
            except:
               traceback.print_exc()
               # Rollback in case there is any error
               db.rollback()
            #add column
            '''
            try:
                query = "ALTER TABLE student_marks ADD %s VARCHAR(40)" % (ass[1])
                cursor.execute( query )
                #cursor.execute("""ALTER TABLE student_marks ADD myColumn2 VARCHAR(40)""")
                db.commit()
            except:
               traceback.print_exc()
               # Rollback in case there is any error
               db.rollback()
            '''
        # disconnect from server
        db.close()
        
print("<br />")
print("hi")
#print(data)
