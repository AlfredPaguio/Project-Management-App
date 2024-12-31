import ApplicationLogo from "@/Components/ApplicationLogo";
import { Card } from "@/Components/ui/card";
import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";

export default function Guest({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-gradient-to-b from-background/80 to-accent/20">
      <div className="mb-8">
        <Link href="/" className="flex items-center justify-center">
          <ApplicationLogo className="w-20 h-20 fill-current text-primary" />
        </Link>
      </div>

      <Card className="w-full max-w-md shadow-lg">{children}</Card>
    </div>
  );
}
