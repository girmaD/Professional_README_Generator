const inquirer = require('inquirer');
const licenseOptions = require('./licenseOptions')



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

  module.exports = promptQuestions;
  