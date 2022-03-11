import { _getUsers, _saveUsers } from 'src/_DATA.js';

export const fetchUsers = () => {
  return _getUsers();
};

export const newUsers = (user: {
  // ----- this to fix lost API
  id?: string;
  answers?: {};
  questioms?: [];
  // -----
  name: string;
  avatarURL: string;
}) => {
  return _saveUsers(user);
};

export const _login = (id: string) => {
  return _getUsers().then((data) => {
    return data[id];
  });
};
