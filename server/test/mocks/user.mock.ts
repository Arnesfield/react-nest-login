import { User } from '../../src/user/user.entity';

export async function createUsers(): Promise<User[]> {
  const users = [
    { username: 'user', password: 'password' },
    { username: 'test', password: 'testpass' },
    { username: 'admin', password: 'adminpass' }
  ];

  return await Promise.all(
    users.map(async (userDto, index) => {
      const user = await User.create(userDto);
      user.id = index + 1;
      return user;
    })
  );
}
