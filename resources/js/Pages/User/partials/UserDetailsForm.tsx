import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/Components/ui/form";
import { Input } from "@/Components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { FormDataType } from "../schema/formSchema";
import { User } from "@/types/user";
import { Label } from "@/Components/ui/label";
import { UploadIcon } from "lucide-react";
import { useState } from "react";
import { getImageData } from "@/utils/getImageData";

interface UserDetailsFormProps {
  form: UseFormReturn<FormDataType>;
  user?: User;
}

function UserDetailsForm({ form, user }: UserDetailsFormProps) {
  const [previewImageAvatar, setPreviewImageAvatar] = useState<string | null>(
    user?.avatar || null
  );

  return (
    <>
      <div className="flex items-center space-x-4">
        <Avatar className="w-24 h-24">
          <AvatarImage
            src={previewImageAvatar || undefined}
            alt={form.watch("name")}
          />
          <AvatarFallback>
            {form.watch("name")?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <FormField
            control={form.control}
            name="avatar"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Avatar</FormLabel>
                <FormControl>
                  <>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const { files, displayUrl } = getImageData(e);
                        setPreviewImageAvatar(displayUrl);
                        field.onChange(files[0]);
                      }}
                      className="hidden"
                      id="avatar-upload"
                    />
                    <Label htmlFor="avatar-upload" className="cursor-pointer">
                      <div className="flex items-center space-x-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2 rounded-md">
                        <UploadIcon className="w-4 h-4" />
                        <span>Upload Image</span>
                      </div>
                    </Label>
                  </>
                </FormControl>
                <FormDescription>
                  Upload a new profile picture (optional).
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="User Name..." {...field} />
            </FormControl>
            <FormDescription>Enter the user's full name.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="Email..." {...field} type="email" />
            </FormControl>
            <FormDescription>Enter the user's email address.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input placeholder="Password..." {...field} type="password" />
            </FormControl>
            <FormDescription>
              {user
                ? "Leave blank to keep the current password."
                : "Enter a strong password."}
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="confirmPassword"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Confirm Password</FormLabel>
            <FormControl>
              <Input
                placeholder="Confirm Password..."
                {...field}
                type="password"
              />
            </FormControl>
            <FormDescription>Please confirm your password.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}

export default UserDetailsForm;
