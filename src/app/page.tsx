import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeProvider } from "@/components/theme-provider";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <main className="container mx-auto grid items-center justify-center p-6 sm:p-12  ">
        <Card className="w-full max-w-lg sm:mt-12 sm:max-w-full ">
          <CardHeader className="text-3xl sm:text-5xl font-extrabold mb-4">
            <CardTitle>Referral Tree Manager</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-lg mb-8">
              Easily manage your referral team by initializing the tree and/or
              adding, removing, and updating agents using an intuitive interface
              built for managing your down-line.
            </CardDescription>
          </CardContent>
          <CardFooter>
            <Link href="/tree">
              <Button>Get Started</Button>
            </Link>
          </CardFooter>
        </Card>
        {/* <section className="text-center max-w-2xl mt-16">
            <h2 className="text-3xl sm:text-5xl font-extrabold mb-4">
              Build & Manage Your Referral Tree
            </h2>
            <p className="text-lg mb-8">
              Easily add, remove, and manage agents using an intuitive interface
              built with Next.js, TypeScript, Tailwind CSS, and shadcn UI
              components.
            </p>
            <Link href="/tree">
              <Button className="px-8 py-4 text-lg">Get Started</Button>
            </Link>
          </section> */}
      </main>
    </ThemeProvider>
  );
}
