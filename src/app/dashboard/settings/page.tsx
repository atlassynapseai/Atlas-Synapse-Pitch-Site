"use client";

import * as React from "react";
import { toast } from "sonner";
import { Check, Globe, Link2, ShieldCheck } from "lucide-react";

import { useAppStore } from "@/lib/store";
import { useFakeLoading } from "@/hooks/use-fake-loading";
import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

type Platform = { name: string; connected: boolean };

export default function SettingsPage() {
  const ready = useFakeLoading(380);
  const userName = useAppStore((s) => s.userName);
  const userEmail = useAppStore((s) => s.userEmail);

  const [name, setName] = React.useState(userName);
  const [email, setEmail] = React.useState(userEmail ?? "");
  const [company, setCompany] = React.useState("BrightPath Legal");

  const [platforms, setPlatforms] = React.useState<Platform[]>([
    { name: "OpenAI", connected: true },
    { name: "Anthropic", connected: false },
    { name: "LangChain", connected: false },
  ]);
  const [oauthTarget, setOauthTarget] = React.useState<string | null>(null);
  const [oauthLoading, setOauthLoading] = React.useState(false);

  const [emailAlerts, setEmailAlerts] = React.useState(true);
  const [slackAlerts, setSlackAlerts] = React.useState(false);
  const [globalThreshold, setGlobalThreshold] = React.useState(85);
  const [digest, setDigest] = React.useState<"immediate" | "daily" | "weekly">("immediate");

  function connectPlatform(name: string) {
    setOauthTarget(name);
    setOauthLoading(true);
    setTimeout(() => {
      setOauthLoading(false);
      setTimeout(() => {
        setPlatforms((prev) =>
          prev.map((p) => (p.name === name ? { ...p, connected: true } : p)),
        );
        setOauthTarget(null);
        toast.success(`${name} connected successfully.`);
      }, 400);
    }, 1500);
  }

  if (!ready) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-40" />
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-48" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-2xl font-semibold text-[#1A3A5C] dark:text-slate-50">Settings</h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Manage your profile, connections, alerts, and privacy preferences.
        </p>
      </div>

      {/* Profile */}
      <Card className="border-slate-200/80 dark:border-slate-800">
        <CardHeader>
          <CardTitle className="text-base">Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Company name</Label>
            <Input value={company} onChange={(e) => setCompany(e.target.value)} />
          </div>
          <Button
            size="sm"
            onClick={() => toast.success("Profile saved.")}
            className="bg-[#1A3A5C] hover:bg-[#14314d]"
          >
            Save changes
          </Button>
        </CardContent>
      </Card>

      {/* Connected platforms */}
      <Card className="border-slate-200/80 dark:border-slate-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Link2 className="h-4 w-4" />
            Connected platforms
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {platforms.map((p) => (
            <div
              key={p.name}
              className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3 dark:border-slate-800"
            >
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-slate-400" />
                <span className="font-medium text-slate-900 dark:text-white">{p.name}</span>
              </div>
              {p.connected ? (
                <div className="flex items-center gap-2">
                  <Badge variant="success">Connected</Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-[#C62828]"
                    onClick={() => {
                      setPlatforms((prev) =>
                        prev.map((x) =>
                          x.name === p.name ? { ...x, connected: false } : x,
                        ),
                      );
                      toast.success(`${p.name} disconnected.`);
                    }}
                  >
                    Disconnect
                  </Button>
                </div>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => connectPlatform(p.name)}
                >
                  Connect
                </Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* OAuth mock dialog */}
      <Dialog open={!!oauthTarget} onOpenChange={() => setOauthTarget(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Connect {oauthTarget}</DialogTitle>
            <DialogDescription>
              Atlas Synapse wants read-only access to your {oauthTarget} agent activity.
            </DialogDescription>
          </DialogHeader>
          {oauthLoading ? (
            <div className="flex flex-col items-center gap-3 py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-[#2E75B6]" />
              <p className="text-sm text-slate-500">Authorizing…</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 py-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950/40">
                <Check className="h-6 w-6 text-[#2E7D32]" />
              </div>
              <p className="text-sm font-medium text-[#2E7D32]">Connected!</p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Alert preferences */}
      <Card className="border-slate-200/80 dark:border-slate-800">
        <CardHeader>
          <CardTitle className="text-base">Alert preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap gap-4">
            {[
              { label: "Email", on: emailAlerts, toggle: setEmailAlerts },
              { label: "Slack", on: slackAlerts, toggle: setSlackAlerts },
            ].map(({ label, on, toggle }) => (
              <div key={label} className="flex items-center gap-3">
                <button
                  type="button"
                  className={cn(
                    "relative h-6 w-11 rounded-full transition-colors",
                    on ? "bg-[#2E75B6]" : "bg-slate-300 dark:bg-slate-700",
                  )}
                  onClick={() => {
                    toggle(!on);
                    toast.success(`${label} alerts ${on ? "disabled" : "enabled"}.`);
                  }}
                >
                  <span
                    className={cn(
                      "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform",
                      on ? "left-[22px]" : "left-0.5",
                    )}
                  />
                </button>
                <span className="text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>

          <div>
            <Label>Severity threshold (global default)</Label>
            <div className="mt-2 flex items-center gap-3">
              <input
                type="range"
                min={50}
                max={99}
                value={globalThreshold}
                onChange={(e) => setGlobalThreshold(Number(e.target.value))}
                className="flex-1 accent-[#2E75B6]"
              />
              <span className="w-12 text-right text-sm font-semibold">{globalThreshold}%</span>
            </div>
          </div>

          <div>
            <Label>Digest frequency</Label>
            <div className="mt-2 flex gap-2">
              {(["immediate", "daily", "weekly"] as const).map((opt) => (
                <button
                  key={opt}
                  type="button"
                  className={cn(
                    "rounded-md border px-4 py-1.5 text-sm font-medium capitalize transition-colors",
                    digest === opt
                      ? "border-[#2E75B6] bg-[#2E75B6]/10 text-[#2E75B6]"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300",
                  )}
                  onClick={() => {
                    setDigest(opt);
                    toast.success(`Digest set to ${opt}.`);
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data & Privacy */}
      <Card className="border-slate-200/80 dark:border-slate-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <ShieldCheck className="h-4 w-4" />
            Data & Privacy
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium">What data we store</p>
            <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Atlas Synapse captures agent activity traces in a structured, immutable log. Identity
              markers (emails, phone numbers, SSNs, and card numbers) are stripped at the edge
              before data reaches our systems. Content (what was said, advised, or quoted) is
              preserved for evaluation. All data is encrypted at rest (AES-256) and in transit
              (TLS 1.3).
            </p>
          </div>
          <Separator />
          <div>
            <p className="text-sm font-medium">Example of a redacted trace</p>
            <div className="mt-2 rounded-lg bg-slate-50 p-4 text-sm text-slate-700 dark:bg-slate-900 dark:text-slate-200">
              <p className="font-mono text-xs leading-relaxed">
                &quot;Customer <span className="rounded bg-amber-100 px-1 text-[#E65100] dark:bg-amber-900/40">[EMAIL]</span> asked
                about return policy for order <span className="rounded bg-amber-100 px-1 text-[#E65100] dark:bg-amber-900/40">[REDACTED]</span>.
                Bot correctly quoted the 30-day window and offered a prepaid label. Customer
                confirmed satisfaction.&quot;
              </p>
            </div>
          </div>
          <Separator />
          <div>
            <p className="text-sm font-medium">Retention</p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              90-day default retention. Deletion on request. No data is shared with third parties.
            </p>
          </div>
          <a href="#" className="text-sm font-medium text-[#2E75B6] hover:underline">
            View full privacy policy →
          </a>
        </CardContent>
      </Card>

      {/* Plan */}
      <Card className="border-[#6A1B9A]/20 dark:border-purple-900/40">
        <CardHeader>
          <CardTitle className="text-base">Your plan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <Badge variant="ai">Beta, free</Badge>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            You&apos;re on the founding member beta. When we launch paid plans, you&apos;ll get a
            locked-in rate as a thank-you for being early. No credit card required during beta.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
