import HeroSection from './components/hero';
import PricingSection from './components/pricing/page';
import ProgramsSection from './components/programs/page';
import ScheduleSection from './components/schedule/page';
import TrainersSection from './components/trainers/page';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProgramsSection />
      <TrainersSection />
      <ScheduleSection />
      <PricingSection />


    
    </>
  );
}