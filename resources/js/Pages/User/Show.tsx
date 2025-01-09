import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Label } from "@/Components/ui/label";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { User } from "@/types/user";
import { replaceQuotesAndDots } from "@/utils/replaceQuotesAndDots";
import { Head, Link } from "@inertiajs/react";
import { ArrowLeft, Pencil } from "lucide-react";

interface UserPageProps {
  user: User;
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
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={user.avatar || undefined} alt={user.name} />
                  <AvatarFallback>
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Label>User ID: {user.id}</Label>
                  <CardTitle>{user.name}</CardTitle>
                  <CardDescription>{user.email}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">Roles</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {user.roles && user.roles.length > 0 ? (
                      user.roles.map((role) => (
                        <Badge key={role.id} variant="secondary" className="capitalize">
                          {replaceQuotesAndDots(role.name)}
                        </Badge>
                      ))
                    ) : (
                      <span>No roles assigned</span>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Permissions</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {user.permissions && user.permissions.length > 0 ? (
                      user.permissions.map((permission) => (
                        <Badge key={permission.id} variant="outline" className="capitalize">
                          {replaceQuotesAndDots(permission.name)}
                        </Badge>
                      ))
                    ) : (
                      <span>No permissions assigned</span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
