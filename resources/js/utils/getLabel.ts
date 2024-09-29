interface GetLabelProps {
  value: string;
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
}

export const getLabel = ({ value, options }: GetLabelProps): string => {
  const option = options.find((option) => option.value === value);
  return option ? option.label : "Unknown";
};
