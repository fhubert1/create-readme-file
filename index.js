const fs = require('fs');
const inquirer = require('inquirer');
const prompt = inquirer.createPromptModule();
const fileName = 'README.md';

const generateReadME = ({title, description, installation, usage, contributor, testing, license, username, email}) => {
    return `    
    # ${title}

    ## Description

    ${description}

    ## Table of Contents
       - [Installation](#installation)
       - [Usage](#usage)
       - [Credits](#credits)
       - [License](#license)
       - [Contributing](#contributing)
       - [Tests](#tests)
       - [Questions](#questions)


    ## Installation
    ${installation}

    ## Usage
    ${usage}

    ## Credits
    

    ## License
    ${license}

    ## Contributing
    ${contributor}

    ## Tests
    ${testing}

    ## Questions
    [Contact Me](mailto:${email})
    [Git](https://github.com/${username})
    `
}


const questions = [
    {
        type: 'input',
        message: 'What is name of the project?',
        name: 'title',
        // convert to camel case 
        filter: function(input) {
            return input.replace(/\b\w/g, function(char){
                return char.toUpperCase();
            });
        }
      },
      {
        type: 'input',
        message: 'Describe the project.',
        name: 'description',
      },
      {
        type: 'input',
        message: 'What are the installation instructions?',
        name: 'installation',
      },
      {
        type: 'input',
        message: 'Usage information',
        name: 'usage',
      },
      {
        type: 'input',
        message: 'Contribution guidelines',
        name: 'contributor',
      },
      {
        type: 'input',
        message: 'Testing instructions',
        name: 'testing',
      },  
      {
        type: 'list',
        message: 'Choose a license for your project',
        name: 'license',
        choices: [
            'MIT License',
            'GNU General Public License (GPL)',
            'Apache License 2.0',
            'ISC License',
            'Mozilla Public License 2.0 (MPL 2.0)',
            'Creative Common Licenses',
            'Unlicense'
        ]
      },  
      {
        type: 'input',
        message: 'What is your GIT username?',
        name: 'username',
      },       
      {
        type: 'input',
        message: 'What is your email address?',
        name: 'email',
        validate: function(input) {
            // use basic regex validation of email address
            const pass = input.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
            if (pass) {
                return true;
            } else {
                return 'Invalid email address! Please enter a valid email address.'
            }
        }
      },       

];

prompt(questions) 
  .then((responses) =>{
    //console.log(generateReadME(responses));
    fs.writeFile(fileName, generateReadME(responses), (err) => {
        if (err) {
            throw err;
        } else {
            console.log('Readme successfully written!');
        }
    });
  })
  .catch(error => {
    console.error('Error: ', error);
  });

