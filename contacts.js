const fs = require('fs').promises;
const { error, log } = require('console');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.normalize('./db/contacts.json');

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath);
    console.log(JSON.parse(contacts));
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
    const newContacts = parsedData.filter(contact => contact.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
    console.log('Updated file successfully');
  } catch (error) {
    console.error('Failed to write updated data to file:', error);
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
    console.log('Updated file successfully');
  } catch (error) {
    console.error('Failed to write updated data to file:', error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
