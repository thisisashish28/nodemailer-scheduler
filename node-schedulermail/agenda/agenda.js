const Agenda = require('agenda');
const sendMail = require('../nodemailer/mailer');

const agenda = new Agenda({db: {address: 'mongodb://localhost:27017/agenda'}});

agenda.define('send email', async job => {
    const {to, subject, text} = job.attrs.data;
    await sendMail(to, subject, text);
});

(async function(){
    await agenda.start();
    console.log('agenda started');
})();

module.exports = agenda;