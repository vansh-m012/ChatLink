import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["error", "query"],
});

export default prisma;














//Jo bhi error aayega → console me dikh jayega.
//Har query jo DB me ja rahi hai → wo bhi console me print hogi.