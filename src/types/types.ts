export interface User {
  id: number;
  imageUrl: string;
  lastName: string;
  name: string;
  prefix: string;
  title: string;
}

export interface SingleUser extends User {
  email: string;
  ip: string;
  jobArea: string;
  jobDescriptor: string;
  jobType: string;
  company: {
    name: string;
    suffix: string;
  };
  address: {
    zipCode: string;
    city: string;
    streetAddress: string;
    country: string;
    state: string;
  };
}
