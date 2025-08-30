// components/TechStack.tsx
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

const stack = [
  {
    name: "Next.js",
    src: "/logos/Nextjs-Icon--Streamline-Svg-Logos.svg",
  },
  {
    name: "TailwindCSS",
    src: "/logos/Tailwindcss-Icon--Streamline-Svg-Logos.svg",
  },
  { name: "PostgreSQL", src: "/logos/postgresql-svgrepo-com.svg" },
  { name: "Drizzle ORM", src: "/logos/Drizzle ORM.svg" },
  {
    name: "Clerk Auth",
    src: "/logos/Clerk--Streamline-Simple-Icons.svg",
  },
  { name: "NeonDB", src: "/logos/Neon-Icon--Streamline-Svg-Logos.svg" },
];

export default function TechStack() {
  return (
    <section className="px-6 py-16 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-10">⚡ Tech Stack</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 place-items-center">
        {stack.map((tech) => (
          <Card
            key={tech.name}
            className="w-full flex flex-col items-center p-4"
          >
            <CardContent className="flex flex-col items-center gap-2">
              <Image
                src={tech.src}
                alt={tech.name}
                width={48}
                height={48}
                className="h-12 w-12 object-contain"
              />
              <p className="text-sm font-medium text-gray-700">{tech.name}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
