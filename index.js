// require needed modules to be able to build this app
const fs = require("fs");
const util = require('util');

// require local module
const promptQuestions = require('./promptQuestions');
const licenseOptions = require('./licenseOptions')
//apply promisify method of util module to meke writeFile to return a promise
const writeFileAsync = util.promisify(fs.writeFile);

//A function declaration to generate important sections of README.md file
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
// Call promptQuestions function
  promptQuestions()
  // if the promise works out, create the readme file
  .then((answers) =>{
       writeFileAsync('README.md', generateREADME(answers))
      //  console.log(answers)       
  })
  //If the promise works out, show in the console that README.md is created
  .then(() => {
      console.log('Successfully created a README.md file')     
  })     
  //If the promise didnot work out, console the error
  .catch((err) => console.error(err));