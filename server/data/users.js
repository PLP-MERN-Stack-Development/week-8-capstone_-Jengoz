const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: '123456', // This will be hashed by the pre-save hook
    isAdmin: true,
  },
  // Add more users if needed
];
export default users;