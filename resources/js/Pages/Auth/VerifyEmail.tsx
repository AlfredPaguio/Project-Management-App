import LoadingSpinner from "@/Components/LoadingSpinner";
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
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function VerifyEmail({ status }: { status?: string }) {
  const { post, processing } = useForm({});

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route("verification.send"));
  };

  return (
    <GuestLayout>
      <Head title="Email Verification" />
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">
            Email Verification
          </CardTitle>
          <CardDescription>
            Thanks for signing up! Before getting started, could you verify your
            email address by clicking on the link we just emailed to you?
          </CardDescription>
        </CardHeader>
        <CardContent>
          {status === "verification-link-sent" && (
            <Alert className="mb-4">
              <AlertDescription>
                A new verification link has been sent to the email address you
                provided during registration.
              </AlertDescription>
            </Alert>
          )}
          <form onSubmit={submit}>
            <Button type="submit" className="w-full" disabled={processing}>
              {processing ? (
                <>
                  <LoadingSpinner aria-label="Resending verification email..." />
                  Resending verification email...
                </>
              ) : (
                "Resend Verification Email"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link
            href={route("logout")}
            method="post"
            as="button"
            className="text-sm text-primary underline-offset-4 transition-colors hover:underline"
          >
            Log Out
          </Link>
        </CardFooter>
      </Card>
    </GuestLayout>
  );
}
