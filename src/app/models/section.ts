export class Section {
    static Sections: Sections = {
        'games': 'Games',
        'ctrls': 'Controllers',
        'cblsnetw': 'Cables & Networking',
        'btrschr': 'Bateries & Chargers',
        'other': 'Other',
    };
}

interface Sections {
    [key: string]: string;
}