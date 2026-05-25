import Scene3D from '@/components/features/Scene3D';
import MenuButton from '@/components/layout/MenuButton';
import ProfileSection from '@/components/features/ProfileSection';
import SocialLinks from '@/components/features/SocialLinks';
import StatsSection from '@/components/features/StatsSection';
import TechStackSection from '@/components/features/TechStackSection';
import ProjectsSection from '@/components/features/ProjectsSection';
import ContactSection from '@/components/features/ContactSection';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <Scene3D />
      <MenuButton />
      <main className="relative z-10 max-w-xl mx-auto pb-4">
        <ProfileSection />
        <SocialLinks />
        <TimeBattery />
        <StatsSection />
        <TechStackSection />
        <ProjectsSection />
        <ContactSection />
        <Footer />
      </main>
    </div>
  );
}
