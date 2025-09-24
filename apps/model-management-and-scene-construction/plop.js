export default function (plop) {
  // create your generators here
  plop.setGenerator('basics', {
    description: 'this is a skeleton plopfile',
    // array of inquirer prompts
    prompts: [],
    // array of actions
    actions: [],
  });

  plop.setGenerator('controller', {
    description: 'application controller logic',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'controller name please',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/{{name}}.js',
        templateFile: 'plop-templates/controller.hbs',
      },
    ],
  });
}