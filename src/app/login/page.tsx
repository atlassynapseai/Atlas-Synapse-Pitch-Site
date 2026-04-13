"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function LoginPage() {
  const router = useRouter();
  const signIn = useAppStore((s) => s.signIn);
  const [email, setEmail] = React.useState("demo@brightpath.legal");
  const [password, setPassword] = React.useState("anything");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    signIn(email.trim() || "demo@brightpath.legal");
    toast.success("Welcome back. Loading your workspace.");
    router.push("/dashboard");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 dark:bg-slate-950">
      <Link href="/" className="mb-8 text-lg font-semibold text-[#1A3A5C] dark:text-slate-100">
        Atlas Synapse
      </Link>
      <Card className="w-full max-w-md border-slate-200/80 dark:border-slate-800">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>Demo: any email and password will open the BrightPath workspace.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full bg-[#1A3A5C] hover:bg-[#14314d]">
              Continue
            </Button>
          </form>
          <div className="relative my-6">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs text-slate-500 dark:bg-slate-950">
              or
            </span>
          </div>
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => toast.message("Google sign-in is disabled in this demo.")}
          >
            Sign in with Google
          </Button>
          <p className="mt-6 text-center text-xs text-slate-500">
            New here?{" "}
            <Link href="/" className="font-medium text-[#2E75B6] hover:underline">
              Back to marketing site
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
