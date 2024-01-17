#importing Libraries
import pandas as pd
import os
import re
import numpy as np
import json
import openpyxl
import warnings
warnings.filterwarnings("ignore")

#function for signup process
def signup_process(Fname_list, Lname_list, Country_list, Address_list, Postcode_list, Gender_list, Email_list, Contact_list):
    print("Hello, I heard you are interested in our product.")
    #while loop to take user input
    while True:
        value = input("Enter your First Name (type 'exit' to cancel): ").lower()
        if value == 'exit':
            print("Exiting signup process...")
            return
        elif not value:
            print("Error: First Name cannot be empty.")
            continue

        value1 = input("Enter your Last Name (type 'exit' to cancel): ").lower()
        if value1 == 'exit':
            print("Exiting signup process...")
            return
        elif not value1:
            print("Error: Last Name cannot be empty.")
            continue

        value2 = input("Enter your Country (type 'exit' to cancel): ").lower()
        if value2 == 'exit':
            print("Exiting signup process...")
            return
        elif not value2:
            print("Error: Country cannot be empty.")
            continue

        value3 = input("Enter your Address (type 'exit' to cancel): ").lower()
        if value3 == 'exit':
            print("Exiting signup process...")
            return
        elif not value3:
            print("Error: Address cannot be empty.")
            continue

        value4 = input("Enter your Postcode (type 'exit' to cancel): ").lower()
        if value4 == 'exit':
            print("Exiting signup process...")
            return
        elif not value4:
            print("Error: Postcode cannot be empty.")
            continue

        value5 = input("Gender (type 'exit' to cancel): ").lower()
        if value5 == 'exit':
            print("Exiting signup process...")
            return
        elif not value5:
            print("Error: Gender cannot be empty.")
            continue

        value6 = input("Enter your Email (type 'exit' to cancel): ").lower()
        if value6 == 'exit':
            print("Exiting signup process...")
            return
        elif not value6:
            print("Error: Email cannot be empty.")
            continue

        while True:
            value7 = input("Enter your Contact Number ('exit' to cancel): ")
            if value7 == 'exit':
                print("Exiting signup process...")
                return
            elif value7.isdigit():
                break
            else:
                print("Error: Contact must be numerical.")
        #sign up records
        print("\nSuccessfully, sign-up completed.")
        Fname_list.append(value)
        Lname_list.append(value1)
        Country_list.append(value2)
        Address_list.append(value3)
        Postcode_list.append(value4)
        Gender_list.append(value5)
        Email_list.append(value6)
        Contact_list.append(int(value7))
        #dictonary of records
        record = {
            "first_name": value,
            "last_name": value1,
            "country": value2,
            "address": value3,
            "postcode": value4,
            "gender": value5,
            "email": value6,
            "contact": int(value7),
        }
        #writing into text file (data.txt)
        with open('data.txt', 'a') as file:
            file.write(str(record).lower() + '\n')

#function for add user
def add_user():
    #add one user at a time
    Fname_list = []
    Lname_list = []
    Country_list = []
    Address_list = []
    Postcode_list = []
    Gender_list = []
    Email_list = []
    Contact_list = []
    case = 1
    signup_process(Fname_list, Lname_list, Country_list, Address_list, Postcode_list, Gender_list, Email_list, Contact_list)

#function for updating records
def update_record(email, new_first_name, new_last_name, new_country, new_address, new_postcode, new_gender, new_contact):
    records = []
    with open('data.txt', 'r') as file:
        records = file.readlines()
    updated_records = []
    found = False
    for record in records:
        user_data = eval(record)
        if user_data['email'] == email:
            found = True
            user_data['first_name'] = new_first_name
            user_data['last_name'] = new_last_name
            user_data['country'] = new_country
            user_data['address'] = new_address
            user_data['postcode'] = new_postcode
            user_data['gender'] = new_gender
            user_data['contact'] = new_contact
        updated_records.append(user_data)

    if not found:
        print("Error: Email not found.")
        return

    with open('data.txt', 'w') as file:
        for record in updated_records:
            file.write(str(record).lower() + '\n')

    print("Record updated successfully.")

#function for deleting records
def delete_record(email):
    #list of records
    records = []
    with open('data.txt', 'r') as file:
        records = file.readlines()
    #matching records
    matching_records = []
    for record in records:
        user_data = eval(record)
        if user_data['email'] == email:
            matching_records.append(record)

    if len(matching_records) == 0:
        print("Error: Email not found.")
        return

    if len(matching_records) > 1:
        print("Multiple records found with the same email:")
        for i, record in enumerate(matching_records):
            user_data = eval(record)
            print(
                f"{i}: {user_data['first_name']} {user_data['last_name']}, {user_data['country']}, {user_data['address']}, {user_data['postcode']}, {user_data['gender']}, {user_data['contact']}")

        choice = int(input("Enter the index number of the record you want to delete: "))
        if choice < 0 or choice >= len(matching_records):
            print("Error: Invalid index number.")
            return
        matching_record = matching_records.pop(choice)
    else:
        matching_record = matching_records.pop(0)

    #remove the matching record from the list of records
    records.remove(matching_record)

    with open('data.txt', 'w') as file:
        for record in records:
            file.write(record)

    print("Record deleted successfully.")

#function to view records
def view_records():
    #reading text file 
    with open('data.txt', 'r') as file:
        records = file.readlines()

    if not records:
        print("Records are empty.")
        return
    #printing records details
    for i, record in enumerate(records):
        user_data = eval(record)
        print(f"Record {i + 1}:")
        print(f"First Name: {user_data['first_name']}")
        print(f"Last Name: {user_data['last_name']}")
        print(f"Country: {user_data['country']}")
        print(f"Address: {user_data['address']}")
        print(f"Postcode: {user_data['postcode']}")
        print(f"Gender: {user_data['gender']}")
        print(f"Email: {user_data['email']}")
        print(f"Contact: {user_data['contact']}")
        print()

#function to export recors into csv file
def export_to_csv():
    with open('data.txt', 'r') as file:
        records = [eval(record) for record in file]
    if not records:
        print("No records to export.")
        return
        
    df = pd.DataFrame(records)
    #export to CSV
    df.to_csv('records.csv', index=False)
    print("Data exported to records.csv")

#function to export recors into excel file
def export_to_xlsx():
    #read data from the text file
    with open('data.txt', 'r') as file:
        records = [eval(record) for record in file]
    if not records:
        print("No records to export.")
        return

    df = pd.DataFrame(records)
    #export to XLSX
    df.to_excel('records.xlsx', index=False)
    print("Data exported to records.xlsx")
    
#function to export records to JSON file
def export_to_json():
    # Read data from the text file
    with open('data.txt', 'r') as file:
        records = [eval(record) for record in file]
    
    if not records:
        print("No records to export.")
        return

    # Export to JSON
    with open('records.json', 'w') as json_file:
        json.dump(records, json_file, indent=4)

    print("Data exported to records.json")
    
#main function to user input
def main():
    while True:
        print("\nMenu:")
        print("1. Type 'add' to Add User")
        print("2. Type 'up' to Update a record")
        print("3. Type 'delete' to Delete a record")
        print("4. Type 'view' to View records")
        print("5. Type 'export_csv' to Export to CSV")
        print("6. Type 'export_xlsx' to Export to XLSX")
        print("7. Type 'export_json' to Export to JSON")
        print("8. Type 'exit' to Exit")
        choice = input("Enter your choice: ")

        if choice == 'exit':
            #exit programme 
            break  

        if choice == 'add':
            add_user()

        elif choice == 'up':
            email = input("Enter the email of the record to update (type 'exit' to cancel): ").lower()
            if email == 'exit':
                #go back to menu
                continue 
            new_first_name = input("Enter the new first name (type 'exit' to cancel): ").lower()
            if new_first_name == 'exit':
                continue
            new_last_name = input("Enter the new last name (type 'exit' to cancel): ").lower()
            if new_last_name == 'exit':
                continue
            new_country = input("Enter the new country (type 'exit' to cancel): ").lower()
            if new_country == 'exit':
                continue
            new_address = input("Enter the new address (type 'exit' to cancel): ").lower()
            if new_address == 'exit':
                continue
            new_postcode = input("Enter the new postcode (type 'exit' to cancel): ").lower()
            if new_postcode == 'exit':
                continue
            new_gender = input("Enter the new gender (type 'exit' to cancel): ").lower()
            if new_gender == 'exit':
                continue
            while True:
                new_contact = input("Enter the new contact (type 'exit' to cancel): ")
                if new_contact == 'exit':
                    break
                if new_contact.isdigit():
                    new_contact = int(new_contact)
                    break
                else:
                    print("Error: Contact must be an numerical value.")
            if new_contact == 'exit':
                continue
            update_record(email, new_first_name, new_last_name, new_country, new_address, new_postcode, new_gender, new_contact)

        elif choice == 'delete':
            email = input("Enter the email of the record to delete (type 'exit' to cancel): ").lower()
            if email == 'exit':
                #go back to menu
                continue 
            delete_record(email)

        elif choice == 'view':
            view_records()

        elif choice == 'export_csv':
            export_to_csv()

        elif choice == 'export_xlsx':
            export_to_xlsx()
            
        elif choice == 'export_json':
            export_to_json()
            
        else:
            print("Error: Please enter a valid choice.")

main()

#hemantthapa1998@gmail.com
#Code Updated on 17.01.2024
