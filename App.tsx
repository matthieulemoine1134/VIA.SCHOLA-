
import React, { useState } from 'react';
import Layout from './components/Layout';
import Hero from './components/Hero';
import BentoGrid from './components/BentoGrid';
import TaxCreditSection from './components/TaxCreditSection';
import ContactSection from './components/ContactSection';
import AiAdvisor from './components/AiAdvisor';
import ContactModal from './components/ContactModal';
import LoginModal from './components/LoginModal';
import ConstructionPage from './components/ConstructionPage';
import CrmDashboard from './components/crm/CrmDashboard';
import FamilyDashboard from './components/dashboards/FamilyDashboard';
import TeacherDashboard from './components/dashboards/TeacherDashboard';
import { PageView, Family, Activity, Child } from './types';
import { MOCK_FAMILIES } from './data/mockCrmData';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'bilan' | 'tarifs' | 'candidature'>('bilan');
  const [modalContent, setModalContent] = useState<{title: string, text: string} | null>(null);
  
  // Login Modal State
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [loginType, setLoginType] = useState<'family' | 'teacher' | null>(null);

  const [currentView, setCurrentView] = useState<PageView>('home');

  // Centralized State for CRM Leads
  const [crmLeads, setCrmLeads] = useState<Family[]>(MOCK_FAMILIES);

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

  const handleOpenLogin = (type: 'family' | 'teacher') => {
      setLoginType(type);
      setIsLoginOpen(true);
  };

  const handleNavigate = (view: PageView) => {
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  const handleLoginSuccess = (view: 'dashboard-famille' | 'dashboard-enseignant') => {
      setCurrentView(view);
      window.scrollTo(0, 0);
  };

  // Function to add a new lead from the public form
  const handleAddLead = (formData: any) => {
      const childFirstName = formData.details?.split(' ')[0] || 'Élève';
      const newChild: Child = {
          id: Date.now().toString() + '-c',
          firstName: childFirstName,
          class: formData.studentClass || 'Non définie',
          subjects: formData.subject || 'Soutien général',
          needs: formData.details || 'Aucun détail fourni',
          average: '-',
          school: '-',
          orientation: '-',
          personality: '-',
          hobbies: '-',
          availability: '-'
      };

      const newLead: Family = {
          id: Date.now().toString(),
          name: formData.parentName,
          civility: 'Mme/Mr',
          firstName: '',
          lastName: formData.parentName,
          email: formData.email,
          phone: formData.phone,
          address: '',
          zipCity: '',
          country: 'France',
          city: 'Narbonne (Web)', 
          status: 'Nouveau',
          children: [newChild],
          subjectNeeds: `${formData.subject || 'Soutien général'}`,
          lastContact: new Date().toISOString().split('T')[0],
          remainingHours: 0,
          source: 'Site Web',
          potentialValue: 600, 
          activities: [
              {
                  id: Date.now().toString(),
                  type: 'status_change',
                  content: 'Nouveau lead entrant depuis le site web',
                  date: new Date().toISOString().split('T')[0],
                  user: 'Système'
              }
          ]
      };
      setCrmLeads(prev => [newLead, ...prev]);
  };

  const isPublicPage = currentView === 'home' || currentView.startsWith('construction');

  return (
    <>
        <Layout 
          onOpenModal={handleOpenModal} 
          onNavigate={handleNavigate}
          onOpenLogin={handleOpenLogin}
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
            
            {currentView === 'admin' && (
              <CrmDashboard 
                initialLeads={crmLeads} 
                onLogout={() => handleNavigate('home')} 
              />
            )}

            {currentView === 'dashboard-famille' && <FamilyDashboard />}
            {currentView === 'dashboard-enseignant' && <TeacherDashboard />}
            
            {isPublicPage && <AiAdvisor />}
        </Layout>
        
        <ContactModal 
            isOpen={isModalOpen} 
            mode={modalMode} 
            customContent={modalContent}
            onClose={() => setIsModalOpen(false)} 
            onAddLead={handleAddLead}
        />

        <LoginModal 
            isOpen={isLoginOpen}
            type={loginType}
            onClose={() => setIsLoginOpen(false)}
            onLoginSuccess={handleLoginSuccess}
        />
    </>
  );
}

export default App;
