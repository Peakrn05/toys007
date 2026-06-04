import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProfileContent } from "@/components/partials/Profile";

export default function ProfilePage() {
  return (
    <>
      <Navbar />
      <ProfileContent />
      <Footer />
    </>
  );
}
