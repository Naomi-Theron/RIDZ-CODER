import ProfileSection from '@/components/features/ProfileSection';
import TechStackSection from '@/components/features/TechStackSection';
import ProjectSection from '@/components/features/ProjectSection';
import ContactSection from '@/components/features/ContactSection';
import Footer from '@/components/layout/Footer';
import MenuButton from '@/components/layout/MenuButton';
import Scene3D from '@/components/features/Scene3D';

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <Scene3D />
      <MenuButton />

      <div className="relative z-10">
        <ProfileSection />
        <TechStackSection />
        <ProjectSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
}