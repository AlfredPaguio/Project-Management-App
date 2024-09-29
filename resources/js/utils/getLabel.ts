interface GetLabelProps {
  value: string;
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
    className?: string;
  }[];
}

export const getLabel = ({
  value,
  options,
}: GetLabelProps): { label: string; className?: string } => {
  const isFound = options.find((option) => option.value === value);
  const className = isFound?.className;

  return { label: isFound ? isFound.label : value, className: className || undefined };
};
