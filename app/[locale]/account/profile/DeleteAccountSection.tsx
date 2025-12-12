"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2, Trash2, AlertTriangle, ShieldAlert } from "lucide-react";
import { useTranslations } from "next-intl";

interface DeleteAccountSectionProps {
  userEmail: string;
}

export function DeleteAccountSection({ userEmail }: DeleteAccountSectionProps) {
  const router = useRouter();
  const t = useTranslations("profile");

  const [isOpen, setIsOpen] = useState(false);
  const [confirmEmail, setConfirmEmail] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    if (confirmEmail !== userEmail) {
      setError(t("deleteAccount.emailMismatch"));
      return;
    }

    setIsDeleting(true);
    setError(null);

    try {
      const response = await fetch("/api/profile", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ confirmEmail }),
      });

      if (response.ok) {
        // Account deleted successfully - redirect to home
        router.push("/");
        router.refresh();
      } else {
        const data = await response.json();
        setError(data.error || t("deleteAccount.error"));
      }
    } catch {
      setError(t("deleteAccount.error"));
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card className="border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-950/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-400">
          <ShieldAlert className="h-5 w-5" />
          {t("deleteAccount.title")}
        </CardTitle>
        <CardDescription className="text-red-600/80 dark:text-red-400/70">
          {t("deleteAccount.subtitle")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Alert variant="destructive" className="mb-4 border-red-300 dark:border-red-800">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>{t("deleteAccount.warningTitle")}</AlertTitle>
          <AlertDescription className="mt-2 text-sm">
            <ul className="list-disc list-inside space-y-1">
              <li>{t("deleteAccount.warning1")}</li>
              <li>{t("deleteAccount.warning2")}</li>
              <li>{t("deleteAccount.warning3")}</li>
              <li>{t("deleteAccount.warning4")}</li>
            </ul>
          </AlertDescription>
        </Alert>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="destructive" className="w-full sm:w-auto">
              <Trash2 className="h-4 w-4 mr-2" />
              {t("deleteAccount.button")}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-red-700 dark:text-red-400">
                <AlertTriangle className="h-5 w-5" />
                {t("deleteAccount.confirmTitle")}
              </DialogTitle>
              <DialogDescription>
                {t("deleteAccount.confirmDescription")}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="confirm-email">
                  {t("deleteAccount.confirmEmailLabel")}
                </Label>
                <p className="text-sm text-muted-foreground mb-2">
                  {t("deleteAccount.confirmEmailHint")}: <strong>{userEmail}</strong>
                </p>
                <Input
                  id="confirm-email"
                  type="email"
                  value={confirmEmail}
                  onChange={(e) => setConfirmEmail(e.target.value)}
                  placeholder={userEmail}
                  className="border-red-200 focus:border-red-400"
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                variant="outline"
                onClick={() => {
                  setIsOpen(false);
                  setConfirmEmail("");
                  setError(null);
                }}
                disabled={isDeleting}
              >
                {t("deleteAccount.cancel")}
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={isDeleting || confirmEmail !== userEmail}
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    {t("deleteAccount.deleting")}
                  </>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4 mr-2" />
                    {t("deleteAccount.confirmButton")}
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
