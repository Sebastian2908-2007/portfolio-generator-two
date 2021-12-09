const inquirer = require('inquirer');

const fs = require('fs');
const generatePage = require('./src/page-template');



const promptUser = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name?',
      validate: nameInput => {
        if (nameInput) {
          return true;
        }else{
          console.log('Please enter your name!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'github',
      message: 'Enter your github username',
      validate: githubName => {
        if(githubName) {
          return true;
        }else{
          console.log("Please enter your username");
          return false;
        }
      }
    },
    {
      type: 'confirm',
      name: 'confirmAbout',
      message: 'would you like to enter some onformation about yourself for an "About" section?',
      default: true
    },
    {
      type: 'input',
      name: 'about',
      message: 'Provide some information about yourself',
      when: ({confirmAbout}) => {
        if(confirmAbout) {
          return true;
        }else {
          return false;
        }
      }
    }
  ])
} ;

const promptProject = portfolioData => {
  // If there's no 'projects' array property, create one
  if(!portfolioData.projects) {
    portfolioData.projects = []; 
  }
  
  console.log(`
  ==================================
  Add New Project
  ==================================
  `);
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of your project?',
      validate: projectName => {
        if(projectName) {
          return true;
        }else {
          console.log('you must provide your projects name!');
        }
      }
    },
    {
      type: 'input',
      name: 'description',
      message: 'Provide a description of the project (Required)',
      validate: description => {
        if (description) {
          return true;
        }else{
          console.log('You must provide a description');
          return false;
        }
      }
    },
    {
      type: 'checkbox',
      name: 'languages',
      message: 'What did you build this project with? (Check all that apply)',
      choices: ['JavaScript', 'HTML','CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
    },
    {
      type: 'input',
      name: 'link',
      message: 'Enter the Github link to your project. (Required)',
      validate: link => {
        if(link) {
          return true;
        }else {
          console.log('Provide a project link please!');
          return false;
        }
      }
    },
    {
     type:'confirm',
     name: 'feature',
     message: 'Would you like to feature this project?',
     default: false 
    },
    {
      type: 'confirm',
      name: 'confirmAddProject',
      message: 'Would you like to enter another project?',
      default: false
    }
  ]).then(projectData => {
    portfolioData.projects.push(projectData);
    if(projectData.confirmAddProject)  {
      return promptProject(portfolioData);
    }else{
      return portfolioData;
    }
  });
};




promptUser()
.then(promptProject)
.then(portfolioData => {
  const pageHTML = generatePage(portfolioData);

  fs.writeFile('index.html', pageHTML, err => {
     if (err) throw err;
   });
})





