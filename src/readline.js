import chalk from 'chalk';
import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const ergebnis = {
    bildpaf: '',
    width: '',
    height: '',
    left: '',
    top: ''
};

const gelberSatz = chalk.bold.yellow;

const bildpafFrage = () => {
    return new Promise((resolve, _) => {
        rl.question(gelberSatz('Was ist der Bildpaf?\n'), (bildpaf) => {
            ergebnis.bildpaf = bildpaf;
            resolve();
        });
    });
};

const widthFrage = () => {
    return new Promise((resolve, _) => {
        rl.question(gelberSatz('Auf welche breite willst du schneiden?\n'), (width) => {
            ergebnis.width = Number(width);
            resolve();
        });
    })
};