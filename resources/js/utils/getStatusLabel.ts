import { STATUS } from "@/constant";

function isValidStatus(status: string): status is keyof typeof STATUS {
  return status in STATUS;
}

export const getStatusLabel = (status: string): string => {
  if (isValidStatus(status)) {
    return STATUS[status];
  }
  return STATUS.unknown_status;
};
