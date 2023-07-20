const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.normalize('./db/contacts.json');

function listContacts() {
  fs.readFile(contactsPath, function (error, data) {
    if (error) {
      console.log('error', error.message);
      return;
    }
    console.log(JSON.parse(data));
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, function (error, data) {
    if (error) {
      console.log('error', error.message);
      return;
    }
    const parsedData = JSON.parse(data);
    const findId = parsedData.filter(contact => contact.id.includes(contactId));

    console.log(JSON.stringify(findId));
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, function (error, data) {
    if (error) {
      console.log('error', error.message);
      return;
    }
    const parsedData = JSON.parse(data);
    const newContacts = parsedData.filter(contact => contact.id !== contactId);
    fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2), error => {
      if (error) {
        console.log('Failed to write updated data to file');
        return;
      }
      console.log('Updated file successfully');
    });
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, function (error, data) {
    if (error) {
      console.log('error', error.message);
      return;
    }
    const parsedData = JSON.parse(data);
    const newContacts = parsedData.concat({ id: uuidv4(), name: name, email: email, phone: phone });
    fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2), error => {
      if (error) {
        console.log('Failed to write updated data to file');
        return;
      }
      console.log('Updated file successfully');
    });
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
