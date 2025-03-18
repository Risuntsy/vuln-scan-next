export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-full flex items-center justify-center  ">
      <div className="w-full max-w-md p-8">{children}</div>
    </div>
  );
}
