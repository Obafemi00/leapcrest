"use client";

import { useEffect } from "react";

interface RedirectPageProps {
  url: string;
  title: string;
  description?: string;
}

/**
 * Client-side redirect component with fallback UI
 * This component redirects immediately on mount and provides a fallback link
 */
export function RedirectPageClient({ url, title, description }: RedirectPageProps) {
  useEffect(() => {
    // Immediate client-side redirect
    window.location.href = url;
  }, [url]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="text-3xl font-bold text-foreground">{title}</h1>
        {description && (
          <p className="text-muted-foreground text-lg">{description}</p>
        )}
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Redirecting to registration form...
          </p>
          <a
            href={url}
            className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Continue to Form
          </a>
          <p className="text-xs text-muted-foreground">
            If you are not redirected automatically, click the link above.
          </p>
        </div>
      </div>
    </div>
  );
}
