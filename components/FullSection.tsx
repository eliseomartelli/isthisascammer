import React from "react";

interface IFullSectionProps {
  children?: JSX.Element;
  className: string | undefined;
}

export default function FullSection({
  children,
  className,
}: IFullSectionProps) {
  return <div className={`w-full ${className}`}>{children}</div>;
}
