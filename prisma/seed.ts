import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Clean existing data (optional)
  await prisma.user.deleteMany({});
  await prisma.particle.deleteMany({});

  // Seed Users with German names
  const users = [
    {
      first_name: "Thomas",
      last_name: "Müller",
      email: "thomas.mueller@beispiel.de",
      password_hash:
        "$2a$10$K9YzUb9pzCno7y5MdQpM9.O1cjrzHtcC5QL4QvlA1NDnGgNqjK/4a", // hashed 'password123'
    },
    {
      first_name: "Hannah",
      last_name: "Schmidt",
      email: "hannah.schmidt@beispiel.de",
      password_hash:
        "$2a$10$gGYgRp3NqSqFhbRDkUjYS.EQY9FRXNZy0NF4e1GlE4h4zRn8x5RBO", // hashed 'securepass'
    },
    {
      first_name: "Lukas",
      last_name: "Fischer",
      email: "lukas.fischer@beispiel.de",
      password_hash:
        "$2a$10$LTjE6qM34oYvXrJBx8.p7eLvYdg8kRwAZV1DDzUGkH6qDjbXvDNF2", // hashed 'alicepass'
    },
    {
      first_name: "Sophie",
      last_name: "Weber",
      email: "sophie.weber@beispiel.de",
      password_hash:
        "$2a$10$LTjE6qM34oYvXrJBx8.p7eLvYdg8kRwAZV1DDzUGkH6qDjbXvDNF2", // hashed 'alicepass'
    },
    {
      first_name: "Maximilian",
      last_name: "Becker",
      email: "max.becker@beispiel.de",
      password_hash:
        "$2a$10$LTjE6qM34oYvXrJBx8.p7eLvYdg8kRwAZV1DDzUGkH6qDjbXvDNF2", // hashed 'alicepass'
    },
  ];

  for (const user of users) {
    await prisma.user.create({
      data: user,
    });
  }

  console.log("Created users:", users.length);

  // Seed Particles with German names
  const particles = [
    {
      name: "Elektron",
      a: 0.5,
      m: 0.000549,
    },
    {
      name: "Myon",
      a: 0.5,
      m: 0.1057,
    },
    {
      name: "Tauon",
      a: 0.5,
      m: 1.777,
    },
    {
      name: "Up-Quark",
      a: 0.5,
      m: 0.0022,
    },
    {
      name: "Down-Quark",
      a: 0.5,
      m: 0.0047,
    },
    {
      name: "Charm-Quark",
      a: 0.5,
      m: 1.27,
    },
    {
      name: "Strange-Quark",
      a: 0.5,
      m: 0.093,
    },
    {
      name: "Top-Quark",
      a: 0.5,
      m: 172.76,
    },
    {
      name: "Bottom-Quark",
      a: 0.5,
      m: 4.18,
    },
    {
      name: "Photon",
      a: 1.0,
      m: 0,
    },
    {
      name: "Higgs-Boson",
      a: 0.0,
      m: 125.25,
    },
    {
      name: "Neutrino",
      a: 0.5,
      m: 0.00000001,
    },
  ];

  for (const particle of particles) {
    await prisma.particle.create({
      data: particle,
    });
  }

  console.log("Created particles:", particles.length);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
