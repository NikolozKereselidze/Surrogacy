import I18nProvider from "@/components/I18nProvider";
import Login from "@/components/Login";

function AdminLoginPage() {
  return (
    <I18nProvider>
      <Login isAdmin={true} />
    </I18nProvider>
  );
}

export default AdminLoginPage;
