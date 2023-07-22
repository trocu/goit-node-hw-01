// const yargs = require('yargs/yargs');
const { program } = require('commander');

const { listContacts, getContactById, removeContact, addContact } = require('./contacts');

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const parsedData = await listContacts();
      console.table(parsedData);
      break;

    case 'get':
      const getContact = await getContactById(id);
      console.log(getContact);
      break;

    case 'add':
      addContact(name, email, phone);
      break;

    case 'remove':
      removeContact(id);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!\x1B[0m');
  }
}

invokeAction(options);
