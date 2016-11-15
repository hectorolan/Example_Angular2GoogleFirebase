export class Ad {
    // dummy data
    static Ads: Ad[] = [
        new Ad(1, 'Game of thrones', 'Maria', 'maria@gmail.com',
        '7878889876', 'tel,email', 2.4, 'Barceloneta, PR', 'PS4', 'games', 'alfa'),
        new Ad(2, 'Kill them all', 'Pedro', 'pedro@gmail.com',
        '7876342231', 'email', 10, 'Utuado, PR', 'PS4', 'games', 'beta'),
        new Ad(3, 'Bates', 'Cristina', 'crist@gmail.com',
        '7871022253', 'tel', 15.25, 'Vega Baja, PR', 'PS4', 'games', 'gamma'),
        new Ad(4, 'Revenge', 'Antonio', 'don@gmail.com',
        '7876345267', 'tel,email', 9.999, 'Ponce, PR', 'PS3', 'games', 'delta')
    ];

    id: number;
    name: string;
    owner: string;
    email: string;
    telephone: string;
    contactMethod: string;
    price: number;
    location: string;
    console: string;
    section: string;
    itemIdentification: string;

    constructor(id: number,
    name: string,
    owner: string,
    email: string,
    telephone: string,
    contactMethod: string,
    price: number,
    location: string,
    console: string,
    section: string,
    itemIdentification: string) {
        this.id = id;
        this.name = name;
        this.owner = owner;
        this.email = email;
        this.telephone = telephone;
        this.contactMethod = contactMethod;
        this.price = price;
        this.location = location;
        this.console = console;
        this.section = section;
        this.itemIdentification = itemIdentification;
    }
}
