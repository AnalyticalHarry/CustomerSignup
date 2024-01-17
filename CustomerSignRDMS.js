const sqlite3 = require('sqlite3').verbose();
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const db = new sqlite3.Database('user_records.db');

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            first_name TEXT,
            last_name TEXT,
            country TEXT,
            address TEXT,
            postcode TEXT,
            gender TEXT,
            email TEXT UNIQUE,
            contact INTEGER
        )
    `);
});

function signupProcess() {
    console.log("Hello, I heard you are interested in our product.");

    rl.question("Enter your First Name (type 'exit' to cancel): ", (value) => {
        if (value.toLowerCase() === 'exit') {
            console.log("Exiting signup process...");
            rl.close();
            return;
        } else if (!value) {
            console.log("Error: First Name cannot be empty.");
            signupProcess();
            return;
        }

        rl.question("Enter your Last Name (type 'exit' to cancel): ", (value1) => {
            if (value1.toLowerCase() === 'exit') {
                console.log("Exiting signup process...");
                rl.close();
                return;
            } else if (!value1) {
                console.log("Error: Last Name cannot be empty.");
                signupProcess();
                return;
            }

            rl.question("Enter your Country (type 'exit' to cancel): ", (value2) => {
                if (value2.toLowerCase() === 'exit') {
                    console.log("Exiting signup process...");
                    rl.close();
                    return;
                } else if (!value2) {
                    console.log("Error: Country cannot be empty.");
                    signupProcess();
                    return;
                }

                rl.question("Enter your Address (type 'exit' to cancel): ", (value3) => {
                    if (value3.toLowerCase() === 'exit') {
                        console.log("Exiting signup process...");
                        rl.close();
                        return;
                    } else if (!value3) {
                        console.log("Error: Address cannot be empty.");
                        signupProcess();
                        return;
                    }

                    rl.question("Enter your Postcode (type 'exit' to cancel): ", (value4) => {
                        if (value4.toLowerCase() === 'exit') {
                            console.log("Exiting signup process...");
                            rl.close();
                            return;
                        } else if (!value4) {
                            console.log("Error: Postcode cannot be empty.");
                            signupProcess();
                            return;
                        }

                        rl.question("Gender (type 'exit' to cancel): ", (value5) => {
                            if (value5.toLowerCase() === 'exit') {
                                console.log("Exiting signup process...");
                                rl.close();
                                return;
                            } else if (!value5) {
                                console.log("Error: Gender cannot be empty.");
                                signupProcess();
                                return;
                            }

                            rl.question("Enter your Email (type 'exit' to cancel): ", (value6) => {
                                if (value6.toLowerCase() === 'exit') {
                                    console.log("Exiting signup process...");
                                    rl.close();
                                    return;
                                } else if (!value6) {
                                    console.log("Error: Email cannot be empty.");
                                    signupProcess();
                                    return;
                                }

                                rl.question("Enter your Contact Number ('exit' to cancel): ", (value7) => {
                                    if (value7.toLowerCase() === 'exit') {
                                        console.log("Exiting signup process...");
                                        rl.close();
                                        return;
                                    } else if (!/^\d+$/.test(value7)) {
                                        console.log("Error: Contact must be numerical.");
                                        signupProcess();
                                        return;
                                    }

                                    console.log("\nSuccessfully, sign-up completed.");

                                    const stmt = db.prepare(`
                                        INSERT INTO users (first_name, last_name, country, address, postcode, gender, email, contact)
                                        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                                    `);

                                    stmt.run(value, value1, value2, value3, value4, value5, value6, parseInt(value7));
                                    stmt.finalize();

                                    signupProcess();
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}

function addUser() {
    signupProcess();
}

function updateRecord() {
    rl.question("Enter the email of the record to update (type 'exit' to cancel): ", (email) => {
        if (email.toLowerCase() === 'exit') {
            console.log("Exiting update process...");
            rl.close();
            return;
        }

        rl.question("Enter the new first name (type 'exit' to cancel): ", (newFirstName) => {
            if (newFirstName.toLowerCase() === 'exit') {
                console.log("Exiting update process...");
                rl.close();
                return;
            }

            rl.question("Enter the new last name (type 'exit' to cancel): ", (newLastName) => {
                if (newLastName.toLowerCase() === 'exit') {
                    console.log("Exiting update process...");
                    rl.close();
                    return;
                }

                rl.question("Enter the new country (type 'exit' to cancel): ", (newCountry) => {
                    if (newCountry.toLowerCase() === 'exit') {
                        console.log("Exiting update process...");
                        rl.close();
                        return;
                    }

                    rl.question("Enter the new address (type 'exit' to cancel): ", (newAddress) => {
                        if (newAddress.toLowerCase() === 'exit') {
                            console.log("Exiting update process...");
                            rl.close();
                            return;
                        }

                        rl.question("Enter the new postcode (type 'exit' to cancel): ", (newPostcode) => {
                            if (newPostcode.toLowerCase() === 'exit') {
                                console.log("Exiting update process...");
                                rl.close();
                                return;
                            }

                            rl.question("Enter the new gender (type 'exit' to cancel): ", (newGender) => {
                                if (newGender.toLowerCase() === 'exit') {
                                    console.log("Exiting update process...");
                                    rl.close();
                                    return;
                                }

                                rl.question("Enter the new contact (type 'exit' to cancel): ", (newContact) => {
                                    if (newContact.toLowerCase() === 'exit') {
                                        console.log("Exiting update process...");
                                        rl.close();
                                        return;
                                    } else if (!/^\d+$/.test(newContact)) {
                                        console.log("Error: Contact must be a numerical value.");
                                        updateRecord();
                                        return;
                                    }

                                    const stmt = db.prepare(`
                                        UPDATE users
                                        SET first_name=?, last_name=?, country=?, address=?, postcode=?, gender=?, contact=?
                                        WHERE email=?
                                    `);

                                    stmt.run(newFirstName, newLastName, newCountry, newAddress, newPostcode, newGender, parseInt(newContact), email);
                                    stmt.finalize();

                                    console.log("Record updated successfully.");
                                    updateRecord();
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}

function deleteRecord() {
    rl.question("Enter the email of the record to delete (type 'exit' to cancel): ", (email) => {
        if (email.toLowerCase() === 'exit') {
            console.log("Exiting delete process...");
            rl.close();
            return;
        }

        const stmt = db.prepare('DELETE FROM users WHERE email=?');
        stmt.run(email);
        stmt.finalize();

        console.log("Record deleted successfully.");
        deleteRecord();
    });
}

function viewRecords() {
    db.all('SELECT * FROM users', (err, records) => {
        if (err) {
            console.error(err.message);
            return;
        }

        if (!records.length) {
            console.log("Records are empty.");
            return;
        }

        console.log("User Records:");
        records.forEach((record) => {
            console.log(`ID: ${record.id}`);
            console.log(`First Name: ${record.first_name}`);
            console.log(`Last Name: ${record.last_name}`);
            console.log(`Country: ${record.country}`);
            console.log(`Address: ${record.address}`);
            console.log(`Postcode: ${record.postcode}`);
            console.log(`Gender: ${record.gender}`);
            console.log(`Email: ${record.email}`);
            console.log(`Contact: ${record.contact}`);
            console.log("--------------------------");
        });

        rl.close();
    });
}

function main() {
    console.log("\nMenu:");
    console.log("1. Type 'add' to Add User");
    console.log("2. Type 'up' to Update a record");
    console.log("3. Type 'delete' to Delete a record");
    console.log("4. Type 'view' to View records");
    console.log("5. Type 'exit' to Exit");

    rl.question("Enter your choice: ", (choice) => {
        if (choice === 'exit') {
            db.close();
            return rl.close();
        }

        switch (choice) {
            case 'add':
                addUser();
                break;
            case 'up':
                updateRecord();
                break;
            case 'delete':
                deleteRecord();
                break;
            case 'view':
                viewRecords();
                break;
            default:
                console.log("Error: Please enter a valid choice.");
                main();
        }
    });
}

main();
