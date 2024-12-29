import { useRef, useState, FormEventHandler } from "react";
import { useForm } from "@inertiajs/react";
import { useToast } from "@/hooks/use-toast";
import { Button, buttonVariants } from "@/Components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/Components/ui/alert-dialog";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";

export default function DeleteUserForm() {
  const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
  const passwordInput = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const {
    data,
    setData,
    delete: destroy,
    processing,
    reset,
    errors,
  } = useForm({
    password: "",
  });

  const confirmUserDeletion = () => {
    setConfirmingUserDeletion(true);
  };

  const deleteUser: FormEventHandler = (e) => {
    e.preventDefault();

    destroy(route("profile.destroy"), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onError: () => {
        passwordInput.current?.focus();
        toast({
          title: "Deletion Failed",
          description:
            "There was an error deleting your account. Please try again.",
          variant: "destructive",
          duration: 5000,
        });
      },
      onFinish: () => reset(),
    });
  };

  const closeModal = () => {
    setConfirmingUserDeletion(false);
    reset();
  };

  return (
    <section className={`space-y-6`}>
      <header>
        <h2 className="text-lg font-medium">Delete Account</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Once your account is deleted, all of its resources and data will be
          permanently deleted. Before deleting your account, please download any
          data or information that you wish to retain.
        </p>
      </header>

      {/* <DangerButton onClick={confirmUserDeletion}>Delete Account</DangerButton> */}
      <Button variant="destructive" onClick={confirmUserDeletion}>
        Delete Account
      </Button>

      <AlertDialog
        open={confirmingUserDeletion}
        onOpenChange={setConfirmingUserDeletion}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete your account?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Once your account is deleted, all of its resources and data will
              be permanently deleted. Please enter your password to confirm you
              would like to permanently delete your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <form onSubmit={deleteUser}>
            <div className="mt-6">
              <Label htmlFor="password" className="sr-only">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                name="password"
                value={data.password}
                onChange={(e) => setData("password", e.target.value)}
                className="mt-1 block w-3/4"
                placeholder="Password"
                autoFocus
              />
              {errors.password && (
                <p className="mt-2 text-sm text-destructive">
                  {errors.password}
                </p>
              )}
            </div>
            <AlertDialogFooter className="mt-6">
              <AlertDialogCancel onClick={closeModal}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                type="submit"
                disabled={processing}
                className={buttonVariants({ variant: "destructive" })}
              >
                Delete Account
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}
