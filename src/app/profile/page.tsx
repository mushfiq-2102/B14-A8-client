import { Suspense } from "react";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import ProfileForm from "@/components/profile/ProfileForm";
import { ProfileSkeleton } from "@/components/skeletons";
import { SectionHeading } from "@/components/section-heading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

async function Profile() {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;

  if (!user) return null;

  return (
    <div className="grid gap-10 rounded-xl border border-border bg-card p-8 shadow-sm md:grid-cols-[220px_1fr]">
      <div className="flex flex-col items-center text-center">
        <Avatar className="size-28">
          <AvatarImage referrerPolicy="no-referrer" src={user.image as string} />
          <AvatarFallback className="text-3xl">{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <p className="mt-4 text-xl font-semibold text-foreground">{user.name}</p>
        <p className="mt-1 text-sm break-all text-muted-foreground">{user.email}</p>
      </div>
      <ProfileForm name={user.name} image={user.image ?? ""} />
    </div>
  );
}

export default function ProfilePage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <SectionHeading
        as="h1"
        title="My Profile"
        subtitle="Update your name and profile picture."
        className="mb-8"
      />
      <Suspense fallback={<ProfileSkeleton />}>
        <Profile />
      </Suspense>
    </main>
  );
}
