export interface UserData  {
  payload: User
}

export interface Login {
  payload: {
    user: User,
    token: string
  },
  message: string
}

export interface AllUser {
  payload: User[]
}

export interface ChangeRoleRes {
  message: string;
  payload: User;
}

export interface User {
  _id:        string;
  phone:      string;
  first_name: string;
  last_name:  string;
  role:       string;
  avatar:     string;
  archived:   boolean;
  password:   string;
  __v:        number;
}

export interface Profile {
  phone:      string;
  first_name: string;
  last_name:  string;
  avatar:     string;
}

export interface Message {
  message: string;
}

export interface Id {
  id: string
}

export interface ChangeRoleReq {
  id: string,
  newRole: string
}


export interface AllServices {
  message: string;
  payload: Service[];
}

export interface Service {
  _id:   string;
  name:  string;
  image: string;
  price: number;
  __v:   number;
}

export interface NewBooking {
  message: string;
  payload: Bookings;
}

export interface Bookings {
  date:    string;
  start:   string;
  end:     string;
  status:  string;
  service?: string | string[];
  client?:  string | User;
  barber?:  string | Barber;
  comment: string;
  price:   number;
  paid:    boolean;
  rating:  number[];
  _id:     string;
  __v:     number;
}

export interface AllBooking {
  message: string;
  payload: Bookings[];
}

export interface Bookings {
  _id:     string;
  date:    string;
  start:   string;
  end:     string;
  status:  string;
  service?: string | string[];
  client?:  string | User;
  barber?:  string | Barber;
  comment: string;
  price:   number;
  paid:    boolean;
  rating:  number[];
  __v:     number;
}


export interface Booking {
  date?:    string;
  start:   string;
  end:     string;
  service: Service[];
  client?:  string | User;
  barber:  string | Barber;
  price:   number;
}

export interface Barber {
  _id:        string;
  phone:      string;
  first_name: string;
  last_name:  string;
  role:       string;
  avatar:     string;
  archived:   boolean;
  password:   string;
  __v:        number;
  comments:   any[];
}

export interface AllBookingForUser {
  message: string;
  payload: Payload[];
}

export interface Payload {
  _id:    string;
  date:   string;
  start:  string;
  end:    string;
  status: string;
  barber: Barber;
  rating?: number[];
  __v:    number;
}

export interface ServicePrice {
  message: string;
  payload: ServicesPrice;
}

export interface ServicesPrice {
  services: Service[];
  total:    number;
}

export interface Service {
  _id:   string;
  price: number;
  __v:   number;
}
