/*Author: Andrew McKernan
*Summary: This file takes a JSON file containing many CS Course objects. Each object can can contain anywhere from
*         1-3 different course components. This file converts the JSON objects into an HTML table and outputs that table
* CS-470 HW 1
*/
const coursesRaw= require('./courses_studentView_2223_ComputerScience.json');
const fs = require('fs');

//maps the JSON objects so that we can access nested objects, seen in lecture demo
const coursesArray = Object.keys(coursesRaw).sort().map(key => {
    coursesRaw[key]['key'] = key;
    return coursesRaw[key]
});

// Large string that formats the start of our html file
let outputString = "<!DOCTYPE html>" +
    "<html><style>" +
    "table { border-collapse: collapse; border: 3px solid black;}" +
    "td, th {border: 1px solid black; text-align: left;padding: 8px;}" +
    "</style>" +
    "<table>" +
    "<tr>" +
    "<th>Course</th>" +
    "<th>Title</th>" +
    "<th>Units</th>" +
    "<th>Section</th>" +
    "<th>Component</th>" +
    "<th>Instructor</th>" +
    "<th>Meeting Pattern</th>" +
    "<th>Start Time</th>" +
    "<th>End Time</th>" +
    "<th>Classroom</th>" +
    "</tr>";

//outer function for adding an entire course
function addCourse(course){
    outputString += "<tr>";
    addCell(course.subject + "-" + course.catalog, course.components.length + 1);
    addCell(course.course_title, course.components.length + 1);
    addCell(course.units, course.components.length + 1);
    course.components.forEach(element => addComponent(course, element));
    outputString += "</tr>";
}

//inner function for adding each component of course, like DIS, ACT, LAB, SUP
function addComponent(course, classPart){
    outputString += "<tr>";
    addCell(course[classPart].section,1);
    addCell(course[classPart].component,1);
    if(course[classPart].instructors[0].instructor_lName  !== null)
        addCell(course[classPart].instructors[0].instructor_lName + ", " + course[classPart].instructors[0].instructor_fName,1);
    else
        addCell(null);
    addCell(course[classPart].meeting_pattern[0].meeting_pattern,1);
    addCell(course[classPart].meeting_pattern[0].start_time,1);
    addCell(course[classPart].meeting_pattern[0].end_time,1);
    addCell(course[classPart].meeting_pattern[0].facility_name,1);
    outputString += "</tr>";
}

//atomic function for adding data of a single cell
function addCell(data,rowspan){
    if(data !== null)
        outputString += `<td rowspan = ${rowspan}>` + data + "</td>";
    else
        outputString += "<td></td>";
}

//adds each course in JSON file
coursesArray.forEach(element => addCourse(element));
//Adds closing code to HTML file
outputString += "</table></body></html>";

//writes all accumulated changes to html file
fs.appendFileSync(
    "out.html",
    outputString,
    { encoding: "utf8", flag: "w" });