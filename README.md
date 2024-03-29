# CADGrader - Web App that I independently designed, built, deployed to analyze CAD files.

## Demo: https://youtu.be/CFAUK3HcKwg, https://2018.pycon.ca/talks/talk-PC-55271/
[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/CFAUK3HcKwg/0.jpg)](https://www.youtube.com/watch?v=CFAUK3HcKwg)

Built with Python, JavaScript, Electron, NumPy, SQL, Three.js

### Motivation for Project
Like most other engineering schools, McMaster University has a first year computer aided design course. Generally, students enjoy this class because they get to 3D model interesting mechanisms. The course teaching assistants do not enjoy the class as much because they have to mark the students’ 3D models. Not only is the 3D model marking process extremely tedious, it is also incredibly boring.

To manually mark the 3D models, TAs have to open each student submission and visually compare the model to the answer file. Since this process is highly subjective, it leads to a high level of inconsistency among student grades.

### Implementation of Project
A year ago, I started developing a web application (CADGrader) that would solve these issues. CADGrader was successfully implemented at McMaster University during the 2017-2018 school year. Over 900 students, TAs, and faculty members used CADGrader over the course of two semesters. The engineering faculty renewed use of CADGrader for the upcoming school year.

I built the CADGrader website with three key objectives: dramatically reduce the time TAs spent marking assignments; decrease the discrepancy between student grades; integrate all assignment processing components(assignment marking, student feedback, student help, assignment file storage, etc) in one application.

The finished program is an online website that automatically marks CAD files. On the website, TAs can review marked assignments and ensure that the software graded each file correctly. Also, TAs can provide assignment feedback directly to the students via the website. Moreover, Students have access to an assignment checker on the website. Using the assignment checker, students can upload practice CAD assignments and receive a real time grade from the software.

### How CADGrader Works
Student assignments are uploaded directly to the CADGrader website. CADGrader objectively grades assignments by comparing each student file with the correct answer file. Using numpy-stl(a python library), CAGrader converts each 3D model into a 3D matrix. With numerical analysis, CADGrader measures the similarity between these different matrices and assigns a grade accordingly. After CADGrader marks each submission, the software distributes the assignments to the course TAs for review. Within the software, TAs can view each assignment and ensure that the files were marked correctly. The assignment viewer allows TAs to view a student file and answer file at the same time. TAs can send feedback to the student through this modal, as well. CADGrader automatically flags assignments that receive abnormally low marks. This prompts TAs to pay extra attention to these assignments.

On CADGrader, students have access to a Practice CAD tool. Students can upload completed CAD assignments to the tool and CADGrader instantly grades the assignment for the student. This feature allows students to practice CAD on their own time. The most common question that TAs receive from students is whether or not their CAD model is correct. The Practice CAD tool answers this question for students and frees up time for TAs. This allows TAs to focus on the students that need the most help in the course.

### Python and Software using in CADGrader
Python forms the cornerstone of CADGrader’s infrastructure. Numpy and numpy-stl are used extensively to analyze the CAD files. Additionally, python is used to make SQL queries. A large amount of the functionality on the CADGrader website is built with JavaScript. The website runs python code with AJAX calls and CGI scripts.

### Future of Project
At the beginning of this project, my intention was to build a software product that allowed the university to reduce TA hours. I later realized that humans and machines are best suited for different tasks. Software should handle grunt and menial tasks while humans work on the more intellectually challenging issues. By automating the boring stuff, the TAs’ jobs became much more enjoyable. I have personally seen TAs transition from begrudgingly filling out long Excel sheets to enthusiastically explaining course concepts to students.

This shift in thinking has drastically changed my future UX designs. I no longer see the software and TAs as competing entities. Instead, CADGrader has become a tool that allows teaching assistants to be more successful at their jobs."
