import { Alert, AlertDescription } from "@/Components/ui/alert";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { PageProps } from "@/types";
import { Link, useForm, usePage } from "@inertiajs/react";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { FormEventHandler } from "react";

interface UpdateProfileInformationProps {
  mustVerifyEmail: boolean;
  status?: string;
}

export default function UpdateProfileInformation({
  mustVerifyEmail,
  status,
}: UpdateProfileInformationProps) {
  const { toast } = useToast();

  const user = usePage<PageProps>().props.auth.user;

  const { data, setData, patch, errors, processing, recentlySuccessful } =
    useForm({
      name: user.name ?? "",
      email: user.email ?? "",
    });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    // patch(route("profile.update"));
    // I got this from UpdatePasswordForm's updatePassword function

    patch(route("profile.update"), {
      preserveState: true,
      preserveScroll: true,
      onSuccess: () => {
        toast({
          title: (
            <div className="flex items-center">
              <CheckCircle className="mr-2 h-4 w-4" />
              <span>Profile Updated</span>
            </div>
          ),
          description:
            "Your profile information has been successfully updated.",
          variant: "success",
          duration: 5000,
        });
      },
      onError: () => {
        toast({
          title: (
            <div className="flex items-center">
              <XCircle className="mr-2 h-4 w-4" />
              <span>Update Failed</span>
            </div>
          ),
          description:
            "There was an error updating your profile. Please try again.",
          variant: "destructive",
          duration: 5000,
        });
      },
    });
  };

  return (
    <form onSubmit={submit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={data.name}
          onChange={(e) => setData("name", e.target.value)}
          required
          autoComplete="name"
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={data.email}
          onChange={(e) => setData("email", e.target.value)}
          required
          autoComplete="username"
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email}</p>
        )}
      </div>

      {mustVerifyEmail && user.email_verified_at === null && (
        <Alert>
          <AlertDescription>
            Your email address is unverified.
            <Link
              href={route("verification.send")}
              method="post"
              as="button"
              className="underline text-sm text-primary hover:text-primary/80 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Click here to re-send the verification email.
            </Link>
          </AlertDescription>
        </Alert>
      )}

      {status === "verification-link-sent" && (
        <Alert>
          <AlertDescription className="text-sm text-primary">
            A new verification link has been sent to your email address.
          </AlertDescription>
        </Alert>
      )}

      <div className="flex justify-between items-center">
        <Button type="submit" disabled={processing}>
          {processing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
        {recentlySuccessful && !processing && (
          <span className="text-sm text-muted-foreground flex items-center">
            <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
            Saved successfully
          </span>
        )}
      </div>
    </form>
  );
}
