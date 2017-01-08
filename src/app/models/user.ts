export class User {
    id: string;
    name: string;
    avatarURL: string;
    telephone: string;
    city: string;
    telephoneOnAd: boolean;
    emailOnAd: boolean;
    methodTextMessage: boolean;
    methodCall: boolean;
    methodEmail: boolean;
    accessToken: string;

    constructor(
    id = '',
    name = '',
    avatarURL = '',
    telephone = '',
    city = '',
    telephoneOnAd = false,
    emailOnAd = false,
    methodTextMessage = false,
    methodCall = false,
    methodEmail = false,
    accessToken = '') {
        this.id = id;
        this.name = name;
        this.avatarURL = avatarURL;
        this.telephone = telephone;
        this.city = city;
        this.telephoneOnAd = telephoneOnAd;
        this.emailOnAd = emailOnAd;
        this.methodTextMessage = methodTextMessage;
        this.methodCall = methodCall;
        this.methodEmail = methodEmail;
        this.accessToken = accessToken;
    }
}
