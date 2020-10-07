const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

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
                break;
            case "My team is complete.":
                if (!employees.length) {
                    console.log ("You have to have at least one person on your team");
                    buildTeam();
                } else {
                    let myHtml = render(employees);
                    fs.writeFile(outputPath, myHtml, function(err) {
                        if (err) throw err;
                        console.log("File successfully written");
                    })
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
        employees.push(newManager);
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
        employees.push(newEngineer);
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
        newIntern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
        employees.push(newIntern);
        console.log(`Intern ${newIntern.name} has joined the team!`);
        buildTeam();
    })
};

buildTeam();

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.
