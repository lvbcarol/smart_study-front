// src/pages/TermsOfUse.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar'; // Importando a Navbar para consistência
import { FaArrowLeft } from 'react-icons/fa';

const TermsOfUse: React.FC = () => {
  const backgroundStyle = { background: 'linear-gradient(135deg, #1e0a3c 0%, #2A0E46 100%)' };

  return (
    <div style={backgroundStyle} className="min-h-screen text-white">
      <Navbar />
      <main className="container mx-auto p-4 md:p-8">
        <div className="bg-white text-gray-800 p-8 md:p-12 rounded-lg shadow-2xl max-w-4xl mx-auto">
          
          <h1 className="text-4xl font-bold mb-2">Terms of Use</h1>
          <p className="text-gray-500 mb-8">Last Updated: 2025-07-07</p>

          <div className="space-y-6 prose max-w-none">
            <p>Welcome to Smart Study! These Terms of Use ("Terms") govern your access to and use of our website, services, and applications (collectively, the "Service"). Please read these Terms carefully before using our Service.</p>
            <p>By accessing or using the Service, you agree to be bound by these Terms.</p>

            <h2 className="text-2xl font-bold pt-4 border-t mt-8">1. Introduction to Our Service</h2>
            <p>Smart Study is an AI-powered virtual study assistant designed to help students achieve their academic goals. Our Service allows you to create digital notebooks, generate summaries and quizzes from your study topics, and track your learning progress (the "Features").</p>

            <h2 className="text-2xl font-bold pt-4 border-t mt-8">2. User Accounts</h2>
            <p><strong>Eligibility:</strong> You must be at least 13 years old to create an account and use the Service.</p>
            <p><strong>Account Security:</strong> You are responsible for safeguarding your account password and for any activities or actions under your account. You agree to notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.</p>
            <p><strong>Account Information:</strong> You agree to provide us with accurate, complete, and current registration information.</p>

            <h2 className="text-2xl font-bold pt-4 border-t mt-8">3. User-Generated Content</h2>
            <p><strong>Your Content:</strong> You retain full ownership of the content you create within the Service, including your notebook titles, lesson titles, and the topics you submit to our AI features ("User Content").</p>
            <p><strong>License to Us:</strong> By using the Service, you grant Smart Study a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and process your User Content solely for the purpose of operating and providing the Service to you.</p>

            <h2 className="text-2xl font-bold pt-4 border-t mt-8">4. Use of AI-Generated Content</h2>
            <p><strong>AI as a Tool:</strong> The summaries, quizzes, and feedback provided by our artificial intelligence features ("AI Content") are intended for study purposes only. They are generated based on the information you provide and public data.</p>
            <p><strong>Disclaimer:</strong> While we strive for accuracy, AI Content may contain errors or inaccuracies. It is not a substitute for professional academic or instructional advice. You are responsible for verifying the information against your course materials and other reliable sources. Smart Study is not liable for any academic or other consequences resulting from the use of AI Content.</p>

            <h2 className="text-2xl font-bold pt-4 border-t mt-8">5. Acceptable Use Policy</h2>
            <p>You agree not to misuse the Service or help anyone else to do so. You agree not to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Probe, scan, or test the vulnerability of any system or network.</li>
              <li>Breach or otherwise circumvent any security or authentication measures.</li>
              <li>Submit content that is unlawful, harmful, defamatory, obscene, or otherwise objectionable.</li>
              <li>Use the Service to infringe on the intellectual property rights of others.</li>
              <li>Use the Service to generate content for academic dishonesty (e.g., plagiarism).</li>
            </ul>

            <h2 className="text-2xl font-bold pt-4 border-t mt-8">6. Intellectual Property</h2>
            <p>All rights, title, and interest in and to the Service (excluding User Content), including its "look and feel," are and will remain the exclusive property of Carolina Lansoni Vilas Boas and her licensors. The Service is protected by copyright, trademark, and other laws of both Brazil and foreign countries.</p>

            <h2 className="text-2xl font-bold pt-4 border-t mt-8">7. Termination</h2>
            <p>We may terminate or suspend your access to the Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.</p>

            <h2 className="text-2xl font-bold pt-4 border-t mt-8">8. Disclaimers and Limitation of Liability</h2>
            <p>The Service is provided on an "AS IS" and "AS AVAILABLE" basis. While we aim to provide a high-quality experience, we do not warrant that the service will be uninterrupted, secure, or error-free.</p>
            <p>In no event shall Smart Study, its creators, or its partners be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or in connection with your use of the Service.</p>

            <h2 className="text-2xl font-bold pt-4 border-t mt-8">9. Governing Law</h2>
            <p>These Terms shall be governed and construed in accordance with the laws of Brazil, without regard to its conflict of law provisions.</p>

            <h2 className="text-2xl font-bold pt-4 border-t mt-8">10. Changes to Terms</h2>
            <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide at least 30 days' notice prior to any new terms taking effect. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.</p>

            <h2 className="text-2xl font-bold pt-4 border-t mt-8">11. Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us at: <a href="mailto:smartstudywebsite@gmail.com" className="text-purple-600 hover:underline">smartstudywebsite@gmail.com</a>.</p>
          </div>

          <div className="mt-12 text-center">
            <Link to="/register" className="text-purple-600 hover:underline inline-flex items-center gap-2">
              <FaArrowLeft /> Back to Register
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
};

export default TermsOfUse;