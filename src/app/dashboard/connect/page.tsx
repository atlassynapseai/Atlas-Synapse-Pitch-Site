"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check, Loader2, Zap, Bot, Brain } from "lucide-react";

import { useFakeLoading } from "@/hooks/use-fake-loading";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";

type Platform = "zapier" | "openai" | "anthropic";
type Step = "choose" | "authorize" | "success";

const platformMeta: Record<
  Platform,
  { name: string; icon: typeof Zap; highlight: boolean; description: string }
> = {
  zapier: {
    name: "Zapier",
    icon: Zap,
    highlight: true,
    description: "One-click connection. If your agents run through Zapier, this is the fastest path.",
  },
  openai: {
    name: "OpenAI (Direct)",
    icon: Bot,
    highlight: false,
    description: "Connect directly to your OpenAI account. Read-only access to agent activity.",
  },
  anthropic: {
    name: "Anthropic (Direct)",
    icon: Brain,
    highlight: false,
    description: "Connect directly to your Anthropic account. Read-only access to agent activity.",
  },
};

export default function ConnectPage() {
  const router = useRouter();
  const ready = useFakeLoading(350);
  const [step, setStep] = React.useState<Step>("choose");
  const [platform, setPlatform] = React.useState<Platform | null>(null);
  const [authorizing, setAuthorizing] = React.useState(false);

  function selectPlatform(p: Platform) {
    setPlatform(p);
    setStep("authorize");
  }

  function authorize() {
    setAuthorizing(true);
    setTimeout(() => {
      setAuthorizing(false);
      setStep("success");
    }, 1500);
  }

  function finish() {
    toast.success("Your agent activity will appear in your dashboard shortly.");
    router.push("/dashboard");
  }

  if (!ready) {
    return (
      <div className="space-y-6 max-w-2xl mx-auto">
        <Skeleton className="h-8 w-52" />
        <div className="grid gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {step !== "choose" && (
        <button
          type="button"
          className="flex items-center gap-1 text-sm text-[#2E75B6] hover:underline"
          onClick={() => {
            setStep("choose");
            setPlatform(null);
            setAuthorizing(false);
          }}
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back
        </button>
      )}

      <div className="text-center">
        <h1 className="text-2xl font-semibold text-[#1A3A5C] dark:text-slate-50">
          Connect an agent
        </h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          {step === "choose" && "Choose the platform your agents run on."}
          {step === "authorize" && `Authorize Atlas Synapse to read your ${platformMeta[platform!].name} activity.`}
          {step === "success" && "Connection successful!"}
        </p>
      </div>

      {/* Steps indicator */}
      <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
        {[
          { label: "Platform", active: step === "choose" },
          { label: "Authorize", active: step === "authorize" },
          { label: "Done", active: step === "success" },
        ].map((s, i) => (
          <React.Fragment key={s.label}>
            {i > 0 && <span className="h-px w-8 bg-slate-300 dark:bg-slate-700" />}
            <span
              className={
                s.active
                  ? "rounded-full bg-[#1A3A5C] px-3 py-1 font-medium text-white"
                  : "rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800"
              }
            >
              {s.label}
            </span>
          </React.Fragment>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: Choose platform */}
        {step === "choose" && (
          <motion.div
            key="choose"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
            className="grid gap-4 md:grid-cols-3"
          >
            {(["zapier", "openai", "anthropic"] as const).map((p) => {
              const meta = platformMeta[p];
              const Icon = meta.icon;
              return (
                <Card
                  key={p}
                  className={`cursor-pointer transition-shadow hover:shadow-md ${
                    meta.highlight
                      ? "border-[#2E75B6] ring-1 ring-[#2E75B6]/20"
                      : "border-slate-200/80 dark:border-slate-800"
                  }`}
                  onClick={() => selectPlatform(p)}
                >
                  <CardContent className="flex flex-col items-center p-6 text-center">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                        meta.highlight
                          ? "bg-[#2E75B6]/10"
                          : "bg-slate-100 dark:bg-slate-900"
                      }`}
                    >
                      <Icon
                        className={`h-6 w-6 ${
                          meta.highlight ? "text-[#2E75B6]" : "text-slate-600 dark:text-slate-300"
                        }`}
                      />
                    </div>
                    <p className="mt-3 font-medium text-slate-900 dark:text-white">
                      {meta.name}
                    </p>
                    {meta.highlight && (
                      <span className="mt-1 text-xs font-medium text-[#2E75B6]">Recommended</span>
                    )}
                    <p className="mt-2 text-xs leading-relaxed text-slate-500">{meta.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </motion.div>
        )}

        {/* Step 2: Authorize */}
        {step === "authorize" && platform && (
          <motion.div
            key="authorize"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
          >
            <Card className="mx-auto max-w-md border-slate-200/80 dark:border-slate-800">
              <CardContent className="p-6">
                {platform === "zapier" ? (
                  <div className="space-y-6 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#2E75B6]/10">
                      <Zap className="h-7 w-7 text-[#2E75B6]" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">
                        Atlas Synapse wants to access your Zapier account
                      </p>
                      <p className="mt-2 text-sm text-slate-500">
                        Read-only access to your Zap activity. We never modify or create Zaps.
                      </p>
                    </div>
                    <Button
                      className="w-full bg-[#2E75B6] hover:bg-[#25649c]"
                      onClick={authorize}
                      disabled={authorizing}
                    >
                      {authorizing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Authorizing…
                        </>
                      ) : (
                        "Authorize"
                      )}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-center font-medium text-slate-900 dark:text-white">
                      Sign in to {platformMeta[platform].name}
                    </p>
                    <p className="text-center text-sm text-slate-500">
                      Authorize Atlas Synapse to read your agent activity (read-only).
                    </p>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <Label>Email</Label>
                        <Input type="email" placeholder="you@company.com" defaultValue="demo@brightpath.legal" />
                      </div>
                      <div className="space-y-1">
                        <Label>Password</Label>
                        <Input type="password" defaultValue="anything" />
                      </div>
                    </div>
                    <Button
                      className="w-full bg-[#1A3A5C] hover:bg-[#14314d]"
                      onClick={authorize}
                      disabled={authorizing}
                    >
                      {authorizing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Authorizing…
                        </>
                      ) : (
                        "Authorize Atlas Synapse"
                      )}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 3: Success */}
        {step === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <Card className="mx-auto max-w-md border-[#2E7D32]/30 dark:border-emerald-800">
              <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 12 }}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950/40"
                >
                  <Check className="h-8 w-8 text-[#2E7D32]" />
                </motion.div>
                <p className="text-lg font-semibold text-[#1A3A5C] dark:text-white">
                  Connection successful!
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Your agent activity will appear in your dashboard within a few minutes. We&apos;re
                  pulling in recent data now.
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Syncing activity…
                </div>
                <Button className="mt-2 bg-[#1A3A5C] hover:bg-[#14314d]" onClick={finish}>
                  Go to dashboard
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
