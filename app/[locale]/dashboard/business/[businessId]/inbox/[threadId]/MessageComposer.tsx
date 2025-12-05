"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2 } from "lucide-react";
import { sendMessageAction } from "./actions";

interface MessageComposerProps {
  threadId: number;
  businessId: number;
  senderUserId: number;
  locale: string;
  placeholder: string;
  sendLabel: string;
}

export function MessageComposer({
  threadId,
  businessId,
  senderUserId,
  locale,
  placeholder,
  sendLabel,
}: MessageComposerProps) {
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim() || isPending) return;

    const formData = new FormData();
    formData.append("threadId", String(threadId));
    formData.append("businessId", String(businessId));
    formData.append("senderUserId", String(senderUserId));
    formData.append("body", message.trim());
    formData.append("locale", locale);

    startTransition(async () => {
      await sendMessageAction(formData);
      setMessage("");
      router.refresh();
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Submit on Enter (but not Shift+Enter for new lines)
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        rows={2}
        className="flex-1 resize-none"
        disabled={isPending}
      />
      <Button
        type="submit"
        disabled={!message.trim() || isPending}
        className="bg-cpPink hover:bg-cpPink/90 self-end"
      >
        {isPending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            <Send className="h-4 w-4 mr-2" />
            {sendLabel}
          </>
        )}
      </Button>
    </form>
  );
}
