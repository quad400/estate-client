export type LoginType = {
  email: string;
  password: string;
};

export type CreateUserType = {
  name: string;
  email: string;
  password: string;
};

export type CreateAgentType = {
  name: string;
  image: string;
  phone: string;
};

export type CreateEstateType = {
  title: string;
  price: string;
  images: string[];
  location: string;
  category: string;
  details: string;
};
