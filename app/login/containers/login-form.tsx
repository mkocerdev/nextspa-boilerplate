"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { t } = useTranslation();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      // Create a promise for the login operation
      const loginPromise = authClient.login(username, password);

      // Use toast.promise to show loading, success, and error states
      await toast.promise(loginPromise, {
        loading: t("common.loading"),
        success: t("login.form.success"),
        error: (err) =>
          err instanceof Error ? err.message : "An unknown error occurred",
      });

      // Get the result from the promise
      const result = await loginPromise;

      // Save authentication data to localStorage
      authClient.saveAuthData(result.user, result.tokens);

      // Redirect to dashboard
      router.push("/company/dashboard");
    } catch (err) {
      // Error is already handled by toast.promise
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleLogin}>
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="email">{t("login.form.email")}</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">{t("login.form.password")}</Label>
              <a
                href="#"
                className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
              >
                {t("login.form.forgotYourPassword")}
              </a>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="*********"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t("login.form.loading")}
              </>
            ) : (
              t("login.form.button")
            )}
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          {t("login.form.dontHaveAccount") + " "}
          <a href="/register" className="underline underline-offset-4">
            {t("login.form.signUp")}
          </a>
        </div>
      </form>
    </div>
  );
}
