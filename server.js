const mysql = require('mysql');
const inquirer = require('inquirer');
//const { CreateMethodProperty } = require('es-abstract/es2018');

const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Be sure to update with your own MySQL password!
  password: 'Zuha329a',
  database: 'employees',
});

connection.connect((err) => {
  if (err) throw err;
  runSearch();
});

const runSearch = () => {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'View all employees' ,
        'add departments,roles, employees',
        'Update-employee-role',
        'Update-employee-by-manager',
        'Delete-employee',
        'View-total-department-budget'
        
      ]
    })
    .then((answer) => {
      switch (answer.action) {
        
        case 'View all employees':

          viewallEmployees();
          
          break;
          case 'add departments,roles, employees':
            addDeptRolesEmployee();
           
            break;
        case 'Update-employee-role':
          updateEmployeeRole();
          break;

        case 'Update-employee-by-manager':
          updateEmployManager();
          break;

        case 'Delete-employee':
          deleteEmployee();
          break;
        case 'View-total-department-budget':
          viewTotalDeptBudget();
          break;

        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
         
      }
    });
};

   // DIDPLAY ALL EMPLOYEES       
  const viewallEmployees= () => {

  inquirer
  .prompt({
   name: 'Employees',
    type: 'input',
    message: 'View all Employees ',
  })
  .then((answer) => {
    const query = 'SELECT * FROM employees.employee';
    connection.query(query,  (err, res) => {
      
        if (err) throw error;
       

        console.table(res)
        runSearch();

  });
 
})

};
//Add New Employee

 const addDeptRolesEmployee = ()=> {
  inquirer
    .prompt([
      {
        type:'input',
        name: 'first_name',
        message: 'Enter First Name'
     },
     {
         type:'input',
         name: 'last_name',
         message: 'Enter Last Name'
      },

      {
         type:'input',
         name: 'role_id',
         message: 'Enter Role id'
      },
      {
         type:'input',
         name: 'manager_id',
         message: 'Enter Manger id'
      },
    ])
     .then((answers) => {
      console.log(answers);
      connection.query ("INSERT INTO employee SET ?",{
            
     first_name: answers.first_name,
     last_name: answers.last_name,
     role_id: answers.role_id,
     manager_id: answers.manager_id
      }, function (error) {
          if (error) throw error;
          console.log("added employee");
          runSearch();
      })
  })
}

//DELETE AN EMPLOYEE
const deleteEmployee= () => {
   
  inquirer
  .prompt([
  {
    type:'input',
    name: 'id',
    message: 'Enter Employee id'
 },
 
  
])
.then((answers) => {
  console.log(answers);
  connection.query ("DELETE FROM employee WHERE  ?",{
        
 id: answers.id
 
  }, function (error) {
      if (error) throw error;
      console.log("Deleted employee WHERE ?" );
      runSearch();
  })
})
} 

//UPDATE AN EMPLOYEE ROLE
const updateEmployeeRole= () => {
   
  inquirer
  .prompt([
  {
    
    type:'input',
    name: 'role_id',
    message: 'Enter new role_id '
 },
{
 type:'input',
    name: 'id',
    message: 'Enter Employee id'
 },
  
])
.then((answers) => {
  console.log(answers);
  connection.query ("UPDATE employees.employee  ?  ",
  {
   
     role_id:answers.role_id,
     id: answers.id
  },
       function (error) {
      if (error) throw error;
      console.log("Employee Role is updated" );
      runSearch();
  })
})
} 
 
