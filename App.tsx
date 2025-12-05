import React, { useState } from 'react';
import Layout from './components/Layout';
import Hero from './components/Hero';
import BentoGrid from './components/BentoGrid';
import TaxCreditSection from './components/TaxCreditSection';
import ContactSection from './components/ContactSection';
import AiAdvisor from './components/AiAdvisor';
import ContactModal from './components/ContactModal';
import ConstructionPage from './components/ConstructionPage';
import { PageView } from './types';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'bilan' | 'tarifs' | 'candidature'>('bilan');
  const [modalContent, setModalContent] = useState<{title: string, text: string} | null>(null);
  const [currentView, setCurrentView] = useState<PageView>('home');

  const handleOpenModal = (mode: 'bilan' | 'tarifs' | 'candidature') => {
    setModalMode(mode);
    setModalContent(null);
    setIsModalOpen(true);
  };

  const handleOpenServiceModal = (content: { title: string, text: string }) => {
      setModalMode('bilan'); // Re-use contact form logic
      setModalContent(content);
      setIsModalOpen(true);
  };

  const handleNavigate = (view: PageView) => {
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  return (
    <>
        <Layout 
          onOpenModal={handleOpenModal} 
          onNavigate={handleNavigate}
          currentView={currentView}
        >
            {currentView === 'home' && (
              <>
                <Hero onOpenModal={handleOpenModal} />
                <BentoGrid onOpenModal={handleOpenServiceModal} />
                <TaxCreditSection onOpenModal={() => handleOpenModal('bilan')} />
                <ContactSection />
              </>
            )}
            
            {currentView === 'construction-famille' && (
              <ConstructionPage 
                title="Espace Famille" 
                onBack={() => handleNavigate('home')} 
              />
            )}

            {currentView === 'construction-enseignant' && (
              <ConstructionPage 
                title="Espace Enseignant" 
                onBack={() => handleNavigate('home')} 
              />
            )}
            
            <AiAdvisor />
        </Layout>
        
        <ContactModal 
            isOpen={isModalOpen} 
            mode={modalMode} 
            customContent={modalContent}
            onClose={() => setIsModalOpen(false)} 
        />
    </>
  );
}

export default App;