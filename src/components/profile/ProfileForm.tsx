"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { notifyError, notifySuccess } from "@/lib/notify";
import { validateProfile } from "@/lib/validation";

export default function ProfileForm({
  name,
  image,
}: {
  name: string;
  image: string;
}) {
  const router = useRouter();
  const [form, setForm] = useState({ name, image });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const error = validateProfile(form.name, form.image);
    if (error) {
      notifyError("Please check the form", error);
      return;
    }

    setSaving(true);
    const { error: updateError } = await authClient.updateUser({
      name: form.name.trim(),
      image: form.image.trim(),
    });
    setSaving(false);

    if (updateError) {
      notifyError("Could not update profile", updateError.message);
      return;
    }

    notifySuccess("Profile updated", "Your changes have been saved.");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={form.name}
          onChange={(event) =>
            setForm((current) => ({ ...current, name: event.target.value }))
          }
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="image">Photo URL</Label>
        <Input
          id="image"
          type="url"
          value={form.image}
          onChange={(event) =>
            setForm((current) => ({ ...current, image: event.target.value }))
          }
          required
        />
      </div>
      <Button type="submit" disabled={saving} className="justify-self-end">
        <Save />
        {saving ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
}
