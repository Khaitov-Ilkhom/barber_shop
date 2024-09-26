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
