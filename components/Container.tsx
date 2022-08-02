import React from "react";

interface IContainerProps {
  children?: JSX.Element;
}

function Container(props: IContainerProps) {
  return <div className="max-w-6xl w-full mx-auto px-2">{props.children}</div>;
}

export default Container;
