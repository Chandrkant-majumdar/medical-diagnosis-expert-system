import { Link } from "react-router-dom";

// Component for internal application links (React Router)
export const InternalLinkItem = ({ to, children }) => (
  <li>
    <Link
      to={to}
      className="text-gray-600 hover:text-codyBlue transition-colors"
    >
      {children}
    </Link>
  </li>
);

// Component for external links
export const ExternalLinkItem = ({ href, children }) => (
  <li>
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-600 hover:text-codyBlue transition-colors"
    >
      {children}
    </a>
  </li>
);

// Component for email links
export const EmailLinkItem = ({ email, children }) => (
  <li>
    <a
      href={`mailto:${email}`}
      className="text-gray-600 hover:text-codyBlue transition-colors"
    >
      {children}
    </a>
  </li>
);

// Component for a section of links with title
export const LinkSection = ({ title, children }) => (
  <div>
    <h3 className="font-semibold text-darkBlue mb-4">{title}</h3>
    <ul className="space-y-2">{children}</ul>
  </div>
);

// Quick Links configuration
export const QuickLinks = () => (
  <LinkSection title="Quick Links">
    <InternalLinkItem to="/chat">Start Diagnosis</InternalLinkItem>
    <InternalLinkItem to="/knowledge-base">Knowledge Base</InternalLinkItem>
    <InternalLinkItem to="/upload">Upload Data</InternalLinkItem>
  </LinkSection>
);

// Resources Links configuration
export const ResourceLinks = () => (
  <LinkSection title="Resources">
    {/* <ExternalLinkItem href="https://www.clipsrules.net">
      CLIPS Documentation
    </ExternalLinkItem> */}
    <ExternalLinkItem href="https://github.com/Chandrkant-majumdar/Thesis">
      GitHub Repository
    </ExternalLinkItem>
    {/* <EmailLinkItem email="chandan.student@university.edu">
      Contact Developer
    </EmailLinkItem> */}
  </LinkSection>
);

// Legal Links configuration for the bottom of the footer
export const LegalLinks = () => (
  <div className="flex space-x-6">
    <a
      href="https://university.edu/privacy"
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm text-gray-600 hover:text-codyBlue"
    >
      Privacy Policy
    </a>
    <a
      href="https://university.edu/terms"
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm text-gray-600 hover:text-codyBlue"
    >
      Terms of Use
    </a>
  </div>
);
