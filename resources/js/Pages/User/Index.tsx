import { DataTable } from "@/Components/data-table/DataTable";
import { Button } from "@/Components/ui/button";
import {
  Card
} from "@/Components/ui/card";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { User } from "@/types/user";
import { Head, Link } from "@inertiajs/react";
import { Plus } from "lucide-react";
import { columns } from "./columns";

interface UserPageProps {
  users: { data: User[] };
}

function Index({ auth, users }: PageProps & UserPageProps) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex items-center justify-between">
          {/* <h2 className="font-semibold text-xl leading-tight">Users</h2> */}
          <div className="flex flex-col space-y-1.5">
            <h3 className="text-2xl font-semibold leading-tight tracking-tight">
              User Management
            </h3>
            <p className="text-sm text-muted-foreground">
              Overview of all users in the system
            </p>
          </div>
          <Button asChild>
            <Link href={route("user.create")}>
              <Plus className="mr-2 size-4" /> Create New User
            </Link>
          </Button>
        </div>
      }
    >
      <Head title="Users" />

      <div className="py-4">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <Card className=" overflow-hidden shadow-sm sm:rounded-lg">
            <DataTable columns={columns} data={users.data} key={"UserTable"} />
          </Card>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default Index;
