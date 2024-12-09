import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  /**
   * Validate user credentials (email and password).
   * @param email - The user's email.
   * @param password - The plaintext password provided by the user.
   * @returns The validated user or throws an error if validation fails.
   */
  async validateUser(email: string, password: string): Promise<User | null> {
    // Find user by email
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      return null; // User not found
    }

    // Access `password` field correctly
    const isPasswordValid = await bcrypt.compare(
      password,
      user.get('password', null, { getters: false }),
    );
    if (!isPasswordValid) {
      return null; // Invalid password
    }

    return user; // Return the validated user
  }

  /**
   * Create a new user.
   * @param email - The user's email.
   * @param password - The plaintext password for the user.
   * @returns The newly created user.
   */
  async createUser(email: string, password: string): Promise<User> {
    // Check if the email already exists
    const existingUser = await this.userModel.findOne({ email }).exec();
    if (existingUser) {
      throw new UnauthorizedException('Email already in use');
    }

    // Hash the user's password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const newUser = new this.userModel({
      email,
      password: hashedPassword,
    });

    return newUser.save();
  }

  /**
   * Find a user by ID.
   * @param id - The user's ID.
   * @returns The user or null if not found.
   */
  async findUserById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }
}
