import React from "react";
import Button, { IButtonProps } from "components/common/Button";
import Spinner from "components/common/Spinner";

interface IProps extends IButtonProps {
  isLoading: boolean;
}

const LoadingButton = ({
  isLoading,
  children,
  disabled,
  ...restProps
}: IProps) => {
  return (
    <div className="relative">
      <Button {...restProps} disabled={isLoading || disabled}>
        {children}
      </Button>
      {isLoading && (
        <span className="absolute top-2/4 left-2/4 -translate-y-1/2 -translate-x-1/2">
          <Spinner size="md" />
        </span>
      )}
    </div>
  );
};

export default LoadingButton;
