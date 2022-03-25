import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import path from 'path';
import Sharp from 'sharp';
import { ausgabenameVerarbeiten, getMetadaten } from '../../../src/index.js';

describe('#Index - Test-Suite für die Datei index.js', () => {
    beforeEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
    });

    describe('#getMetadaten', () => {
        it('sollte die Metadaten des eingegebenen Bildes erhalten', async () => {
            const bildpaf = 'meinBild.png';
            const format = { format: '.png' };

            jest.spyOn(
                Sharp.prototype,
                Sharp.prototype.metadata.name
            ).mockResolvedValue([format]);

            const metadaten = await getMetadaten(bildpaf);

            expect(metadaten).toContain(format);
        });

        it('sollte einen Fehler auslösen, wenn Metadaten von ungültigen Eingaben gelesen werden', async () => {
            const aufgetretenError = `Error: Input file is missing`;

            jest.spyOn(
                process,
                process.exit.name
            ).mockImplementation(() => { });

            jest.spyOn(
                Sharp.prototype,
                Sharp.prototype.metadata.name
            ).mockRejectedValue(aufgetretenError);

            try {
                await getMetadaten('.');
            } catch (error) {
                expect(error).toStrictEqual(aufgetretenError);
                expect(process.exit).toHaveBeenCalledWith(1);
            }
        });
    });

    describe('#ausgabenameVerarbeiten', () => {
        it('sollte den Ausgabenamen verarbeiten', () => {
            const bildpaf = 'meinBild.png';
            const format = 'png';
            const behandelterBildpaf = bildpaf.replace(`.${format}`, `_beschnittenes.${format}`);

            jest.spyOn(
                path,
                path.basename.name
            ).mockReturnValue(bildpaf);

            jest.spyOn(
                path,
                path.resolve.name
            ).mockReturnValueOnce(bildpaf);

            const ausgabename = ausgabenameVerarbeiten(bildpaf, format);

            expect(ausgabename).toStrictEqual(behandelterBildpaf);
        });
    });
});