db = db.getSiblingDB('gf-kanban'); // Switch to 'gf-kanban' database

// Create the database user
db.createUser({
  user: 'mongo',
  pwd: 'mongo',
  roles: [
    {
      role: 'readWrite',
      db: 'gf-kanban',
    },
  ],
});

// Create users collection and insert initial users
db.users.insertMany([
  {
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Developer',
    password: '$2a$12$0PUMYPvL7f3mJczwUoX0NeUmefRaPf1UlQ9jOrt04dCN/HMKCPKsu', // Hashed password
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'Designer',
    password: '$2a$12$0PUMYPvL7f3mJczwUoX0NeUmefRaPf1UlQ9jOrt04dCN/HMKCPKsu', // Hashed password
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Michael Brown',
    email: 'michael.brown@example.com',
    role: 'Manager',
    password: '$2a$12$0PUMYPvL7f3mJczwUoX0NeUmefRaPf1UlQ9jOrt04dCN/HMKCPKsu', // Hashed password
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    role: 'Project Manager',
    password: '$2a$12$0PUMYPvL7f3mJczwUoX0NeUmefRaPf1UlQ9jOrt04dCN/HMKCPKsu', // Hashed password
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Chris Green',
    email: 'chris.green@example.com',
    role: 'Writer',
    password: '$2a$12$0PUMYPvL7f3mJczwUoX0NeUmefRaPf1UlQ9jOrt04dCN/HMKCPKsu', // Hashed password
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Laura White',
    email: 'laura.white@example.com',
    role: 'Realtor',
    password: '$2a$12$0PUMYPvL7f3mJczwUoX0NeUmefRaPf1UlQ9jOrt04dCN/HMKCPKsu', // Hashed password
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Mark Davis',
    email: 'mark.davis@example.com',
    role: 'Assistant',
    password: '$2a$12$0PUMYPvL7f3mJczwUoX0NeUmefRaPf1UlQ9jOrt04dCN/HMKCPKsu', // Hashed password
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]);

// Create columns collection and insert initial columns
db.columns.insertMany([
  { name: 'To Do', order: 1, createdAt: new Date(), updatedAt: new Date() },
  {
    name: 'In Progress',
    order: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  { name: 'Done', order: 3, createdAt: new Date(), updatedAt: new Date() },
]);

// Retrieve columns and map their names to their ObjectIds
const columns = db.columns.find().toArray();
const columnMap = columns.reduce((map, column) => {
  map[column.name] = column._id; // Map column name to its ObjectId
  return map;
}, {});

// Retrieve users to assign them to tasks
const users = db.users.find().toArray();
const userMap = users.reduce((map, user) => {
  map[user.name] = user._id; // Map user name to their ObjectId
  return map;
}, {});

// Create tasks collection and insert initial tasks
db.tasks.insertMany([
  {
    title: 'Review request for proposal',
    columnId: columnMap['To Do'], // Reference the columnId
    description: 'Review the document for potential issues.',
    dueDate: new Date('2024-12-01'),
    userId: userMap['John Doe'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'Develop BIM model of wind shear impact',
    columnId: columnMap['To Do'], // Reference the columnId
    description: 'Create a detailed BIM model to assess wind shear impact.',
    dueDate: new Date('2024-12-05'),
    userId: userMap['Jane Smith'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'Prepare for client meeting with Addisons',
    columnId: columnMap['In Progress'], // Reference the columnId
    description: 'Gather all materials and prepare a presentation.',
    dueDate: new Date('2024-12-02'),
    userId: userMap['Michael Brown'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'Addison client meeting Thursday 11 a.m.',
    columnId: columnMap['In Progress'], // Reference the columnId
    description: 'Attend and present project updates.',
    dueDate: new Date('2024-12-03'),
    userId: userMap['Sarah Johnson'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'Write speech on housing trends',
    columnId: columnMap['In Progress'], // Reference the columnId
    description: 'Draft a speech for the upcoming conference.',
    dueDate: new Date('2024-12-04'),
    userId: userMap['Chris Green'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'Speak to realtors dinner Wed 7 p.m.',
    columnId: columnMap['In Progress'], // Reference the columnId
    description: 'Discuss market insights and future trends.',
    dueDate: new Date('2024-12-04'),
    userId: userMap['Laura White'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'Write meeting minutes from client meeting',
    columnId: columnMap['Done'], // Reference the columnId
    description: 'Document all key points and action items.',
    dueDate: new Date('2024-11-28'),
    userId: userMap['Mark Davis'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]);

print('Database initialization completed with columnId!');
