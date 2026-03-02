import Navbar from "@/components/base/Navbar";
import HeroSection from "@/components/base/HeroSection";
import FeatureSection from "@/components/base/FeatureSection";
import Footer from "@/components/base/Footer";
import UserReviews from "@/components/base/UserReviews";
import { getServerSession } from "next-auth";
import { authOptions, CustomUser } from "@/app/api/auth/[...nextauth]/options";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const user = session?.user as CustomUser | null;
  return (
    <div className="min-h-screen flex flex-col ">
      {/* Header */}
      <Navbar user={user} />
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeatureSection />

      {/* User Reviews Section */}
      <UserReviews />

      {/* Footer */}
      <Footer />
    </div>
  );
}
