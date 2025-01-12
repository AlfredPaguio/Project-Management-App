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
import { FormEventHandler } from "react";

export default function ForgotPassword({ status }: { status?: string }) {
  const { data, setData, post, processing, errors } = useForm({
    email: "",
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route("password.email"));
  };

  return (
    <GuestLayout>
      <Head title="Forgot Password" />

      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Forgot Password</CardTitle>
          <CardDescription>
            Forgot your password? No problem. Just let us know your email
            address and we will email you a password reset link that will allow
            you to choose a new one.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {status && (
            <Alert className="mb-4">
              <AlertDescription>{status}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                autoComplete="email"
                value={data.email}
                onChange={(e) => setData("email", e.target.value)}
                required
              />
              {errors.email && (
                <Alert variant="destructive">
                  <AlertDescription>{errors.email}</AlertDescription>
                </Alert>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={processing}>
              {processing ? (
                <>
                  <div
                    className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                    role="status"
                    aria-label="Sending reset link..."
                  />
                  Sending reset link...
                </>
              ) : (
                "Send password reset link"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            Remember your password?{" "}
            <Link
              href={route("login")}
              className="text-primary underline-offset-4 transition-colors hover:underline"
            >
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </GuestLayout>
  );
}
