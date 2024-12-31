import Checkbox from "@/Components/Checkbox";
import { Alert, AlertDescription } from "@/Components/ui/alert";
import { Button } from "@/Components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler, useEffect } from "react";

export default function Login({
  status,
  canResetPassword,
}: {
  status?: string;
  canResetPassword: boolean;
}) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
    password: "",
    remember: false,
  });

  useEffect(() => {
    return () => {
      reset("password");
    };
  }, []);

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route("login"));
  };

  return (
    <GuestLayout>
      <Head title="Log in" />

      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Log in</CardTitle>
          <CardDescription>
            Welcome back! Please log in to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {status && (
            <Alert className="mb-4">
              <AlertDescription>{status}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={submit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={data.email}
                  autoComplete="username"
                  autoFocus
                  onChange={(e) => setData("email", e.target.value)}
                />
                {errors.email && (
                  <Alert variant="destructive">
                    <AlertDescription>{errors.email}</AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  value={data.password}
                  autoComplete="current-password"
                  onChange={(e) => setData("password", e.target.value)}
                />
                {errors.password && (
                  <Alert variant="destructive">
                    <AlertDescription>{errors.password}</AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="flex items-center">
                <Checkbox
                  id="remember"
                  name="remember"
                  checked={data.remember}
                  onChange={(e) =>
                    setData("remember", e.target.checked as boolean)
                  }
                />
                <Label htmlFor="remember" className="ml-2">
                  Remember me
                </Label>
              </div>
            </div>

            <CardFooter className="flex justify-between mt-6">
              {canResetPassword && (
                <Button variant={"link"} className="text-sm" asChild>
                  <Link href={route("password.request")}>
                    Forgot your password?
                  </Link>
                </Button>
              )}

              <Button type="submit" disabled={processing}>
                Log in
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </GuestLayout>
  );
}
