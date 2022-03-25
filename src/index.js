import chalk from 'chalk';
import sharp from 'sharp';

async function getMetadaten(bildpaf) {
    try {
        const metadaten = await sharp(bildpaf).metadata();
        return metadaten;
    } catch (error) {
        console.log(chalk.bold.red(`Beim lesen der Bildmetadaten ist ein Fehler aufgetreten: ${error}`));
    }
}