export class User {
    id: number;
    name: string;
    email: string;
    telephone: string;
    city: string;
    telephoneOnAd: boolean;
    emailOnAd: boolean;
    methodTextMessage: boolean;
    methodCall: boolean;
    methodEmail: boolean;

    constructor(
    id = 0,
    name = '',
    email = '',
    telephone = '',
    city = '',
    telephoneOnAd = false,
    emailOnAd = false,
    methodTextMessage = false,
    methodCall = false,
    methodEmail = false) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.telephone = telephone;
        this.city = city;
        this.telephoneOnAd = telephoneOnAd;
        this.emailOnAd = emailOnAd;
        this.methodTextMessage = methodTextMessage;
        this.methodCall = methodCall;
        this.methodEmail = methodEmail;
    }
}
