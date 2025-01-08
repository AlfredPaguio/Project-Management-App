import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Badge } from "@/Components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";

export default function Edit({
  auth,
  mustVerifyEmail,
  status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl leading-tight">Profile</h2>}
    >
      <Head title="Profile" />

      <div className="py-4">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center space-x-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage
                    src={auth.user.avatar || undefined}
                    alt={auth.user.name}
                  />
                  <AvatarFallback>
                    {auth.user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl font-bold">
                    {auth.user.name}
                  </CardTitle>
                  <CardDescription>{auth.user.email}</CardDescription>
                </div>
              </div>
              {/* <Button variant="outline">
                <Pencil className="w-4 h-4 mr-2" /> Edit Profile
              </Button> */}
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="info" className="w-full">
                <TabsList>
                  <TabsTrigger value="info">Info</TabsTrigger>
                  <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
                </TabsList>

                <TabsContent value="info">
                  <UpdateProfileInformationForm
                    mustVerifyEmail={mustVerifyEmail}
                    status={status}
                  />
                </TabsContent>
                <TabsContent value="roles">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Roles</h3>
                      <div className="flex flex-wrap gap-2">
                        {auth.user.roles && auth.user.roles.length > 0 ? (
                          auth.user.roles.map(({ id, name }) => (
                            <Badge
                              key={id}
                              variant="secondary"
                              className="capitalize"
                            >
                              {name.replace(/-/g, " ")}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-muted-foreground">
                            No roles assigned
                          </span>
                        )}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Permissions
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {auth.user.permissions &&
                        auth.user.permissions.length > 0 ? (
                          auth.user.permissions.map(({ id, name }) => (
                            <Badge
                              key={id}
                              variant="outline"
                              className="capitalize"
                            >
                              {name.replace(/-/g, " ")}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-muted-foreground">
                            No specific permissions
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Security</CardTitle>
              <CardDescription>
                Manage your account's security settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <UpdatePasswordForm />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Danger Zone</CardTitle>
              <CardDescription>
                Irreversible and destructive actions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DeleteUserForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
