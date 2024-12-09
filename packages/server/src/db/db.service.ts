import { Injectable, OnModuleInit } from '@nestjs/common';
import mongoose, { Connection } from 'mongoose';
import { DATABASE_URL } from '@/utils/constants';

@Injectable()
export class DBService implements OnModuleInit {
  private mongoConnection: Connection;

  constructor() {
    console.log('Initializing DBService with DATABASE_URL:', DATABASE_URL);
  }

  async onModuleInit(): Promise<void> {
    try {
      console.log('Testing Mongoose connection...');

      // Connect to the database and assign the connection
      const mongooseInstance = await mongoose.connect(DATABASE_URL, {
        dbName: 'gf-kanban',
        retryWrites: true,
      });

      console.log('Mongoose connection successful');

      // Get the connection object from the Mongoose instance
      this.mongoConnection = mongooseInstance.connection;

      console.log(
        'Mongoose connection state:',
        this.mongoConnection.readyState,
      ); // Should be 1
    } catch (error) {
      console.error('Mongoose connection failed:', (error as Error).message);
      throw new Error('Failed to connect to MongoDB');
    }
  }

  getConnection(): Connection {
    if (!this.mongoConnection) {
      throw new Error('Mongoose client is not initialized');
    }
    return this.mongoConnection;
  }
}
