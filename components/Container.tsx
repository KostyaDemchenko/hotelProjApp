import React, { ComponentPropsWithoutRef, ElementType } from "react";

type ContainerProps<T extends ElementType = "div"> = {
  as?: T;
  className?: string;
  children?: React.ReactNode;
} & ComponentPropsWithoutRef<T>;

const Container = <T extends ElementType = "div">({
  as,
  children,
  className = "",
  ...props
}: ContainerProps<T>) => {
  const Component = as || "div";

  return (
    <Component
      className={`w-full mx-auto px-[12px] max-w-[377px] sm:max-w-[710px] lg:max-w-[1300px] 2xl:max-w-[1481px] ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Container;
