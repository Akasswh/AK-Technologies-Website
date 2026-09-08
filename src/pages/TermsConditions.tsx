import { ArrowLeft } from 'lucide-react';

interface TermsConditionsProps {
  onNavigate?: (page: string) => void;
}

export default function TermsConditions({ onNavigate }: TermsConditionsProps) {
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
            Terms &amp; Conditions
          </h1>
          <p className="text-base text-neutral-300">
            AK Solutions &amp; Technologies Pvt Ltd
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
              Welcome to AK Solutions &amp; Technologies Pvt Ltd. These Terms &amp; Conditions govern your access to and use of our website (<a href="https://aktechnologies.io" className="text-white underline hover:text-neutral-300">aktechnologies.io</a>), software products, custom development solutions, and technology consulting services.
            </p>
            <p className="mt-3">
              By accessing, browsing, or utilizing our website, software products, or engineering services, you acknowledge that you have read, understood, and agreed to be legally bound by these Terms &amp; Conditions.
            </p>
          </section>

          {/* 1. Acceptance of Terms */}
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using the AK Solutions &amp; Technologies Pvt Ltd website, products, applications, or services, users agree to comply with and be bound by these Terms &amp; Conditions.
            </p>
            <p className="mt-3">
              These terms apply to all website visitors, registered clients, enterprise partners, and authorized users. If you do not agree with any part of these Terms &amp; Conditions, you must discontinue the use of our website and services immediately.
            </p>
          </section>

          {/* 2. Services */}
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
              2. Services &amp; Solutions
            </h2>
            <p className="mb-3">
              AK Solutions &amp; Technologies Pvt Ltd provides professional software engineering, artificial intelligence development, and technology advisory services, including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-neutral-300 ml-2">
              <li><strong className="text-white">Software Development:</strong> Custom enterprise software, robust backend architectures, distributed cloud infrastructure, and mission-critical systems.</li>
              <li><strong className="text-white">Web Development:</strong> High-performance full-stack web applications, scalable client portals, administration dashboards, and digital platforms.</li>
              <li><strong className="text-white">Mobile Application Development:</strong> Native and cross-platform mobile apps for iOS and Android built for seamless user experience, offline resilience, and speed.</li>
              <li><strong className="text-white">AI Solutions:</strong> Intelligent AI agents, workflow automation pipelines, predictive machine learning models, and large language model (LLM) integrations.</li>
              <li><strong className="text-white">Custom Software Products:</strong> Specialized vertical SaaS solutions (such as AdmissionOS, Church Management &amp; Mass Intention Management Systems, and enterprise ERPs).</li>
              <li><strong className="text-white">Technology Consulting:</strong> Strategic digital transformation roadmaps, technical architecture audits, stack modernization, and cloud optimization.</li>
              <li><strong className="text-white">Training Services:</strong> Corporate technical training workshops, engineering upskilling programs, and modern software development practices.</li>
            </ul>
          </section>

          {/* 3. Intellectual Property */}
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
              3. Intellectual Property
            </h2>
            <p>
              All content, software, source code, designs, branding, graphics, logos, documentation, and materials published on this website and in our pre-existing product repositories are the <strong className="text-white">exclusive property of AK Solutions &amp; Technologies Pvt Ltd</strong> unless otherwise explicitly stated in an executed client contract.
            </p>
            <p className="mt-3">
              Unauthorized reproduction, distribution, modification, reverse engineering, decompilation, public display, or commercial use of any proprietary material without express prior written permission from AK Solutions &amp; Technologies Pvt Ltd is strictly prohibited.
            </p>
            <p className="mt-3">
              <strong className="text-white">Client Confidentiality &amp; IP Protection:</strong> Any proprietary business data, trade secrets, and specific custom requirements provided by clients during an active engagement remain the sole and confidential property of the client, protected under mutual Non-Disclosure Agreements (NDAs).
            </p>
          </section>

          {/* 4. Project Engagement */}
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
              4. Project Engagement &amp; Scope
            </h2>
            <p>
              Project scope, timelines, pricing, and deliverables shall be agreed upon in writing before project commencement through formal Statements of Work (SOW) or Master Services Agreements (MSA).
            </p>
            <p className="mt-3">
              Any scope changes, additional feature requests, or modifications requested by the client after project kickoff may result in adjustments to project timelines and costs via formal change orders.
            </p>
            <p className="mt-3">
              Deliverables shall be reviewed and formally tested by the client according to agreed acceptance criteria within specified review windows.
            </p>
          </section>

          {/* 5. Payments */}
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
              5. Payments &amp; Ownership Transfer
            </h2>
            <p>
              Payments must be made in accordance with the agreed project milestones, deposit schedules, and invoice terms set forth in individual client contracts.
            </p>
            <p className="mt-3">
              Delayed payments beyond stipulated due dates may result an immediate pause in project delivery, staging environment access, or support services until accounts are brought current.
            </p>
            <p className="mt-3">
              <strong className="text-white">Ownership Transfer:</strong> Ownership of custom source code, deliverables, and production release keys transfers to the client <strong className="text-white">only upon full and final settlement of all project invoices and payments</strong>.
            </p>
          </section>

          {/* 6. Client Responsibilities */}
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
              6. Client Responsibilities
            </h2>
            <p className="mb-3">
              To facilitate successful and timely project execution, clients agree to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-neutral-300 ml-2">
              <li>Provide accurate, comprehensive, and timely project requirements and business specifications.</li>
              <li>Provide timely access to required systems, staging servers, third-party credentials, brand assets, and content.</li>
              <li>Maintain prompt communication and designate authorized points of contact for project decisions.</li>
              <li>Perform user acceptance testing and provide milestone review sign‑offs within agreed timeframes.</li>
            </ul>
          </section>

          {/* 7. Limitation of Liability */}
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
              7. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by applicable law, AK Solutions &amp; Technologies Pvt Ltd, its directors, officers, employees, and affiliates will not be held liable for any indirect, incidental, special, punitive, exemplary, or consequential damages resulting from the use or inability to use our website, software products, or engineering services.
            </p>
            <p className="mt-3">
              This includes, without limitation, damages for loss of profits, business revenue, data, goodwill, or operational downtime. In all cases, the total cumulative liability of AK Solutions &amp; Technologies Pvt Ltd arising out of or related to any project engagement shall be strictly limited to the actual service fees paid by the client under the applicable statement of work in the preceding three (3) months.
            </p>
          </section>

          {/* 8. Third-Party Services */}
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
              8. Third-Party Services &amp; Integrations
            </h2>
            <p>
              In delivering solutions, we may integrate third‑party platforms, APIs, cloud hosting providers, or software libraries (such as AWS, Google Cloud, Supabase, OpenAI, Razorpay, or communication gateways).
            </p>
            <p className="mt-3">
              AK Solutions &amp; Technologies Pvt Ltd is <strong className="text-white">not responsible or liable</strong> for service outages, rate limiting, latency, API deprecations, security incidents, or interruptions caused directly by third‑party hosting, platform, or service providers.
            </p>
          </section>

          {/* 9. Warranty & Support */}
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
              9. Warranty &amp; Support
            </h2>
            <p>
              Products and services are provided with agreed warranty periods and maintenance packages as specified in individual client agreements.
            </p>
            <p className="mt-3">
              Custom software deployments typically include a 30‑day post‑launch hypercare warranty window addressing bug fixes directly tied to agreed specifications. Ongoing maintenance, infrastructure monitoring, and iterative enhancements are managed through separate SLA‑based maintenance packages.
            </p>
          </section>

          {/* 10. Termination */}
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
              10. Suspension &amp; Termination
            </h2>
            <p className="mb-3">
              AK Solutions &amp; Technologies Pvt Ltd reserves the right to suspend access or terminate services and agreements upon written notice in cases of:
            </p>
            <ul className="list-disc list-inside space-y-2 text-neutral-300 ml-2">
              <li>Material violation or breach of these Terms &amp; Conditions or executed contractual agreements.</li>
              <li>System misuse, malicious attacks, scraping, or unauthorized penetration testing.</li>
              <li>Engagement in unlawful, fraudulent, or infringing activities.</li>
              <li>Payment default or prolonged failure to settle undisputed invoices.</li>
            </ul>
          </section>

          {/* 11. Governing Law */}
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
              11. Governing Law &amp; Jurisdiction
            </h2>
            <p>
              These Terms &amp; Conditions and any disputes or claims arising out of or related to them shall be governed by and interpreted under the <strong className="text-white">laws of India</strong>, without regard to its conflict of law principles.
            </p>
            <p className="mt-3">
              Any legal disputes, controversies, or proceedings shall be subject to the exclusive jurisdiction of the competent courts in India.
            </p>
          </section>

          {/* 12. Changes to Terms */}
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
              12. Changes to Terms
            </h2>
            <p>
              AK Solutions &amp; Technologies Pvt Ltd reserves the right to update or modify these Terms &amp; Conditions at any time. Any changes will be published directly on this page. Continued access or use of our website, products, or services following any modifications constitutes acceptance of the revised Terms.
            </p>
          </section>

          {/* 13. Contact Information */}
          <section className="border-t border-neutral-800 pt-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
              13. Contact Information
            </h2>
            <p className="mb-4">
              For any legal questions, contract inquiries, or clarifications concerning these Terms &amp; Conditions, please contact us directly:
            </p>
            <div className="space-y-2 text-sm sm:text-base text-neutral-300">
              <p>
                <strong className="text-white">Company Name:</strong> AK Solutions &amp; Technologies Pvt Ltd
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