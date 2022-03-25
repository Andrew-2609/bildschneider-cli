import chalk from 'chalk';
import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const ergebnis = {
    bildpaf: '',
    breite: '',
    hohe: '',
    linkeVersatz: '',
    obereVersatz: ''
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
            ergebnis.breite = Number(width);
            resolve();
        });
    })
};

const hoheFrage = () => {
    return new Promise((resolve, _) => {
        rl.question(gelberSatz('Auf welche höhe willst du schneiden?\n'), (height) => {
            ergebnis.hohe = Number(height);
            resolve();
        });
    })
};

const linkeVersatzFrage = () => {
    return new Promise((resolve, _) => {
        rl.question(gelberSatz('Was ist der linke Versatz? Drucke die Eingabetaste, um zu überspringen.\n'), (left) => {
            ergebnis.linkeVersatz = Number(left) || 0;
            resolve();
        });
    })
};

const obereVersatzFrage = () => {
    return new Promise((resolve, _) => {
        rl.question(gelberSatz('Was ist der obere Versatz? Drucke die Eingabetaste, um zu überspringen.\n'), (top) => {
            ergebnis.obereVersatz = Number(top) || 0;
            resolve();
        });
    });
};

const befehleErhalten = async () => {
    const fragenPromises = [bildpafFrage, breiteFrage, hoheFrage, linkeVersatzFrage, obereVersatzFrage];

    for (let frage of fragenPromises) {
        await frage();
    }

    rl.close();

    return ergebnis;
};

module.exports = { befehleErhalten };