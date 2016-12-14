export class Section {
    static Sections: Sections = {
        'games': 'Games',
        'ctrls': 'Controllers',
        'cblsnetw': 'Cables, Networking & Accessories',
        'bndlconsoles': 'Bundles & Consoles',
        'other': 'Other',
    };
}

interface Sections {
    [key: string]: string;
}