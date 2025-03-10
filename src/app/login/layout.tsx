export default function LoginLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="flex-1 overflow-y-auto bg-background">{children}</div>;
}
