import chalk from 'chalk';
import path from 'path';
import sharp from 'sharp';

async function getMetadaten(bildpaf) {
    try {
        const metadaten = await sharp(bildpaf).metadata();
        return metadaten;
    } catch (error) {
        console.log(chalk.bold.red(`Beim lesen der Bildmetadaten ist ein Fehler aufgetreten: ${error}`));
    }
}

function ausgabenameVerarbeiten(bildpaf, format) {
    const originalname = path.basename(bildpaf);
    const behandelterName = originalname.replace(`.${format}`, `_beschnittenes.${format}`);
    const ausgabeVerzeichnis = path.resolve(bildpaf).replace(originalname, behandelterName);
    return ausgabeVerzeichnis;
}

async function bildZuschneiden(bildpaf, breite, hohe, links = 0, oben = 0) {
    const { format } = await getMetadaten(bildpaf);
    const ausgabename = ausgabenameVerarbeiten(bildpaf, format);

    try {
        await sharp(bildpaf)
            .extract({ width: breite, height: hohe, left: links, top: oben })
            .toFile(ausgabename);
    } catch (error) {
        return chalk.bold.red(`\nBeim Zuschneiden des Bildes ist ein Fehler aufgreten: ${error}`);
    }

    return chalk.bold.green(
        `\nDas Bild wurde erfolgreich zugeschnitten und gespeichert unter: ${chalk.blue(ausgabename)}`
    );
}

export { bildZuschneiden };