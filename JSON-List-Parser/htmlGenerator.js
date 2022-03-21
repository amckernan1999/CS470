const coursesRaw= require('./courses_studentView_2223_ComputerScience.json');
//file system allows us to write to out.html
const fs = require('fs');

var outputString = "<!DOCTYPE html>\n" +
    "<html>\n" +
    "<head>\n" +
    "<style>\n" +
    "table {\n" +
    "  font-family: arial, sans-serif;\n" +
    "  border-collapse: collapse;\n" +
    "  width: 100%;\n" +
    "}\n" +
    "\n" +
    "td, th {\n" +
    "  border: 1px solid #dddddd;\n" +
    "  text-align: left;\n" +
    "  padding: 8px;\n" +
    "}\n" +
    "\n" +
    "tr:nth-child(even) {\n" +
    "  background-color: #dddddd;\n" +
    "}\n" +
    "</style>\n" +
    "</head>\n" +
    "<body>\n" +
    "<table>\n" +
    "<tr>\n" +
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
   "</tr>"
;

const courseKeys = Object.keys(coursesRaw);


for ( let i = 0; i < courseKeys.length; i++)
{
   let courseObj = JSON.parse(JSON.stringify(coursesRaw[courseKeys[i]]));
   let courseObjKeys = Object.keys(courseObj);

   outputString += "<tr>\n";
   outputString += "<td rowspan=" + (courseObjKeys.length - 13) + ">" + courseKeys[i] + "</td>";


   //Basic attributes of all classes
   outputString += "<td rowspan=" + (courseObjKeys.length - 13)  + courseObj.course_title  + "</td>";
   outputString += "<td rowspan=" + (courseObjKeys.length - 13) +  courseObj.units + "</td>";


   for ( let j = 0; j < courseObjKeys.length; j++)
   {
      if(courseObjKeys[i] === "DIS" || courseObjKeys[i] === "ACT" || courseObjKeys[i] === "SUP")
      {

         let componentObj = JSON.parse(JSON.stringify(courseObj[courseObjKeys[j]]));
         let instructorObj =  JSON.parse(JSON.stringify(componentObj[instructors]));
         outputString += "<tr>td>" + componentObj.section + "</trtd>";
         outputString += "<td>" + componentObj.component + "</td>";
         outputString += "<td>" + instructorObj.instructor_lName + ", " + instructorObj.instructor_fName  + "</td>";
         outputString += "<td>" + componentObj.section + "</td>";
         outputString += "<td>" + componentObj.section + "</td></tr>";

      }
   }

   outputString += "</tr>";
}

outputString += "</table>" +
    "</body>" +
    "</html>";

fs.appendFileSync(
    "out.html",
    outputString,
    { encoding: "utf8", flag: "w" });