import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head, Link, router } from "@inertiajs/react";

import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
import {
  Form
} from "@/Components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { Permission, Role } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import PermissionsSelection from "./partials/PermissionsSelection";
import RolesSelection from "./partials/RolesSelection";
import UserDetailsForm from "./partials/UserDetailsForm";
import { FormDataType, formSchema } from "./schema/formSchema";

interface UserCreatePageProps {
  roles: Role[];
  permissions: Permission[];
}

export default function Create({
  auth,
  roles,
  permissions,
}: PageProps & UserCreatePageProps) {
  const [preview, setPreview] = useState("");

  const form = useForm<FormDataType>({
    mode: "onSubmit",
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      avatar: undefined,
      roles: [],
      permissions: [],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
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

    if (values.roles) {
      values.roles.forEach((roleId) =>
        formData.append("roles[]", roleId.toString())
      );
    }

    if (values.permissions) {
      values.permissions.forEach((permissionId) =>
        formData.append("permissions[]", permissionId.toString())
      );
    }

    router.post(route("user.store"), formData);
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
              Create New User
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
              <CardTitle>Create New User</CardTitle>
              <CardDescription>Enter details to create a new user</CardDescription>
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
                      <UserDetailsForm form={form} />
                    </TabsContent>
                    <TabsContent value="roles" className="space-y-4">
                      <RolesSelection form={form} roles={roles} />
                    </TabsContent>
                    <TabsContent value="permissions" className="space-y-4">
                      <PermissionsSelection
                        form={form}
                        permissions={permissions}
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
