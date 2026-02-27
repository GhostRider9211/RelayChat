import { prisma } from "./lib/prsima.js";

async function main() {
  const users = await prisma.user.findMany();
  console.log("Connected ✅", users);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());