import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps, User } from "@/types";
import { Head, Link } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Plus } from "lucide-react";
import { DataTable } from "@/Components/data-table/DataTable";
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
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">
            Users
          </h2>
          <Button asChild>
            <Link href={route("user.create")}>
              <Plus className="mr-2 size-4" /> Create New User
            </Link>
          </Button>
        </div>
      }
    >
      <Head title="Users" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <pre>
            <code>{JSON.stringify(users, undefined, 2)}</code>
          </pre>
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <DataTable columns={columns} data={users.data} key={"UserTable"} />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default Index;
