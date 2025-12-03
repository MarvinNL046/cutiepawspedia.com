"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Save, FileText } from "lucide-react";
import { useRouter } from "next/navigation";

interface BusinessNotesTabProps {
  businessId: number;
  initialNotes: string | null;
}

export function BusinessNotesTab({ businessId, initialNotes }: BusinessNotesTabProps) {
  const router = useRouter();
  const [notes, setNotes] = useState(initialNotes || "");
  const [isLoading, setIsLoading] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const hasChanges = notes !== (initialNotes || "");

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/businesses/${businessId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "updateNotes",
          notes: notes || null,
        }),
      });

      if (!res.ok) throw new Error("Failed to save notes");

      setLastSaved(new Date());
      router.refresh();
    } catch (error) {
      console.error("Error saving notes:", error);
      alert("Failed to save notes");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-cpAqua" />
          Admin Notes
        </CardTitle>
        <CardDescription>
          Internal notes about this business account. Only visible to admins.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Add notes about this business...

Examples:
- Key contact: John Smith, CEO
- Payment history: Always pays on time
- Special arrangements: Custom pricing agreed
- Support tickets: #1234, #5678
- Follow-up needed: Discuss upgrade options"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="min-h-[300px] font-mono text-sm"
        />

        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {lastSaved && (
              <span>
                Last saved:{" "}
                {lastSaved.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            )}
            {hasChanges && !lastSaved && <span>Unsaved changes</span>}
            {hasChanges && lastSaved && <span className="ml-2">• Unsaved changes</span>}
          </div>

          <Button onClick={handleSave} disabled={isLoading || !hasChanges}>
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Notes
              </>
            )}
          </Button>
        </div>

        {/* Tips */}
        <div className="bg-slate-50 rounded-lg p-4">
          <p className="text-sm font-medium mb-2">Tips for effective notes:</p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Document key contacts and their roles</li>
            <li>• Note any special pricing or arrangements</li>
            <li>• Track important conversations or decisions</li>
            <li>• Link to relevant support tickets or issues</li>
            <li>• Add follow-up reminders and action items</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
