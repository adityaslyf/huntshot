

const TermsOfService = () => {
  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      
      <div className="prose prose-sm">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-xl font-semibold mt-6 mb-2">1. Introduction</h2>
        <p>
          Welcome to Huntshot. By accessing our service, you agree to be bound by these Terms of Service and to use our service 
          in compliance with these Terms and all applicable laws and regulations.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-2">2. Use of Service</h2>
        <p>
          You may use our service only for lawful purposes and in accordance with these Terms of Service. 
          You agree not to use our service:
        </p>
        <ul className="list-disc ml-6 my-2">
          <li>In any way that violates any applicable federal, state, local, or international law or regulation</li>
          <li>For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way</li>
          <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail," "chain letter," "spam," or any other similar solicitation</li>
          <li>To impersonate or attempt to impersonate the Company, a Company employee, another user, or any other person or entity</li>
        </ul>
        
        <h2 className="text-xl font-semibold mt-6 mb-2">3. Accounts</h2>
        <p>
          When you create an account with us, you must provide accurate and complete information. You are responsible for 
          safeguarding your account and for any activities or actions under your account. You agree to notify us 
          immediately of any unauthorized use of your account.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-2">4. Intellectual Property</h2>
        <p>
          Our service and its original content, features, and functionality are and will remain the exclusive property of 
          Huntshot and its licensors. The service is protected by copyright, trademark, and other laws. Our trademarks and 
          trade dress may not be used in connection with any product or service without the prior written consent of Huntshot.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-2">5. Termination</h2>
        <p>
          We may terminate or suspend your account immediately, without prior notice or liability, for any reason 
          whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the 
          service will immediately cease.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-2">6. Limitation of Liability</h2>
        <p>
          In no event shall Huntshot, nor its directors, employees, partners, agents, suppliers, or affiliates, 
          be liable for any indirect, incidental, special, consequential or punitive damages, including without 
          limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access 
          to or use of or inability to access or use the service.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-2">7. Governing Law</h2>
        <p>
          These Terms shall be governed and construed in accordance with the laws, without regard to its 
          conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be 
          considered a waiver of those rights.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-2">8. Changes to Terms</h2>
        <p>
          We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
          If a revision is material we will try to provide at least 30 days' notice prior to any new terms taking effect.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-2">9. Contact Us</h2>
        <p>
          If you have any questions about these Terms, please contact us at:
          <br />
          Email: support@huntshot.xyz
        </p>
      </div>
    </div>
  )
}

export default TermsOfService 