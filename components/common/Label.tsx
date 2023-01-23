const Label = ({
  children,
  ...restProps
}: React.HTMLAttributes<HTMLLabelElement>) => {
  return (
    <label
      {...restProps}
      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >
      {children}
    </label>
  );
};

export default Label;
