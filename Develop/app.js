const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

let team = [];



function createManager() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'role',
            choices: [
                'Manager',
                'Engineer',
                'Intern',
                'Quit',
            ]
        },
        {
            type: 'input',
            name: 'name',
            message: 'What is the employee name?',
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is the employee id?',
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is the employee email?',
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: 'What is the employee office number?',
        },
    ])
    .then(response => {
        const manager = new Manager(response.name, response.id, response.email, response.officeNumber);
        team.push(manager);
        console.log(manager, team);
        createTeamMember();
    })
}

function createEngineer() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the employee name?',
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is the employee id?',
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is the employee email?',
        },
        {
            type: 'input',
            name: 'github',
            message: 'What is the employee github account?',
        },
    ])
        .then(response => {
            const engineer = new Engineer(response.name, response.id, response.email, response.github);
            team.push(engineer);
            console.log(engineer, team);
            createTeamMember();
        })
}

function createIntern() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the employee name?',
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is the employee id?',
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is the employee email?',
        },
        {
            type: 'input',
            name: 'school',
            message: 'What is the employee school?',
        },
    ])
        .then(response => {
            const intern = new Intern(response.name, response.id, response.email, response.school);
            team.push(intern);
            console.log(intern, team);
            createTeamMember();
        })
}


function createTeamMember() {
    console.log('Profile created!')
    // switch(response.role) {
        // case "Engineer":
            // createEngineer()
            // break;
            // default:
                renderHTML()
    // }
}

function renderHTML() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFile(outputPath, render(team), err => {
        if (err) {
        throw(err);
    }
})
}

createManager();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

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
