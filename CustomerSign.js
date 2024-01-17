const readline = require('readline');
const fs = require('fs');
const json2csv = require('json2csv').Parser;
const XLSX = require('xlsx');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const recordsFile = 'data.txt';

function signupProcess() {
  console.log('Hello, I heard you are interested in our product.');

  const userData = {};

  rl.question('Enter your First Name (type "exit" to cancel): ', (firstName) => {
    if (firstName.toLowerCase() === 'exit') {
      console.log('Exiting signup process...');
      rl.close();
      return;
    } else if (!firstName) {
      console.log('Error: First Name cannot be empty.');
      signupProcess();
      return;
    }

    userData.first_name = firstName;

    rl.question('Enter your Last Name (type "exit" to cancel): ', (lastName) => {
      if (lastName.toLowerCase() === 'exit') {
        console.log('Exiting signup process...');
        rl.close();
        return;
      } else if (!lastName) {
        console.log('Error: Last Name cannot be empty.');
        signupProcess();
        return;
      }

      userData.last_name = lastName;

      rl.question('Enter your Country (type "exit" to cancel): ', (country) => {
        if (country.toLowerCase() === 'exit') {
          console.log('Exiting signup process...');
          rl.close();
          return;
        } else if (!country) {
          console.log('Error: Country cannot be empty.');
          signupProcess();
          return;
        }

        userData.country = country;

        rl.question('Enter your Address (type "exit" to cancel): ', (address) => {
          if (address.toLowerCase() === 'exit') {
            console.log('Exiting signup process...');
            rl.close();
            return;
          } else if (!address) {
            console.log('Error: Address cannot be empty.');
            signupProcess();
            return;
          }

          userData.address = address;

          rl.question('Enter your Postcode (type "exit" to cancel): ', (postcode) => {
            if (postcode.toLowerCase() === 'exit') {
              console.log('Exiting signup process...');
              rl.close();
              return;
            } else if (!postcode) {
              console.log('Error: Postcode cannot be empty.');
              signupProcess();
              return;
            }

            userData.postcode = postcode;

            rl.question('Enter your Gender (type "exit" to cancel): ', (gender) => {
              if (gender.toLowerCase() === 'exit') {
                console.log('Exiting signup process...');
                rl.close();
                return;
              } else if (!gender) {
                console.log('Error: Gender cannot be empty.');
                signupProcess();
                return;
              }

              userData.gender = gender;

              rl.question('Enter your Email (type "exit" to cancel): ', (email) => {
                if (email.toLowerCase() === 'exit') {
                  console.log('Exiting signup process...');
                  rl.close();
                  return;
                } else if (!email) {
                  console.log('Error: Email cannot be empty.');
                  signupProcess();
                  return;
                }

                userData.email = email;

                rl.question('Enter your Contact Number (integer only, type "exit" to cancel): ', (contact) => {
                  if (contact.toLowerCase() === 'exit') {
                    console.log('Exiting signup process...');
                    rl.close();
                    return;
                  } else if (!/^\d+$/.test(contact)) {
                    console.log('Error: Contact must be an integer.');
                    signupProcess();
                    return;
                  }

                  userData.contact = parseInt(contact);

                  console.log('\nSuccessfully, sign-up completed.');
                  saveRecord(userData);
                  rl.close();
                });
              });
            });
          });
        });
      });
    });
  });
}

function saveRecord(record) {
  const recordString = JSON.stringify(record);
  fs.appendFile(recordsFile, recordString.toLowerCase() + '\n', (err) => {
    if (err) {
      console.error('Error writing to data.txt:', err);
    } else {
      console.log('Record saved successfully.');
    }
  });
}

function exportToCSV() {
  const records = [];

  // Read the records from data.txt
  const fileContents = fs.readFileSync(recordsFile, 'utf-8');
  const recordsArray = fileContents.split('\n');
  
  recordsArray.forEach((record) => {
    if (record) {
      records.push(JSON.parse(record));
    }
  });

  // Convert records to CSV
  const fields = ['first_name', 'last_name', 'country', 'address', 'postcode', 'gender', 'email', 'contact'];
  const json2csvParser = new json2csv({ fields });
  const csv = json2csvParser.parse(records);

  // Save CSV to a file
  fs.writeFileSync('records.csv', csv);
  console.log('Data exported to records.csv');
}

function exportToXLSX() {
  const records = [];

  // Read the records from data.txt
  const fileContents = fs.readFileSync(recordsFile, 'utf-8');
  const recordsArray = fileContents.split('\n');
  
  recordsArray.forEach((record) => {
    if (record) {
      records.push(JSON.parse(record));
    }
  });

  // Create a new workbook
  const workbook = XLSX.utils.book_new();
  
  // Convert records to worksheet
  const worksheet = XLSX.utils.json_to_sheet(records);
  
  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, 'User Records');
  
  // Save XLSX to a file
  XLSX.writeFile(workbook, 'records.xlsx');
  console.log('Data exported to records.xlsx');
}

function exportToJSON() {
  const records = [];

  // Read the records from data.txt
  const fileContents = fs.readFileSync(recordsFile, 'utf-8');
  const recordsArray = fileContents.split('\n');
  
  recordsArray.forEach((record) => {
    if (record) {
      records.push(JSON.parse(record));
    }
  });

  // Save JSON to a file
  fs.writeFileSync('records.json', JSON.stringify(records, null, 2));
  console.log('Data exported to records.json');
}

function viewRecords() {
  const records = fs.readFileSync(recordsFile, 'utf-8').split('\n').filter(Boolean);

  if (records.length === 0) {
    console.log('Records are empty.');
  } else {
    records.forEach((record, index) => {
      const userData = JSON.parse(record);
      console.log(`Record ${index + 1}:`);
      console.log(`First Name: ${userData.first_name}`);
      console.log(`Last Name: ${userData.last_name}`);
      console.log(`Country: ${userData.country}`);
      console.log(`Address: ${userData.address}`);
      console.log(`Postcode: ${userData.postcode}`);
      console.log(`Gender: ${userData.gender}`);
      console.log(`Email: ${userData.email}`);
      console.log(`Contact: ${userData.contact}`);
      console.log();
    });
  }
}

function editRecord(email) {
  const records = fs.readFileSync(recordsFile, 'utf-8').split('\n').filter(Boolean);
  const updatedRecords = [];

  let found = false;

  records.forEach((record) => {
    const userData = JSON.parse(record);
    if (userData.email === email) {
      found = true;
      const updatedUserData = { ...userData };

      rl.question('Enter new First Name: ', (firstName) => {
        updatedUserData.first_name = firstName;

        rl.question('Enter new Last Name: ', (lastName) => {
          updatedUserData.last_name = lastName;

          rl.question('Enter new Country: ', (country) => {
            updatedUserData.country = country;

            rl.question('Enter new Address: ', (address) => {
              updatedUserData.address = address;

              rl.question('Enter new Postcode: ', (postcode) => {
                updatedUserData.postcode = postcode;

                rl.question('Enter new Gender: ', (gender) => {
                  updatedUserData.gender = gender;

                  rl.question('Enter new Email: ', (newEmail) => {
                    updatedUserData.email = newEmail;

                    rl.question('Enter new Contact Number: ', (contact) => {
                      if (!/^\d+$/.test(contact)) {
                        console.log('Error: Contact must be an integer.');
                        rl.close();
                        return;
                      }
                      updatedUserData.contact = parseInt(contact);

                      console.log('\nSuccessfully updated the record:');
                      console.log(updatedUserData);

                      updatedRecords.push(updatedUserData);
                      saveRecords(updatedRecords);

                      rl.close();
                    });
                  });
                });
              });
            });
          });
        });
      });
    } else {
      updatedRecords.push(userData);
    }
  });

  if (!found) {
    console.log('Error: Email not found.');
    rl.close();
  }
}

function deleteRecord(email) {
  const records = fs.readFileSync(recordsFile, 'utf-8').split('\n').filter(Boolean);
  const updatedRecords = [];
  let found = false;

  records.forEach((record) => {
    const userData = JSON.parse(record);
    if (userData.email === email) {
      found = true;
    } else {
      updatedRecords.push(userData);
    }
  });

  if (!found) {
    console.log('Error: Email not found.');
    rl.close();
    return;
  }

  saveRecords(updatedRecords);

  console.log('Record deleted successfully.');
  rl.close();
}

function saveRecords(records) {
  const recordsString = records.map((record) => JSON.stringify(record)).join('\n');
  fs.writeFileSync(recordsFile, recordsString + '\n');
}

function main() {
  console.log('\nMenu:');
  console.log('1. Type "add" to Add User');
  console.log('2. Type "view" to View records');
  console.log('3. Type "edit" to Edit a record');
  console.log('4. Type "delete" to Delete a record');
  console.log('5. Type "export_csv" to Export to CSV');
  console.log('6. Type "export_xlsx" to Export to XLSX');
  console.log('7. Type "export_json" to Export to JSON');
  console.log('8. Type "exit" to Exit');

  rl.question('Enter your choice: ', (choice) => {
    if (choice.toLowerCase() === 'add') {
      signupProcess();
    } else if (choice.toLowerCase() === 'view') {
      viewRecords();
      main();
    } else if (choice.toLowerCase() === 'edit') {
      rl.question('Enter the email of the record to edit: ', (email) => {
        editRecord(email);
      });
    } else if (choice.toLowerCase() === 'delete') {
      rl.question('Enter the email of the record to delete: ', (email) => {
        deleteRecord(email);
      });
    } else if (choice.toLowerCase() === 'export_csv') {
      exportToCSV();
      main();
    } else if (choice.toLowerCase() === 'export_xlsx') {
      exportToXLSX();
      main();
    } else if (choice.toLowerCase() === 'export_json') {
      exportToJSON();
      main();
    } else if (choice.toLowerCase() === 'exit') {
      rl.close();
    } else {
      console.log('Error: Please enter a valid choice.');
      main();
    }
  });
}

main();
