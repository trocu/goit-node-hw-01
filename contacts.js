const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');
require('colors');
const path = require('path');

const contactsPath = path.resolve('./db/contacts.json');

const listContacts = async () => {
  try {
    const getContacts = await fs.readFile(contactsPath);
    return JSON.parse(getContacts);
  } catch (error) {
    console.error(error.message.red);
  }
};

const getContactById = async contactId => {
  try {
    const parsedData = await listContacts();
    const getContact = parsedData.find(contact => contact.id === contactId);
    return getContact ?? '\x1B[31mNo matching id!\x1B[0m';
  } catch (error) {
    console.error(error.message.red);
  }
};

const removeContact = async contactId => {
  try {
    const parsedData = await listContacts();
    const getContact = parsedData.find(contact => contact.id === contactId);
    if (getContact && getContact.id === contactId) {
      const newContacts = parsedData.filter(contact => contact.id !== contactId);
      await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
      return `Updated file successfully. ${getContact.name} has been removed.`.green;
    }
    return 'Failed to remove. No matching id!.'.red;
  } catch (error) {
    console.error(error.message.red);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const parsedData = await listContacts();
    const newContacts = parsedData.concat({
      id: uuidv4(),
      name: name,
      email: email,
      phone: phone,
    });
    if (parsedData.some(contact => contact.name.toLowerCase() === name.toLowerCase())) {
      return `${name} is already in contacts!`.yellow;
    }
    await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
    return `Updated file successfully. ${name} has been added.`.green;
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
