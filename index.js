// Get all the buttons

const newEmployeeBtn = document.getElementById("new-employee");
const doubleSalaryBtn = document.getElementById('double-salary');
const sortByHighestBtn = document.getElementById('sort-highest-paid');
const filterHalfMillionSalaryBtn = document.getElementById('filter-half-million-salary');
const yearlyBudgetBtn = document.getElementById('yearly-budget');

// Get data container

const dataContainer = document.getElementById('data-container');

// Get yearly budget container

const yearlyBudgetContainer = document.getElementById('yearly-budget-container');

// Initialize an array container for the api response/data

let data = [];

// Add events to the buttons

newEmployeeBtn.addEventListener('click', getNewEmployee);
doubleSalaryBtn.addEventListener('click', doubleSalary);
sortByHighestBtn.addEventListener('click', sortByHighestPaid);
filterHalfMillionSalaryBtn.addEventListener('click', filterHalfMillionSalary);
yearlyBudgetBtn.addEventListener('click', calculateYearlyBudget);

// Function to get new employee from the api

async function getNewEmployee() {
    const response = await fetch("https://randomuser.me/api");
    const data = await response.json();

    // Use destructuring
    const { name, email, picture } = data.results[0];

    // Generate a new employee object
    const newEmployee = {
        name: `${name.title} ${name.first} ${name.last}`,
        email: `${email}`,
        picture: `${picture.thumbnail}`,
        salary: Math.floor(Math.random() * 1000000), // new salary property (random number up to 1 million)

        // country: 'Rwanda',
    }

    // Call a function to add new employee to our data entry

    addEmployeeData(newEmployee);
}

// Function to add a new employee to our global data array

function addEmployeeData(object) {
    // Add the new object into the array
    data.push(object);

    // Call a function to update our DOM
    updateEmployeeInfo();
}

// Function to double the salary

function doubleSalary() {
    // Clone the object so that you can manipulate the salary

    // map method returns a new array

    data = data.map((employee) => {
        return { ...employee, salary: employee.salary * 2 }; // Overriding the salary
    });
    updateEmployeeInfo();
}

// Function to sort by highest paid

function sortByHighestPaid() {
    // sort current elements inside the data array

    data.sort((a, b) => b.salary - a.salary);
    updateEmployeeInfo();
}

// Function to salaries above $ 500,000

function filterHalfMillionSalary() {
    // Create a new array whose salary is greater than $ 500,000
    data = data.filter(employee => employee.salary > 500000);
    updateEmployeeInfo();
}

// Functionn to calculate yearly budget

function calculateYearlyBudget() {
    // reduce is an aggregator method and we begin at 0

    totalBudget = data.reduce((accumulator, employee) => accumulator + employee.salary, 0);

    // Get DOM to re-initialize the yearly budget container (This is to avoid append on multiple clicks)
    yearlyBudgetContainer.innerHTML = '';

    // Create new element to display in the above container
    const budgetHolder = document.createElement('h1');
    budgetHolder.classList.add('text-center', 'bg-green-300', 'font-bold', 'p-4');
    budgetHolder.innerHTML = `Yearly Budget: ${formatSalary(totalBudget)}`
    yearlyBudgetContainer.appendChild(budgetHolder);

}


// Function to update the employee DOM

function updateEmployeeInfo(dataToUpdate = data) { // data is same as let data = [] defined on top
    // Re-initialize the data container;

    dataContainer.innerHTML = '';
    dataToUpdate.forEach(employee => {

        // div container to hold details of each employee
        const newDiv = document.createElement('div');
        newDiv.classList.add('bg-red-300', 'p-2', 'md:flex', 'border-b-4', 'border-red-400', 'mb-4');

        // Create image element
        const img = document.createElement('img');
        img.classList.add('h-10', 'w-10', 'rounded-md', 'mr-4', 'mt-1');
        img.src = employee.picture;

        // Create paragraph element
        const paragraph = document.createElement('p');
        paragraph.classList.add('text-gray-700');
        paragraph.innerHTML = `<strong>Name: </strong> ${employee.name} <br/> <strong>Email: </strong>${employee.email} <br/> <strong>Salary: </strong> ${formatSalary(employee.salary)}`;

        // Add image and paragraph to the div
        newDiv.appendChild(img);
        newDiv.appendChild(paragraph);

        // Add nnewly created div to the data container
        dataContainer.appendChild(newDiv);
    })
}

// Function to format salary

function formatSalary(salary) {
    return '$ ' + (salary).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}



