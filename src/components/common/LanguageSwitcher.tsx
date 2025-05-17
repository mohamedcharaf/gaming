import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const languages = [
  { code: 'ar', label: 'AR' },
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' },
] as const;

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  /* gère RTL dès que la langue change */
  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  return (
    <div className="flex items-center gap-3 rtl:flex-row-reverse">
      {languages.map(({ code, label }) => (
        <motion.button
          key={code}
          whileTap={{ scale: 0.9 }}
          onClick={() => i18n.changeLanguage(code)}
          aria-label={`Switch to ${label}`}
          className={`px-2 py-1 rounded-full text-xs font-semibold transition-colors
            ${i18n.language === code
              ? 'bg-primary-400 text-dark-200 ring-1 ring-white'
              : 'text-gray-200 hover:text-primary-400'}`}
        >
          {label}
        </motion.button>
      ))}
    </div>
  );
}
