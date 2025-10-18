import I18nProvider from "@/components/I18nProvider";
import Login from "@/components/Login";

function LoginPage() {
  return (
    <I18nProvider>
      <Login isAdmin={false} />
    </I18nProvider>
  );
}

export default LoginPage;
