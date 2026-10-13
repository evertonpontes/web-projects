import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-muted flex flex-1 flex-col items-center justify-center">
      <div className="bg-background flex w-full max-w-sm items-center justify-between gap-4 rounded-2xl px-6 py-8 shadow">
        <Button variant="outline" size="lg" nativeButton={false} className="flex-1 px-4" render={<Link href="/login">Login</Link>}></Button>
        <Button size="lg" nativeButton={false} className="flex-1 px-4" render={<Link href="/sign-up">Get Started</Link>} />
      </div>
    </div>
  );
}
