"use client";

import { Button } from "@/components/ui/button";
import { RefreshCw, AlertCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

interface LoadingErrorProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryText?: string;
}

export function LoadingError({
  title,
  message,
  onRetry,
  retryText,
}: LoadingErrorProps) {
  const { t } = useTranslation();

  return (
    <div className="min-h-[200px] flex items-center justify-center p-8">
      <div className="text-center space-y-4 max-w-md mx-auto">
        {/* Error Icon */}
        <div className="flex justify-center">
          <AlertCircle className="h-12 w-12 text-destructive" />
        </div>

        {/* Error Content */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">
            {title || t("errors.loading.title", "Failed to load data")}
          </h3>
          <p className="text-muted-foreground text-sm">
            {message ||
              t(
                "errors.loading.message",
                "Something went wrong while loading the data. Please try again."
              )}
          </p>
        </div>

        {/* Retry Button */}
        {onRetry && (
          <Button
            onClick={onRetry}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            {retryText || t("errors.loading.retry", "Try Again")}
          </Button>
        )}
      </div>
    </div>
  );
}
