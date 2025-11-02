"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/actions/auth.action";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";

export default function SignOutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut();
      // Keep loading until router transition finishes
      startTransition(() => {
        router.push("/");
      });
    } catch (err) {
      console.error("Sign out failed", err);
    } finally {
    }
  };

  return (
    <Button
      variant="ghost"
      className="flex items-center gap-2 text-primary-100 hover:text-red-600 cursor-pointer"
      onClick={handleSignOut}
      disabled={loading}
    >
      <LogOut size={18} />
      {loading ? "Signing out..." : "Sign Out"}
    </Button>
  );
}
