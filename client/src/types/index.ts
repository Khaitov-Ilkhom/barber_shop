export interface Register {
  phone:      string;
  first_name: string;
  last_name:  string;
  role:       string;
  password:   string;
  _id:        string;
  __v:        number;
}

export interface Login {
  user:  User;
  token: string;
}

export interface User {
  _id:        string;
  phone:      string;
  first_name: string;
  last_name:  string;
  role:       string;
  password:   string;
  __v:        number;
}