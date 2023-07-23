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
      const selectContacts = await listContacts();
      console.table(selectContacts);
      break;

    case 'get':
      const getContact = await getContactById(id);
      console.log(getContact);
      break;

    case 'add':
      const pushContact = await addContact(name, email, phone);
      console.log(pushContact);
      break;

    case 'remove':
      const deleteContact = await removeContact(id);
      console.log(deleteContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!\x1B[0m');
  }
}

invokeAction(options);
