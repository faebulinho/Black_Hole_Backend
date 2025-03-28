import { prisma } from "../app";

export class ParticleService {
  /**
   * Retrieves all particles from the database
   */
  async getAllParticles() {
    return prisma.particle.findMany();
  }

  /**
   * Retrieves a particle by its ID
   * @param id The ID of the particle to retrieve
   */
  async getParticleById(id: number) {
    return prisma.particle.findUnique({
      where: { id },
    });
  }

  /**
   * Creates a new particle
   * @param data The particle data
   */
  async createParticle(data: any) {
    return prisma.particle.create({
      data,
    });
  }

  /**
   * Updates an existing particle
   * @param id The ID of the particle to update
   * @param data The updated particle data
   */
  async updateParticle(id: number, data: any) {
    return prisma.particle.update({
      where: { id },
      data,
    });
  }

  /**
   * Deletes a particle
   * @param id The ID of the particle to delete
   */
  async deleteParticle(id: number) {
    return prisma.particle.delete({
      where: { id },
    });
  }
}

export const particleService = new ParticleService();
