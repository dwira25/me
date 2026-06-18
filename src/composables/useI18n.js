import { ref } from 'vue'

const lang = ref(
  typeof localStorage !== 'undefined' ? (localStorage.getItem('lang') || 'id') : 'id'
)

const msgs = {
  id: {
    'nav.about':      'Tentang',
    'nav.projects':   'Proyek',
    'nav.experience': 'Pengalaman',
    'nav.contact':    'Kontak',

    'intro.role': 'IT Project Manager Officer',

    'hero.role1':       'IT Project Manager Officer',
    'hero.role2':       'ClickUp Consultant',
    'hero.role3':       'AI Agent Builder',
    'hero.since':       'Mulai berkarier',
    'hero.systems':     'Sistem dibangun',
    'hero.discipline':  'Disiplin & visibility',
    'hero.cta.view':    'Lihat Project',
    'hero.cta.contact': 'Hubungi Saya',

    'about.label':     '// tentang',
    'about.heading':   'Merapikan cara kerja tim, satu sistem pada satu waktu.',
    'about.p1':        'IT Project Manager & PMO dengan pengalaman sejak 2018. Mulai dari NOC, QA, System Analyst, hingga memimpin implementasi sistem enterprise dan membangun AI Workspace.',
    'about.p2':        'Fokus pada visibility, struktur, dan sistem yang benar-benar digunakan — bukan sekadar diimplementasi.',
    'about.tag.open':  'Open to work',
    'about.tag.since': 'Sejak 2018',
    'about.career':    '// jalur karier',

    'skills.label':   '// keahlian',
    'skills.heading': 'Tools yang dipakai untuk menjalankan sistem, bukan sekadar daftar.',
    'skills.sub':     'Dari project management klasik sampai AI agent & MCP server — dipilih berdasarkan apa yang benar-benar terpakai di lapangan.',
    'skills.g1':    'Manajemen Proyek',
    'skills.g2':    'Sistem & Integrasi',
    'skills.g3':    'AI & Pengembangan',

    'projects.label':    '// proyek',
    'projects.heading':  'Sistem yang sudah dibangun & dijalankan',
    'projects.sub':      'Sebagian sistem yang sudah live dan dipakai sehari-hari oleh tim operasional.',
    'projects.featured': 'Unggulan',

    'exp.label':   '// pengalaman',
    'exp.heading': 'Perjalanan karier',
    'exp.now':     'Skrg',

    'services.label':   '// layanan',
    'services.heading': 'Layanan untuk tim Anda',
    'services.sub':     'Dari setup workspace sampai AI workflow — disesuaikan dengan cara tim Anda bekerja.',

    'contact.label':   '// kontak',
    'contact.heading': 'Mari diskusikan kebutuhan tim Anda.',
    'contact.desc':    'Terbuka untuk diskusi seputar ClickUp, workflow automation, ERP/WMS/TMS, integrasi API, dan AI Workspace.',
    'contact.status':  'Tersedia untuk proyek baru',
    'contact.cli':     'kontak — zsh',
  },
  en: {
    'nav.about':      'About',
    'nav.projects':   'Projects',
    'nav.experience': 'Experience',
    'nav.contact':    'Contact',

    'intro.role': 'IT Project Manager Officer',

    'hero.role1':       'IT Project Manager Officer',
    'hero.role2':       'ClickUp Consultant',
    'hero.role3':       'AI Agent Builder',
    'hero.since':       'Started working',
    'hero.systems':     'Systems built',
    'hero.discipline':  'Discipline & visibility',
    'hero.cta.view':    'View Projects',
    'hero.cta.contact': 'Contact Me',

    'about.label':     '// about',
    'about.heading':   'Streamlining how teams work, one system at a time.',
    'about.p1':        'IT Project Manager & PMO with experience since 2018. From NOC, QA, System Analyst, to leading enterprise system implementations and building AI Workspaces.',
    'about.p2':        'Focused on visibility, structure, and systems that are actually used — not just implemented.',
    'about.tag.open':  'Open to work',
    'about.tag.since': 'Since 2018',
    'about.career':    '// career path',

    'skills.label':   '// skills',
    'skills.heading': 'Tools used to run real systems, not just listed on a resume.',
    'skills.sub':     'From classic project management to AI agents & MCP servers — chosen for what actually gets used in the field.',
    'skills.g1':    'Project Management',
    'skills.g2':    'Systems & Integration',
    'skills.g3':    'AI & Development',

    'projects.label':    '// projects',
    'projects.heading':  'Systems built & deployed',
    'projects.sub':      'A selection of systems that are live and used daily by operational teams.',
    'projects.featured': 'Featured',

    'exp.label':   '// experience',
    'exp.heading': 'Career journey',
    'exp.now':     'Present',

    'services.label':   '// services',
    'services.heading': 'Services for your team',
    'services.sub':     'From workspace setup to AI workflows — shaped around how your team actually works.',

    'contact.label':   '// contact',
    'contact.heading': "Let's discuss your team's needs.",
    'contact.desc':    'Open for discussions about ClickUp, workflow automation, ERP/WMS/TMS, API integration, and AI Workspace.',
    'contact.status':  'Available for new projects',
    'contact.cli':     'contact — zsh',
  },
}

export function useI18n() {
  function t(key) {
    return msgs[lang.value]?.[key] ?? msgs.id[key] ?? key
  }

  function toggleLang() {
    lang.value = lang.value === 'id' ? 'en' : 'id'
    if (typeof localStorage !== 'undefined') localStorage.setItem('lang', lang.value)
  }

  return { lang, t, toggleLang }
}
