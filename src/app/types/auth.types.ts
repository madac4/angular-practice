export interface ILoginUser {
  id: number;
  image: string;
  email: string;
  token: string;
  gender: string;
  username: string;
  lastName: string;
  firstName: string;
}

export interface IFullUser {
  id: number;
  image: string;
  email: string;
  token: string;
  gender: string;
  username: string;
  lastName: string;
  firstName: string;
  maidenName: string;
  password: string;
  age: number;
  phone: string;
  birthDate: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: {
    color: string;
    type: string;
  };
  address: {
    address: string;
    city: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    postalCode: string;
    state: string;
  };
  domain: string;
  ip: string;
  macAddress: string;
  university: string;
  bank: {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
  };
  company: {
    address: {
      address: string;
      city: string;
      coordinates: {
        lat: number;
        lng: number;
      };
      postalCode: string;
      state: string;
    };
    department: string;
    name: string;
    title: string;
  };
}
