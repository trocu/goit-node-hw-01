const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');
// const colors = require('colors/safe');
require('colors');
const path = require('path');

const contactsPath = path.resolve('./db/contacts.json');

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath);
    console.table(JSON.parse(contacts));
  } catch (error) {
    console.error(error);
  }
};

const getContactById = async contactId => {
  try {
    const contacts = await fs.readFile(contactsPath);
    const parsedData = JSON.parse(contacts);
    const filteredContacts = parsedData.filter(contact => contact.id.includes(contactId));
    console.log(filteredContacts);
  } catch (error) {
    console.error(error);
  }
};

const removeContact = async contactId => {
  try {
    const contacts = await fs.readFile(contactsPath);
    const parsedData = JSON.parse(contacts);
    const getContactName = parsedData.find(contact => contact.id === contactId);
    const newContacts = parsedData.filter(contact => contact.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
    console.log(`Updated file successfully, ${getContactName.name} has been removed.`.green);
  } catch (error) {
    console.error('Failed to write updated data to file.\n'.red, error);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const contacts = await fs.readFile(contactsPath);
    const parsedData = JSON.parse(contacts);
    const newContacts = parsedData.concat({
      id: uuidv4(),
      name: name,
      email: email,
      phone: phone,
    });
    await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
    console.log(`Updated file successfully, ${name} has been added.`.green);
  } catch (error) {
    console.error('Failed to write updated data to file.\n'.red, error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
