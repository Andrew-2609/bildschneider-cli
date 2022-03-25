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

const breiteFrage = () => {
    return new Promise((resolve, _) => {
        rl.question(gelberSatz('Auf welche breite willst du schneiden?\n'), (width) => {
            ergebnis.width = Number(width);
            resolve();
        });
    })
};

const hoheFrage = () => {
    return new Promise((resolve, _) => {
        rl.question(gelberSatz('Auf welche höhe willst du schneiden?\n'), (height) => {
            ergebnis.height = Number(height);
            resolve();
        });
    })
};

const linksVersatzFrage = () => {
    return new Promise((resolve, _) => {
        rl.question(gelberSatz('Was ist der linke Versatz? Drucke die Eingabetaste, um zu überspringen.\n'), (left) => {
            ergebnis.left = Number(left) || 0;
            resolve();
        });
    })
};

const obenVersatzFrage = () => {
    return new Promise((resolve, _) => {
        rl.question(gelberSatz('Was ist der obere Versatz? Drucke die Eingabetaste, um zu überspringen.\n'), (top) => {
            ergebnis.top = Number(top) || 0;
            resolve();
        });
    });
};

const befehleErhalten = async () => {
    const fragenPromises = [bildpafFrage, breiteFrage, hoheFrage, linksVersatzFrage, obenVersatzFrage];

    for (let frage of fragenPromises) {
        await frage();
    }

    rl.close();

    return ergebnis;
};

module.exports = { befehleErhalten };