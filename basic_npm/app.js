const chalk = require('chalk');
const validate = require('./validator');

const log = console.log;


log(chalk.green('Test Chalk Module\n'))


// contoh tagged template literal begini: log(chalk`lorem ipsum {blue.bgRed dolor} sit amet`)
const statusEmail = validate.resultEmail ? chalk.green.bold('valid') : chalk.red.bold('invalid');
log(chalk.white.bgBlack`Email ini: {blue.italic.underline ${validate.email}} adalah ${statusEmail}`);

const statusMobilePhone = validate.resultMobilePhone ? chalk.green.bold('valid') : chalk.red.bold('invalid');
log(chalk.white.bgBlack`Nomor HP ini: {blue.bold ${validate.mobilePhone}} adalah ${statusMobilePhone}`);

const statusNumeric = validate.resultNumeric ? chalk.green.bold('valid') : chalk.red.bold('invalid');
log(chalk.white.bgBlack`Angka ini: {white.bold ${validate.numeric}} adalah ${statusNumeric}`);

// ES2015 template literal
log(`
CPU: ${chalk.red('90%')}
RAM: ${chalk.green('40%')}
DISK: ${chalk.yellow('70%')}
`);

// Use RGB colors in terminal emulators that support it.
log(chalk.rgb(123, 45, 67).underline('Underlined reddish color'));
log(chalk.hex('#DEADED').bold('Bold gray!'));
log(chalk.strikethrough.keyword('orange')('Yay orange colored text!'));

log(chalk.dim('lower opacity'))
log(chalk.bgGreenBright.magentaBright.inverse('inverse text'))
log(chalk.hidden('hidden text'))
log(chalk.magenta.visible('visible text'))

