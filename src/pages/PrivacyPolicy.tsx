import { ArrowLeft } from 'lucide-react';

interface PrivacyPolicyProps {
  onNavigate?: (page: string) => void;
}

export default function PrivacyPolicy({ onNavigate }: PrivacyPolicyProps) {
  const handleHome = () => {
    if (onNavigate) onNavigate('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen pt-32 pb-24 text-white" style={{ background: '#000000' }}>
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        {/* Back navigation */}
        <button
          onClick={handleHome}
          className="inline-flex items-center gap-2 mb-8 text-sm text-neutral-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Home
        </button>

        {/* Header */}
        <div className="border-b border-neutral-800 pb-8 mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-base text-neutral-300">
            AK Technologies Pvt Ltd
          </p>
        </div>

        {/* Content */}
        <div className="space-y-10 text-neutral-200 leading-relaxed text-sm sm:text-base">
          {/* Introduction */}
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
              Introduction
            </h2>
            <p>
              At AK Solutions & Technologies Pvt Ltd, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, store, and safeguard information provided through our website (<a href="https://aktechnologies.io" className="text-white underline hover:text-neutral-300">aktechnologies.io</a>), products, applications, and technology services.
            </p>
            <p className="mt-3">
              By using our website, products, or services, you agree to the collection and use of information in accordance with this Privacy Policy.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
              1. Information We Collect
            </h2>
            <p className="mb-3">
              We may collect personal and business information that you voluntarily provide to us when contacting us, requesting a consultation, or engaging our software engineering services. This includes:
            </p>
            <ul className="list-disc list-inside space-y-2 text-neutral-300 ml-2">
              <li><strong className="text-white">Full Name</strong></li>
              <li><strong className="text-white">Email Address</strong></li>
              <li><strong className="text-white">Phone Number</strong></li>
              <li><strong className="text-white">Company Name</strong></li>
              <li><strong className="text-white">Project Requirements</strong></li>
              <li><strong className="text-white">Service Inquiry Details</strong></li>
              <li><strong className="text-white">Communication History</strong></li>
              <li><strong className="text-white">Website Usage Information</strong> (such as IP address, browser type, device information, and pages visited)</li>
            </ul>
          </section>

          {/* How We Use Information */}
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
              2. How We Use Information
            </h2>
            <p className="mb-3">
              The information collected by AK Solutions & Technologies Pvt Ltd is used exclusively for legitimate business purposes, including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-neutral-300 ml-2">
              <li>Responding to customer inquiries and consultation requests</li>
              <li>Providing technical proposals, scope estimates, and commercial quotations</li>
              <li>Delivering custom software products, applications, and technology solutions</li>
              <li>Providing ongoing technical support and customer care</li>
              <li>Project communication, status updates, and milestone collaboration</li>
              <li>Business development and evaluating client project requirements</li>
              <li>Service improvements, website optimization, and performance monitoring</li>
              <li>Security verification, system auditing, and fraud prevention</li>
            </ul>
          </section>

          {/* Data Protection */}
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
              3. Data Protection &amp; Security
            </h2>
            <p>
              AK Solutions & Technologies Pvt Ltd implements reasonable technical, administrative, and organizational security measures to protect your personal information against unauthorized access, loss, misuse, alteration, or disclosure.
            </p>
            <p className="mt-3">
              We utilize encrypted transmission protocols (HTTPS/TLS), secure database infrastructure, strict role-based access controls, and industry-standard security safeguards. However, no method of transmission over the Internet or electronic storage is completely secure, and we cannot guarantee absolute security.
            </p>
          </section>

          {/* Cookies & Tracking Technologies */}
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
              4. Cookies &amp; Tracking Technologies
            </h2>
            <p className="mb-3">
              Our website may use cookies, web beacons, and similar tracking technologies to enhance user experience and analyze site traffic. These technologies help us:
            </p>
            <ul className="list-disc list-inside space-y-2 text-neutral-300 ml-2">
              <li>Improve user experience and remember user preferences</li>
              <li>Understand visitor behavior and navigation patterns</li>
              <li>Monitor website performance, speed, and reliability</li>
              <li>Enhance service quality and optimize website structure</li>
            </ul>
            <p className="mt-3">
              Users may adjust their web browser settings to refuse or delete cookies if desired. Please note that disabling cookies may affect certain features or functionality of the website.
            </p>
          </section>

          {/* Third-Party Services */}
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
              5. Third-Party Services
            </h2>
            <p>
              We may engage trusted third-party service providers to assist with cloud hosting, web analytics, communication systems, email delivery, and business operations.
            </p>
            <p className="mt-3">
              These third-party providers only have access to personal information required to perform their designated functions on our behalf and are obligated not to disclose or use it for any other purpose.
            </p>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
              6. Data Retention
            </h2>
            <p>
              We retain personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, satisfy contractual commitments, resolve disputes, or comply with applicable legal, statutory, and regulatory obligations. When personal data is no longer required, it is securely deleted or anonymized.
            </p>
          </section>

          {/* User Rights */}
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
              7. User Rights
            </h2>
            <p className="mb-3">
              Depending on your location and applicable privacy laws, you may have the following rights regarding your personal information:
            </p>
            <ul className="list-disc list-inside space-y-2 text-neutral-300 ml-2">
              <li><strong className="text-white">Right of Access:</strong> Request a copy of the personal information we hold about you.</li>
              <li><strong className="text-white">Right to Rectification:</strong> Request correction of inaccurate or incomplete information.</li>
              <li><strong className="text-white">Right to Erasure:</strong> Request deletion of your personal data, subject to legal and regulatory retention duties.</li>
              <li><strong className="text-white">Right to Withdraw Consent:</strong> Withdraw consent for data processing at any time where consent was previously provided.</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, please submit a written request to us at <a href="mailto:info@aktechnologies.io" className="text-white underline hover:text-neutral-300">info@aktechnologies.io</a>.
            </p>
          </section>

          {/* Changes to this Policy */}
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
              8. Changes to This Privacy Policy
            </h2>
            <p>
              AK Solutions & Technologies Pvt Ltd reserves the right to update or modify this Privacy Policy at any time. Any revisions will be published directly on this page. We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information.
            </p>
          </section>

          {/* Contact Information */}
          <section className="border-t border-neutral-800 pt-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
              9. Contact Information
            </h2>
            <p className="mb-4">
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data handling practices, please contact us:
            </p>
            <div className="space-y-2 text-sm sm:text-base text-neutral-300">
              <p>
                <strong className="text-white">Company Name:</strong> AK Solutions & Technologies Pvt Ltd
              </p>
              <p>
                <strong className="text-white">Email:</strong>{' '}
                <a href="mailto:info@aktechnologies.io" className="text-white underline hover:text-neutral-300">
                  info@aktechnologies.io
                </a>
              </p>
              <p>
                <strong className="text-white">Phone:</strong>{' '}
                <a href="tel:+917396760115" className="text-white underline hover:text-neutral-300">
                  +91 7396760115
                </a>
              </p>
              <p>
                <strong className="text-white">Website:</strong>{' '}
                <a href="https://aktechnologies.io" target="_blank" rel="noopener noreferrer" className="text-white underline hover:text-neutral-300">
                  https://aktechnologies.io
                </a>
              </p>
            </div>
          </section>

          {/* Back to Home CTA */}
          <div className="pt-8 border-t border-neutral-800 text-center sm:text-left">
            <button
              onClick={handleHome}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium bg-neutral-900 text-white border border-neutral-700 hover:bg-neutral-800 transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}