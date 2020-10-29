const inquirer = require("inquirer");
const fs = require("fs");
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);


const promptQuestions = () =>
  inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is the title of your project?',
    },
    {
      type: 'confirm',
      name: 'github',
      message: 'Do you have github repo for this project?'
    },
    {
      type: 'input',
      name: 'repo',
      message: 'Please provide the url of the github repo for this project?',
      when:  answers =>  answers.github      
    },
    {
      type: 'checkbox',
      name: 'table',
      message: 'What should your table of content include?',
      choices: [
        'Introduction', 
        'Objective', 
        'How-To-Use-The-App', 
        'Contact'
      ]
    },
    {
      type: 'editor',
      name: 'introduction',
      message: 'Please provide a brief introduction to this project?',
    },
    {
      type: 'editor',
      name: 'objective',
      message: 'What is the objective of this project?',
    },
    {
      type: 'editor',
      name: 'how',
      message: 'Please provide a step by step guide on how to use this application?',
    },
    {
      type: 'checkbox',
      name: 'technology',
      message: 'what technology do you use in this project?',
      choices: [
        'Node.js',
        'inquirer',
        'javaScript',
        'fs(File System'        
      ]
    },        
    {
      type: 'list',
      name: 'license',
      message: 'How do want to licese your application?',
      choices: [
        'MIT', 
        'Apache',         
        'other',
      ]
    },
    {
      type: 'input',
      name: 'contribution',
      message: 'Who else contributed for this project?',
      default: 'I alone can fix it'
    },
    {
        type: 'input',
        name: 'email',
        message: 'provide your email for contact?',
      },
  ]);
  


const generateREADME = (answers) => 

`
[![MIT License](https://img.shields.io/badge/License-${answers.license}-blue.svg)](https://opensource.org/licenses/MIT)


# ${answers.title}

* View the [Github Repo](${answers.repo})

## Table Of Contents 

* [Introduction](#Introduction)
* [Objective](#Objective)
* [How To Use The App](#How-To-Use-The-App)
* [Contact](Contact)

${answers.table.map(element => {
   return '* [' + element + ']' + '(#' + element + ') \r\n' 
})}

## Introduction

${answers.introduction}

## Objective

${answers.objective}

## How To Use The App

* ${answers.how}

## Technologies Used

${answers.technology}
${answers.askAgain}

## License

[![MIT License](https://img.shields.io/badge/License-${answers.license}-blue.svg)](https://opensource.org/licenses/MIT)

## Contact

Should you have any questions about this repo, contact me on [${answers.email}](mailto:${answers.email})

`;
  promptQuestions()
  .then((answers) =>{
       writeFileAsync('README.md', generateREADME(answers))
      //  console.log(answers)
    //    console.log(answers.table)
    //    console.log(answers.table.Introduction) 
  })
  .then(() => {
      console.log('Successfully wrote to README.md')     
  })     
  .catch((err) => console.error(err));