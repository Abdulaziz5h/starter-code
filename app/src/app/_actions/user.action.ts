import { _getUsers, _saveUser } from 'src/_DATA.js';

export const fetchUsers = () => {
  return _getUsers();
};

export const newUser = (user: {
  // ----- this to fix lost API
  id?: string;
  answers?: {};
  questioms?: [];
  // -----
  name: string;
  avatarURL: string;
}) => {
  return _saveUser(user);
};

export const _login = (id: string) => {
  return _getUsers().then((data) => {
    return data[id];
  });
};
