type ButtonType = "success" | "error";

export default function Button({
  children,
  type,
  className = "",
}: {
  children: React.ReactNode;
  type: ButtonType;
  className?: string;
}) {
  const style = `rounded bg-gradient-to-r p-3 font-bold text-white ${className} ${
    type === "success"
      ? "from-emerald-400 to-cyan-400 hover:from-emerald-500 hover:to-cyan-500"
      : "from-red-500 to-orange-500 bg-gradient-to-r hover:from-red-600 hover:to-orange-600"
  }`;
  return <button className={style}>{children}</button>;
}
