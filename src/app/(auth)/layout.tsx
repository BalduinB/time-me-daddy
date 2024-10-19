type AuthProps = { children: React.ReactNode };
export default function AuthLayout(props: AuthProps) {
  return (
    <div className="grid h-svh place-content-center items-center">
      {props.children}
    </div>
  );
}
