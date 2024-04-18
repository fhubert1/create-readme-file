const fs = require('fs');
const inquirer = require('inquirer');
const prompt = inquirer.createPromptModule();
const fileName = 'README.md';

const licenseOptions = [
    {
        name: 'MIT License',
        badge: '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)',
        info: `## License\n\nThis project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.\n\n`
      },
      {
        name: 'GNU General Public License (GPL)',
        badge: '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)',
        info: `## License\n\nThis project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.\n\n`
      },
      {
        name: `Apache License 2.0`,
        badge: `[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)`,
        info: `## License\n\nThis project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.\n\n`
      },
      {
        name: `ISC License`,
        badge: `[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)`,
        info: `## License\n\nThis project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.\n\n`
      },
      {
        name: `Mozilla Public License (MPL) 2.0`,
        badge: `[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)`,
        info: `## License\n\nThis project is licensed under the Mozilla Public License (MPL) 2.0 - see the [LICENSE](LICENSE) file for details.\n\n`
      },
      {
        name: `Unlicense`,
        badge: `[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)`,
        info: `This is free and unencumbered software released into the public domain. For more information, please refer to <http://unlicense.org/>` 
      }

]


const generateReadME = ({title, description, installation, usage, contributor, testing, license, username, email}) => {
    const selectedLicense = licenseOptions.find(option => option.name === license);
    //console.log(selectedLicense);
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
    

${selectedLicense.info} \n

${selectedLicense.badge} \n

## Contributing
${contributor}

## Tests
${testing}

## Questions
[Contact Me](mailto:${email}) \r\n

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
        choices: licenseOptions.map(option => option.name)
        // [
        //     'MIT License',
        //     'GNU General Public License (GPL)',
        //     'Apache License 2.0',
        //     'ISC License',
        //     'Mozilla Public License 2.0 (MPL 2.0)',
        //     'Creative Common Licenses',
        //     'Unlicense'
        // ]
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
    // const selectedLicense = licenseOptions.find(option => option.name === responses.license);
    // console.log(selectedLicense);
    //console.log(responses);
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

