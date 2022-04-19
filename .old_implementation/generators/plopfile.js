
module.exports = (plop) => {
    plop.setGenerator('useCase', {
      description: 'Create a useCase',
      prompts: [
        {
          type: 'input',
          name: 'name',
          message: 'What is your useCase name?'
        }
      ],
      actions: [
        {
          type: 'add',
          path: '../{{pascalCase name}}UseCase.ts',
          templateFile: 'templates/UseCase.ts.hbs'
        },
        {
          type: 'add',
          path: '../{{pascalCase name}}Controller.ts',
          templateFile: 'templates/Controller.ts.hbs'
        },
      ]
    })
  }