

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      
      <div className="prose prose-sm">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-xl font-semibold mt-6 mb-2">1. Introduction</h2>
        <p>
          Welcome to Huntshot ("we," "our," or "us"). We are committed to protecting your privacy and personal information. 
          This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-2">2. Information We Collect</h2>
        <p>We may collect the following types of information:</p>
        <ul className="list-disc ml-6 my-2">
          <li><strong>Personal Information:</strong> Such as your name, email address, and profile information.</li>
          <li><strong>Usage Data:</strong> Information on how you access and use our service.</li>
          <li><strong>Device Information:</strong> Data about your device, including IP address and browser type.</li>
        </ul>
        
        <h2 className="text-xl font-semibold mt-6 mb-2">3. How We Use Your Information</h2>
        <p>We may use the information we collect for various purposes, including:</p>
        <ul className="list-disc ml-6 my-2">
          <li>To provide and maintain our service</li>
          <li>To notify you about changes to our service</li>
          <li>To allow you to participate in interactive features</li>
          <li>To provide customer support</li>
          <li>To gather analysis or valuable information to improve our service</li>
          <li>To monitor the usage of our service</li>
          <li>To detect, prevent, and address technical issues</li>
        </ul>
        
        <h2 className="text-xl font-semibold mt-6 mb-2">4. Data Security</h2>
        <p>
          The security of your data is important to us, but remember that no method of transmission over 
          the Internet or method of electronic storage is 100% secure. While we strive to use commercially 
          acceptable means to protect your personal information, we cannot guarantee its absolute security.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-2">5. Third-Party Services</h2>
        <p>
          We may employ third-party companies and individuals to facilitate our service, provide the service on our behalf, 
          perform service-related services, or assist us in analyzing how our service is used.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-2">6. Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting 
          the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-2">7. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at:
          <br />
          Email: support@huntshot.xyz
        </p>
      </div>
    </div>
  )
}

export default PrivacyPolicy 