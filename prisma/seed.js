import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const coils = [
    {
        slug: "ChosenofIgnatiusLoyola",
        name: "Chosen of Ignatius Loyola",
        description: "Built by one Don, for all the Dons.",
        inviteOnly: true,
      },
  {
    slug: "CatholicsOfInternalLight",
    name: "Catholics of Internal Light",
    description: "A contemplative and symbol-rich path of luminous faith.",
    inviteOnly: true,
  },
  {
    slug: "ChurchOfIrregularLovins",
    name: "Church of Irregular Lovins",
    description: "A radically loving and expressive community of spiritual misfits.",
    inviteOnly: true,
  },
  {
    slug: "CongregationOfInfiniteLove",
    name: "Congregation of Infinite Love",
    description: "A peaceful order committed to the boundless nature of divine care.",
    inviteOnly: true,
  },
];

async function main() {
  for (const coil of coils) {
    await prisma.coil.upsert({
      where: { slug: coil.slug },
      update: {},
      create: coil,
    });
  }
}

main()
  .then(() => {
    console.log("✅ Coil seed complete");
    prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
