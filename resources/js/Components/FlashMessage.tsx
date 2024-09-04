import { PageProps } from "@/types";
import { usePage } from "@inertiajs/react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { CircleAlert, CircleCheck, CircleOff, Info } from "lucide-react";

type AlertVariant = "default" | "destructive" | "warning" | "success" | "info";

const iconMap: Record<AlertVariant, JSX.Element> = {
  default: <Info className="size-4" />,
  destructive: <CircleOff className="size-4" />,
  warning: <CircleAlert className="size-4" />,
  success: <CircleCheck className="size-4" />,
  info: <Info className="size-4" />,
};

function FlashMessage() {
  const { flash } = usePage<PageProps>().props;
  return (
    <>
      {flash &&
        Object.entries(flash).map(([type, message]) => {
          //* Turn "error" to "destructive" for the alert variant
          const variant =
            type === "error" ? "destructive" : (type as AlertVariant);
          const Icon = iconMap[variant];
          if (message) {
            return (
              <Alert key={type} variant={variant}>
                {Icon}
                <AlertTitle className="capitalize">{type}</AlertTitle>
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            );
          }

          return null;
        })}
    </>
  );
}

export default FlashMessage;
