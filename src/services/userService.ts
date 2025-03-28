import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const userService = {
  /**
   * Creates a new user
   * @param data User data
   */
  async createUser(data: {
    first_name: string;
    last_name: string;
    email: string;
    password_hash: string;
  }) {
    return prisma.user.create({ data });
  },

  /**
   * Retrieves all users
   */
  async getAllUsers() {
    return prisma.user.findMany();
  },

  /**
   * Retrieves a user by their ID
   * @param id The user ID
   */
  async getUserById(id: number) {
    return prisma.user.findUnique({ where: { id } });
  },

  /**
   * Updates an existing user
   * @param id The user ID
   * @param data The updated user data
   */
  async updateUser(
    id: number,
    data: {
      first_name?: string;
      last_name?: string;
      email?: string;
      password_hash?: string;
    }
  ) {
    return prisma.user.update({ where: { id }, data });
  },

  /**
   * Deletes a user
   * @param id The user ID
   */
  async deleteUser(id: number) {
    return prisma.user.delete({ where: { id } });
  },

  /**
   * Finds a user by their email address
   * @param email The email address
   */
  async findUserByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  },
};
