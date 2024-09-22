import { Button } from "@/Components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Label } from "@/Components/ui/label";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps, PublicUser } from "@/types";
import { Head, Link } from "@inertiajs/react";
import { ArrowLeft, Pencil } from "lucide-react";

interface UserPageProps {
  user: PublicUser;
}

export default function Show({ auth, user }: PageProps & UserPageProps) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center gap-x-4">
            <Button asChild>
              <Link href={route("user.index")}>
                <ArrowLeft className="mr-2 size-4" /> Back
              </Link>
            </Button>
            <h2 className="font-semibold text-md lg:text-xl xl:text-2xl text-primary leading-tight">
              {`User "${user.name}"`}
            </h2>
          </div>
          <Button variant={"editable"} asChild>
            <Link href={route("user.edit", user.id)}>
              <Pencil className="mr-2 size-4" /> Edit
            </Link>
          </Button>
        </div>
      }
    >
      <Head title={`User: "${user.name}"`} />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-4">
            <Card>
              <CardHeader>
                <Label>User ID: {user.id}</Label>
                <CardTitle>{user.name}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
