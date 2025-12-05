import React, { useState } from 'react';
import Layout from './components/Layout';
import Hero from './components/Hero';
import BentoGrid from './components/BentoGrid';
import TaxCreditSection from './components/TaxCreditSection';
import Testimonials from './components/Testimonials';
import ContactSection from './components/ContactSection';
import AiAdvisor from './components/AiAdvisor';
import ContactModal from './components/ContactModal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'bilan' | 'tarifs' | 'candidature'>('bilan');

  const handleOpenModal = (mode: 'bilan' | 'tarifs' | 'candidature') => {
    setModalMode(mode);
    setIsModalOpen(true);
  };

  return (
    <>
        <Layout onOpenModal={handleOpenModal}>
            <Hero onOpenModal={handleOpenModal} />
            <BentoGrid />
            <TaxCreditSection />
            <Testimonials />
            <ContactSection />
            <AiAdvisor />
        </Layout>
        
        <ContactModal 
            isOpen={isModalOpen} 
            mode={modalMode} 
            onClose={() => setIsModalOpen(false)} 
        />
    </>
  );
}

export default App;