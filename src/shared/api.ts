type Address = {
  city: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  country: string;
  state: string;
  street_address: string;
  street_name: string;
  zip_code: string;
};

type CreditCard = {
  cc_number: string;
};

type Employment = {
  key_skill: string;
  title: string;
};

type ServiceSubscription = {
  payment_method: string;
  plan: string;
  status: string;
  term: string;
};

export type ApiUser = {
  address: Address;
  avatar: string;
  credit_card: CreditCard;
  date_of_birth: string;
  email: string;
  employment: Employment;
  first_name: string;
  gender: string;
  id: number;
  last_name: string;
  password: string;
  phone_number: string;
  social_insurance_number: string;
  subscription: ServiceSubscription;
  uid: string;
  username: string;
};

export type ApiLoginParams = {
  email: string;
  password: string;
};
