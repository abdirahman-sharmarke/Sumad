import Image from 'next/image';

export default function Footer() {
  const footerLinks = {
    company: [
      { name: 'About Sumad', href: '/about' },
      { name: 'Newsroom', href: '/news' },
      { name: 'Careers', href: '/careers' },
      { name: 'Investor Relations', href: '/investors' },
    ],
    support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'Account', href: '/account' },
      { name: 'Media Center', href: '/media' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Preferences', href: '/cookies' },
      { name: 'Legal Notices', href: '/legal' },
    ],
    ways: [
      { name: 'Gift Cards', href: '/gift-cards' },
      { name: 'Redeem Gift Cards', href: '/redeem' },
      { name: 'Ways to Watch', href: '/watch' },
      { name: 'Corporate Information', href: '/corporate' },
    ],
  };

  const socialLinks = [
    {
      name: 'Facebook',
      href: 'https://facebook.com/sumad',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/sumad',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/sumad',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.328-1.297L6.468 14.45c.566.568 1.348.915 2.201.915c1.723 0 3.127-1.404 3.127-3.127c0-.853-.347-1.635-.915-2.201L11.987 8.89c1.297.88 2.149 2.366 2.149 4.062c0 2.726-2.211 4.937-4.937 4.937c-1.297 0-2.448-.49-3.328-1.297z"/>
        </svg>
      ),
    },
    {
      name: 'YouTube',
      href: 'https://youtube.com/sumad',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-black text-gray-400 py-16 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Logo and Description */}
        <div className="mb-12">
          <Image
            src="/Sumad.png"
            alt="Sumad"
            width={120}
            height={40}
            className="h-10 w-auto mb-6"
          />
          <p className="text-gray-400 max-w-2xl text-lg leading-relaxed">
            Sumad is your ultimate destination for unlimited movies, TV shows, and exclusive content. 
            Stream anywhere, anytime with the best entertainment experience.
          </p>
        </div>

        {/* Social Media Links */}
        <div className="mb-12">
          <h3 className="text-white text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-6">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="text-gray-400 hover:text-[#F56D22] transition-colors duration-200"
                aria-label={social.name}
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#F56D22] transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#F56D22] transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#F56D22] transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">Ways to Enjoy</h3>
            <ul className="space-y-3">
              {footerLinks.ways.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#F56D22] transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Language Selector and Service Code */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <button className="inline-flex items-center px-4 py-2 border border-gray-600 rounded text-sm text-gray-400 hover:text-[#F56D22] hover:border-[#F56D22] transition-colors duration-200 w-fit">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              English
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <p className="text-gray-500 text-sm">Service Code: 1-800-SUMAD-01</p>
          </div>
        </div>

        {/* Copyright and Additional Info */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="text-sm text-gray-500">
              <p>&copy; 2026 Sumad Entertainment. All rights reserved.</p>
              <p className="mt-1">
                Sumad and related marks are trademarks of Sumad Entertainment.
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center gap-4 text-sm text-gray-500">
              <span>Available on:</span>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 border border-gray-600 rounded text-xs">iOS</span>
                <span className="px-2 py-1 border border-gray-600 rounded text-xs">Android</span>
                <span className="px-2 py-1 border border-gray-600 rounded text-xs">Smart TV</span>
                <span className="px-2 py-1 border border-gray-600 rounded text-xs">Web</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
