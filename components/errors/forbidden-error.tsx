"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Shield } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ForbiddenErrorProps {
  title?: string;
  message?: string;
  showBackButton?: boolean;
}

export function ForbiddenError({
  title,
  message,
  showBackButton = true,
}: ForbiddenErrorProps) {
  const { t } = useTranslation();

  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="text-center space-y-6 p-8 max-w-md mx-auto">
        {/* Error Code */}
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-orange-500">403</h1>
          <h2 className="text-xl font-semibold text-foreground">
            {title || t("errors.403.title", "Access Forbidden")}
          </h2>
        </div>

        {/* Error Message */}
        <p className="text-muted-foreground">
          {message ||
            t(
              "errors.403.message",
              "You don't have permission to access this resource."
            )}
        </p>

        {/* Error Icon */}
        <div className="flex justify-center">
          <Shield className="h-16 w-16 text-orange-500/50" />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {showBackButton && (
            <Button
              onClick={() => window.history.back()}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("errors.403.goBack", "Go Back")}
            </Button>
          )}

          <Button asChild className="flex items-center gap-2">
            <Link href="/company/dashboard">
              <Home className="h-4 w-4" />
              {t("errors.403.goHome", "Go to Dashboard")}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
