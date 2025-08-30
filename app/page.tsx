// app/page.tsx
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Folder, Upload, Shield } from "lucide-react";
import TechStack from "@/components/TechStack";
import { ModeToggle } from "@/components/darkMode";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}

      <section className="flex flex-col items-center justify-center flex-1 text-center px-6 py-20 bg-gradient-to-b from-white to-gray-50">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
          Modern File Manager
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mb-8">
          Upload, organize, and manage files seamlessly. <br />
          Built with <Badge>Next.js</Badge>,{" "}
          <Badge variant="secondary">Drizzle ORM</Badge>,{" "}
          <Badge variant="secondary">Clerk</Badge> &{" "}
          <Badge variant="secondary">ImageKit</Badge>.
        </p>
        <div className="flex gap-4">
          <Link href="/sign-up">
            <Button size="lg">Get Started</Button>
          </Link>
          <Link href="/sign-in">
            <Button variant="outline" size="lg">
              Sign In
            </Button>
          </Link>
        </div>
      </section>

      {/* Project Features */}
      <section className="px-6 py-20 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left side: Preview image */}
          <Image
            src="/dashboard-preview.png"
            alt="Dashboard Preview"
            width={600}
            height={400}
            className="rounded-xl shadow-xl border w-full h-auto"
          />

          {/* Right side: Features list */}
          <div>
            <h2 className="text-3xl font-bold mb-6">📂 Project Features</h2>
            <div className="grid gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center gap-3 p-4">
                  <Folder className="w-6 h-6 text-blue-500" />
                  <CardTitle className="text-lg">Folder Management</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-600 px-4 pb-4">
                  Create folders, navigate with breadcrumbs, and keep everything
                  organized.
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center gap-3 p-4">
                  <Upload className="w-6 h-6 text-green-500" />
                  <CardTitle className="text-lg">File Uploads</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-600 px-4 pb-4">
                  Upload images, documents, and preview files instantly.
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center gap-3 p-4">
                  <Shield className="w-6 h-6 text-purple-500" />
                  <CardTitle className="text-lg">
                    Secure Authentication
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-600 px-4 pb-4">
                  Powered by Clerk for reliable user authentication &
                  management.
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <TechStack />

      {/* About Me */}
      <section className="px-6 py-20 bg-white text-center">
        <h2 className="text-3xl font-bold mb-6">👨‍💻 About Me</h2>
        <p className="max-w-xl mx-auto text-gray-600 mb-8">
          Hi, I’m <span className="font-semibold">Arslan</span>, a full-stack
          developer passionate about modern web apps. This project demonstrates
          my ability to design, develop, and deploy scalable applications with
          modern technologies.
        </p>
        <div className="flex justify-center gap-6">
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noreferrer"
          >
            <Button variant="outline" className="hover:bg-blue-300" size="icon">
              <Image
                src={"/logos/Github-Icon--Streamline-Svg-Logos.svg"}
                alt={"upwork"}
                width={48}
                height={48}
                className="h-12 w-12 object-contain"
              />
            </Button>
          </a>
          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noreferrer"
          >
            <Button className="hover:bg-blue-300" variant="outline" size="icon">
              <Image
                src={"/logos/Upwork--Streamline-Svg-Logos.svg"}
                alt={"upwork"}
                width={48}
                height={48}
                className="h-12 w-12 object-contain"
              />
            </Button>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-500 text-sm border-t">
        © {new Date().getFullYear()} Arslan. All rights reserved.
      </footer>
    </div>
  );
}
