import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Permission, Role, User } from "@/types/user";
import { Head, Link, router } from "@inertiajs/react";

import { Button } from "@/Components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Checkbox } from "@/Components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/Components/ui/form";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import UserDetailsForm from "./partials/UserDetailsForm";
import { FormDataType, formSchema } from "./schema/formSchema";

interface UserPageProps {
  user: User;
  roles: Role[];
  permissions: Permission[];
}

export default function Edit({
  auth,
  user,
  roles,
  permissions,
}: PageProps & UserPageProps) {
  
  const form = useForm<FormDataType>({
    values: {
      name: user.name,
      email: user.email,
      password: "",
      confirmPassword: "",
      roles: user.roles.map((role) => role.id),
      permissions: user.permissions.map((permission) => permission.id),
    },
    mode: "onSubmit",
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: FormDataType) {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    if (values.password) {
      formData.append("password", values.password);
    }
    if (values.confirmPassword) {
      formData.append("password_confirmation", values.confirmPassword);
    }
    if (values.avatar) {
      formData.append("avatar", values.avatar);
    }
    values.roles.forEach((roleId) =>
      formData.append("roles[]", roleId.toString())
    );
    values.permissions.forEach((permissionId) =>
      formData.append("permissions[]", permissionId.toString())
    );
    formData.append("_method", "PATCH");

    router.post(route("user.update", user.id), formData);
  }

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <div className="flex items-center justify-center gap-x-4">
            <Button asChild>
              <Link href={route("user.index")}>
                <ArrowLeft className="mr-2 size-4" /> Back
              </Link>
            </Button>
            <h2 className="font-semibold text-md lg:text-xl xl:text-2xl text-primary leading-tight">
              Edit User
            </h2>
          </div>
        </div>
      }
    >
      <Head title="Users" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <Card className="overflow-hidden shadow-sm sm:rounded-lg">
            <CardHeader>
              <CardTitle>Edit User</CardTitle>
              <CardDescription>Update user information</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="p-4 space-y-8"
                >
                  <Tabs defaultValue="details" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="details">User Details</TabsTrigger>
                      <TabsTrigger value="roles">Roles</TabsTrigger>
                      <TabsTrigger value="permissions">Permissions</TabsTrigger>
                    </TabsList>
                    <TabsContent value="details" className="space-y-4">
                      <UserDetailsForm form={form} user={user} />
                    </TabsContent>
                    <TabsContent value="roles" className="space-y-4">
                      <FormField
                        control={form.control}
                        name="roles"
                        render={() => (
                          <FormItem>
                            <FormLabel>Roles</FormLabel>
                            <div className="space-y-2">
                              {roles.map((role) => (
                                <FormField
                                  key={role.id}
                                  control={form.control}
                                  name="roles"
                                  render={({ field }) => {
                                    return (
                                      <FormItem
                                        key={role.id}
                                        className="flex flex-row items-start space-x-3 space-y-0"
                                      >
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value?.includes(
                                              role.id
                                            )}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([
                                                    ...field.value,
                                                    role.id,
                                                  ])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) =>
                                                        value !== role.id
                                                    )
                                                  );
                                            }}
                                          />
                                        </FormControl>
                                        <FormLabel className="font-normal capitalize">
                                          {role.name.replace(/-/g, " ")}
                                        </FormLabel>
                                      </FormItem>
                                    );
                                  }}
                                />
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TabsContent>
                    <TabsContent value="permissions" className="space-y-4">
                      <FormField
                        control={form.control}
                        name="permissions"
                        render={() => (
                          <FormItem>
                            <FormLabel>Permissions</FormLabel>
                            <div className="space-y-2">
                              {permissions.map((permission) => (
                                <FormField
                                  key={permission.id}
                                  control={form.control}
                                  name="permissions"
                                  render={({ field }) => {
                                    return (
                                      <FormItem
                                        key={permission.id}
                                        className="flex flex-row items-start space-x-3 space-y-0"
                                      >
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value?.includes(
                                              permission.id
                                            )}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([
                                                    ...field.value,
                                                    permission.id,
                                                  ])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) =>
                                                        value !== permission.id
                                                    )
                                                  );
                                            }}
                                          />
                                        </FormControl>
                                        <FormLabel className="font-normal capitalize">
                                          {permission.name.replace(/-/g, " ")}
                                        </FormLabel>
                                      </FormItem>
                                    );
                                  }}
                                />
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TabsContent>
                  </Tabs>
                  <CardFooter className="flex justify-between">
                    <Button type="button" variant={"destructive"} asChild>
                      <Link href={route("user.index")}>Cancel</Link>
                    </Button>
                    <Button type="submit">Submit</Button>
                  </CardFooter>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}