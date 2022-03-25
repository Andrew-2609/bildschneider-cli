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

function ausgabennameVerarbeiten(bildpaf, format) {
    const originalname = path.basename(bildpaf);
    const behandelterName = originalname.replace(`.${format}`, `_beschnittenes.${format}`);
    const ausgabeVerzeichnis = path.resolve(bildpaf).replace(originalname, behandelterName);
    return ausgabeVerzeichnis;
}