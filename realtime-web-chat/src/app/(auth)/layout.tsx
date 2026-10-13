import { MessageCircleMoreIcon } from "lucide-react";
import Link from "next/link";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <main className="bg-muted flex flex-1 flex-col items-center gap-12 px-6 py-8">
      <div className="flex w-full items-center gap-4">
        <Link
          href={"/"}
          className="mx-auto flex items-center justify-center gap-2 md:mx-0"
        >
          <div className="bg-primary flex h-10 w-10 items-center justify-between rounded-md p-2 text-white">
            <MessageCircleMoreIcon strokeWidth={2.5} />
          </div>
          <span className="text-primary text-lg font-semibold tracking-tight">
            WebChat
          </span>
        </Link>
      </div>
      {children}
    </main>
  );
};

export default AuthLayout;
