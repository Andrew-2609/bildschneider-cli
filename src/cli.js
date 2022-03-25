import { bildZuschneiden } from './index.js';
import { befehleErhalten } from './readline.js';

async function bildVerarbeiten() {
    const ergebnis = await befehleErhalten();
    return bildZuschneiden(ergebnis.bildpaf, ergebnis.breite, ergebnis.hohe, ergebnis.linkeVersatz, ergebnis.obereVersatz);
}

bildVerarbeiten().then(ausgang => console.log(ausgang));