export class Console {
    static Consoles: Consoles = {
    'PS4': 'Play Station 4',
    'PS3': 'Play Station 3',
    'PS2': 'Play Station 2',
    'PSV': 'PSVita',
    'XOne': 'Xbox One',
    'X360': 'Xbox 360',
    'WiiU': 'Wii U',
    'Wii': 'Wii',
    'N3DS2DS': 'Nintendo 3DS/2DS',
    'Other': 'Other'
    };
}

interface Consoles {
    [key: string]: string;
}
