import { useRef, FormEventHandler } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { CheckCircle, Loader2 } from "lucide-react";

export default function UpdatePasswordForm() {
  const passwordInput = useRef<HTMLInputElement>(null);
  const currentPasswordInput = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const { data, setData, errors, put, reset, processing, recentlySuccessful } =
    useForm({
      current_password: "",
      password: "",
      password_confirmation: "",
    });

  const updatePassword: FormEventHandler = (e) => {
    e.preventDefault();

    put(route("password.update"), {
      preserveScroll: true,
      onSuccess: () => {
        reset();
        toast({
          title: "Password Updated",
          description: "Your password has been successfully updated.",
          duration: 5000,
        });
      },
      onError: (errors) => {
        if (errors.password) {
          reset("password", "password_confirmation");
          passwordInput.current?.focus();
        }

        if (errors.current_password) {
          reset("current_password");
          currentPasswordInput.current?.focus();
        }

        toast({
          title: "Update Failed",
          description:
            "There was an error updating your password. Please try again.",
          variant: "destructive",
          duration: 5000,
        });
      },
    });
  };

  return (
    <form onSubmit={updatePassword} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="current_password">Current Password</Label>
        <Input
          id="current_password"
          ref={currentPasswordInput}
          value={data.current_password}
          onChange={(e) => setData("current_password", e.target.value)}
          type="password"
          autoComplete="current-password"
        />
        {errors.current_password && (
          <p className="text-sm text-destructive">{errors.current_password}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">New Password</Label>
        <Input
          id="password"
          ref={passwordInput}
          value={data.password}
          onChange={(e) => setData("password", e.target.value)}
          type="password"
          autoComplete="new-password"
        />
        {errors.password && (
          <p className="text-sm text-destructive">{errors.password}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password_confirmation">Confirm Password</Label>
        <Input
          id="password_confirmation"
          value={data.password_confirmation}
          onChange={(e) => setData("password_confirmation", e.target.value)}
          type="password"
          autoComplete="new-password"
        />
        {errors.password_confirmation && (
          <p className="text-sm text-destructive">
            {errors.password_confirmation}
          </p>
        )}
      </div>

      <div className="flex justify-between items-center">
        <Button type="submit" disabled={processing}>
          {processing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Updating...
            </>
          ) : (
            "Update Password"
          )}
        </Button>
        {recentlySuccessful && !processing && (
          <span className="text-sm text-muted-foreground flex items-center">
            <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
            Password updated
          </span>
        )}
      </div>
    </form>
  );
}
