#!G:/Python35/python.exe
#import libraries
import sys
from grader import grader
import MySQLdb
import traceback
import uuid
import json
import shutil
import os

markingData=""

#get data
for line in sys.stdin:
    markingData+=line

#merge this into grader
j = json.loads(markingData)
date = j["markingDate"]
ansFiles = j["ansFiles"]
'''
studentFiles = j["studentFiles"]
assName = j["assName"]
'''

#get grades package
g = grader(markingData)
l = g.getPackage()

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
