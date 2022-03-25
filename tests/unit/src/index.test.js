import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import Sharp from 'sharp';
import { getMetadaten } from '../../../src/index.js';

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
    });
});