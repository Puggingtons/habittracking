import { PropsWithChildren } from "react";

export default function FlexBox(
  props: PropsWithChildren & {
    style?: React.CSSProperties;
  }
) {
  const { children, style } = props;

  return <div style={{ display: "flex", ...style }}>{children}</div>;
}

export function ColumnFlexBox(props: PropsWithChildren) {
  return (
    <FlexBox
      {...props}
      style={{ flexDirection: "column" }}
    />
  );
}
