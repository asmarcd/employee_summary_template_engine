const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const team = [];

function buildTeam() {
    inquirer.prompt([
        {
            name: "choice",
            type: "list",
            message: "Who would you like to add to your team?",
            choices: ["Manager", "Engineer", "Intern", "My team is complete."]
        }
    ]).then(function ({ choice }) {
        switch (choice) {
            case "Manager":
                addManager();
                break;
            case "Engineer":
                addEngineer();
                break;
            case "Intern":
                addIntern();
            case "My team is complete.":
                if (!team.length) {
                    console.log ("You have to have at least one person on your team");
                    buildTeam();
                } else {
                    render(team);
                }
        }
    });
};

function addManager() {
    inquirer.prompt([
        {
            name: "managerName",
            type: "input",
            message: "What's the manager's name?",
        },
        {
            name: "managerId",
            type: "number",
            message: "What's the manager's ID Number?",
        },
        {
            name: "managerEmail",
            type: "input",
            message: "What's the manager's email address?",
        },
        {
            name: "managerOfficeNumber",
            type: "number",
            message: "What is the manager's office number?"
        }
    ]).then(answers => {
        newManager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
        team.push(newManager);
        console.log(`Manager ${newManager.name} has joined the team!`);
        buildTeam();
    });
};

function addEngineer() {
    inquirer.prompt([
        {
            name: "engineerName",
            type: "input",
            message: "What's the engineer's name?",
        },
        {
            name: "engineerId",
            type: "number",
            message: "What's the engineer's ID Number?",
        },
        {
            name: "engineerEmail",
            type: "input",
            message: "What's the engineer's email address?",
        },
        {
            name: "engineerGithub",
            type: "input",
            message: "What is the engineer's Github username?"
        }
    ]).then(answers => {
        newEngineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
        team.push(newEngineer);
        console.log(`Engineer ${newEngineer.name} has joined the team!`);
        buildTeam();
    });
};

function addIntern() {
    inquirer.prompt([
        {
            name: "internName",
            type: "input",
            message: "What's the intern's name?",
        },
        {
            name: "internId",
            type: "number",
            message: "What's the intern's ID Number?",
        },
        {
            name: "internEmail",
            type: "input",
            message: "What's the intern's email address?",
        },
        {
            name: "internSchool",
            type: "input",
            message: "What is the intern's School?"
        }
    ]).then(answers => {
        newIntern = new Intern(answers.InternName, answers.InternId, answers.InternEmail, answers.InternSchool);
        team.push(newIntern);
        console.log(`Intern ${newIntern.name} has joined the team!`);
        buildTeam();
    })
};

buildTeam();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
