const inquirer = require("inquirer");
const fs = require("fs");
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);

//Some of the common licenses for projects
const licenseOptions = {
  "MIT": "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)",
  "Apache": "[![License](https://img.shields.io/badge/License-Apache%202.0-yellowgreen.svg)](https://opensource.org/licenses/Apache-2.0)",
  "GNU": "[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)",
  "BSD": "[![License](https://img.shields.io/badge/License-BSD%203--Clause-orange.svg)](https://opensource.org/licenses/BSD-3-Clause)",
  "Eclipse": "[![License](https://img.shields.io/badge/License-EPL%201.0-red.svg)](https://opensource.org/licenses/EPL-1.0)",  
  "None": "[![None License](https://img.shields.io/badge/License-None-lightgrey.svg)]"
};
const promptQuestions = () =>
  inquirer.prompt([
    {
      type: 'input',
      name: 'username',
      message: 'What is your gitHub username?',
    },
    {
      type: 'input',
      name: 'email',
      message: 'provide your email address for contact?',
      //taken from stack overflow (regex email)
      validate: function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      }
    },
    {
      type: 'input',
      name: 'title',
      message: 'What is the title of your project?',
    },    
    {
      type: 'input',
      name: 'repo',
      message: 'Please provide the url of the github repo for this project?'           
    },    
    {
      type: 'editor',
      name: 'description',
      message: 'Please provide a brief description of this project? You will write this description in a text editor - feel free to write as much as you can.',
    },   
    {
      type: 'input',
      name: 'installation',
      message: 'Please provide instruction on how to intall this app?'
    }, 
    {
      type: 'editor',
      name: 'how',
      message: 'Please provide a step by step guide on how to use this application? Make sure you write at least two lines to show the steps of usage!',
      //saw a sample validation from inquirer documentaion
      validate: text => {
        if (text.split('\n').length < 2) {
          return 'Please write at least 2 lines to show the steps of use.';
        }  
        return true;
      }
    },           
    {
      type: 'list',
      name: 'license',
      message: 'How do want to licese your application?',
      choices: Object.keys(licenseOptions)
    },
    {
      type: 'confirm',
      name: 'acceptContribution',
      message: 'Would you allow other developers to contribute to this project?'      
    },
    {
      type: 'input',
      name: 'contribution',
      message: 'Please provide guidelines on how to contribute to this app?',
      default: 'contact me on the email provided below',
      when:  answers =>  answers.acceptContribution
    },    
    {
      type: 'input',
      name: 'test',
      message: 'Please testing instructions?',
      default: 'No test specified'  
    }    
  ]);
  


const generateREADME = (answers) => 

`
# ${answers.title} 

${licenseOptions[answers.license]}

* View the [Github Repo](${answers.repo})


## Description
  ${answers.description}

## Table Of Contents 
* [Installation Instructions](#Installation-Instructions)
* [How To Use The App](#How-To-Use-The-App)
* [Contributing Guidelines](#Contributing-Guidelines)
* [Test Information](#Test-Information)
* [License](#License)
* [Questions](#Questions)


## Installation Instructions

 * ${answers.installation}

## How To Use The App
  ${answers.how}

## Contributing Guidelines
 * ${answers.contribution}

## Test Information
  * ${answers.test}

## License

 * ${answers.license}

## Questions

Should you have any questions about this project,
  * you can reach me through email: [${answers.email}](mailto:${answers.email}) 
  * or visit my [Github Profile](https://github.com/${answers.username}) for more information.

`;
  promptQuestions()
  .then((answers) =>{
       writeFileAsync('README.md', generateREADME(answers))
      //  console.log(answers)       
  })
  .then(() => {
      console.log('Successfully created a README.md file')     
  })     
  .catch((err) => console.error(err));