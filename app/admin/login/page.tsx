import { Suspense } from "react";
import LoginClient from "./LoginClient";

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "#0c1015" }} />}>
      <LoginClient />
    </Suspense>
  );
}
