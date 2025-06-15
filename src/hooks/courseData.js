const courses = [
  {
    id: 1,
    image: '/assets/index/course section/course type/image-1.jpeg',
    title: 'Digital Marketing Strategy',
    description: 'Pelajari strategi pemasaran digital yang efektif untuk meningkatkan brand awareness dan penjualan...',
    teacherImage: '/assets/index/course section/course teacher/image-1.png',
    teacherName: 'Sarah Johnson',
    teacherJob: 'Marketing Director di Tokopedia',
    stars: ['full', 'full', 'full', 'full', 'half'],
    rating: '4.5 (120)',
    price: 'Rp 350K',
    category: 'Pemasaran',
    fullDescription: 'Digital Marketing Strategy adalah kursus komprehensif yang dirancang untuk memberikan pemahaman mendalam tentang strategi pemasaran digital modern. Dalam kursus ini, Anda akan mempelajari berbagai aspek pemasaran digital mulai dari SEO, SEM, content marketing, social media marketing, hingga email marketing. Kursus ini cocok untuk pemula yang ingin memulai karier di bidang digital marketing maupun profesional yang ingin meningkatkan skill mereka.',
    modules: [
      {
        id: 1,
        title: 'Pengenalan Digital Marketing',
        lessons: [
          { title: 'Apa itu Digital Marketing?', type: 'video', duration: '15 Menit' },
          { title: 'Evolusi Marketing di Era Digital', type: 'video', duration: '12 Menit' },
          { title: 'Digital Marketing vs Traditional Marketing', type: 'video', duration: '10 Menit' }
        ]
      },
      {
        id: 2,
        title: 'Search Engine Optimization (SEO)',
        lessons: [
          { title: 'Dasar-dasar SEO', type: 'video', duration: '20 Menit' },
          { title: 'Keyword Research', type: 'video', duration: '18 Menit' },
          { title: 'On-Page SEO', type: 'video', duration: '25 Menit' }
        ]
      },
      {
        id: 3,
        title: 'Social Media Marketing',
        lessons: [
          { title: 'Platform Media Sosial untuk Bisnis', type: 'video', duration: '16 Menit' },
          { title: 'Content Strategy untuk Social Media', type: 'video', duration: '22 Menit' }
        ]
      }
    ],
    tutors: [
      {
        name: 'Sarah Johnson',
        role: 'Marketing Director di Tokopedia',
        description: 'Berpengalaman lebih dari 8 tahun di bidang digital marketing. Telah membantu berbagai startup dan perusahaan besar mengembangkan strategi pemasaran digital yang efektif.',
        rating: 4.8,
        reviews: 120
      }
    ],
    reviews: [
      {
        name: 'Ahmad Pratama',
        role: 'Marketing Specialist',
        description: 'Kursus yang sangat lengkap dan mudah dipahami. Materi yang diberikan sangat aplikatif dan bisa langsung diterapkan di pekerjaan.',
        rating: 5,
        date: '2 minggu lalu'
      },
      {
        name: 'Siti Nurhaliza',
        role: 'Business Owner',
        description: 'Sangat membantu untuk mengembangkan bisnis online saya. Instruktur menjelaskan dengan sangat detail dan mudah dimengerti.',
        rating: 4,
        date: '1 bulan lalu'
      }
    ]
  },
  {
    id: 2,
    image: '/assets/index/course section/course type/image-2.jpeg',
    title: 'Social Media Marketing',
    description: 'Kuasai teknik pemasaran media sosial untuk membangun engagement dan konversi yang tinggi...',
    teacherImage: '/assets/index/course section/course teacher/image-2.png',
    teacherName: 'Ahmad Rizki',
    teacherJob: 'Social Media Specialist di Gojek',
    stars: ['full', 'full', 'full', 'full', 'empty'],
    rating: '4.0 (95)',
    price: 'Rp 280K',
    category: 'Pemasaran',
    fullDescription: 'Social Media Marketing adalah kursus yang fokus pada strategi pemasaran melalui platform media sosial. Anda akan belajar cara membuat konten yang engaging, mengelola komunitas online, menggunakan tools analytics, dan mengoptimalkan campaign untuk berbagai platform seperti Instagram, Facebook, Twitter, LinkedIn, dan TikTok.',
    modules: [
      {
        id: 1,
        title: 'Dasar-dasar Social Media Marketing',
        lessons: [
          { title: 'Pengenalan Platform Media Sosial', type: 'video', duration: '12 Menit' },
          { title: 'Memahami Target Audience', type: 'video', duration: '15 Menit' },
          { title: 'Content Planning Strategy', type: 'video', duration: '18 Menit' }
        ]
      },
      {
        id: 2,
        title: 'Content Creation & Management',
        lessons: [
          { title: 'Membuat Konten Visual yang Menarik', type: 'video', duration: '20 Menit' },
          { title: 'Copywriting untuk Social Media', type: 'video', duration: '16 Menit' }
        ]
      }
    ],
    tutors: [
      {
        name: 'Ahmad Rizki',
        role: 'Social Media Specialist di Gojek',
        description: 'Spesialis social media marketing dengan pengalaman 5 tahun mengelola akun media sosial untuk berbagai brand ternama di Indonesia.',
        rating: 4.5,
        reviews: 95
      }
    ],
    reviews: [
      {
        name: 'Maya Sari',
        role: 'Content Creator',
        description: 'Kursus yang sangat praktis! Banyak tips dan trik yang bisa langsung diaplikasikan untuk meningkatkan engagement di social media.',
        rating: 4,
        date: '1 minggu lalu'
      }
    ]
  },
  {
    id: 3,
    image: '/assets/index/course section/course type/image-3.jpeg',
    title: 'Content Marketing Mastery',
    description: 'Belajar membuat konten yang menarik dan efektif untuk berbagai platform digital...',
    teacherImage: '/assets/index/course section/course teacher/image-3.png',
    teacherName: 'Lisa Chen',
    teacherJob: 'Content Strategist di Shopee',
    stars: ['full', 'full', 'full', 'half', 'empty'],
    rating: '3.8 (78)',
    price: 'Rp 320K',
    category: 'Pemasaran',
    fullDescription: 'Content Marketing Mastery mengajarkan Anda cara membuat, mendistribusikan, dan mengoptimalkan konten untuk mencapai tujuan bisnis. Kursus ini mencakup strategi content marketing, SEO content, video marketing, dan cara mengukur efektivitas konten Anda.',
    modules: [
      {
        id: 1,
        title: 'Content Marketing Strategy',
        lessons: [
          { title: 'Membangun Content Strategy', type: 'video', duration: '18 Menit' },
          { title: 'Content Calendar Planning', type: 'video', duration: '14 Menit' }
        ]
      }
    ],
    tutors: [
      {
        name: 'Lisa Chen',
        role: 'Content Strategist di Shopee',
        description: 'Content strategist berpengalaman dengan track record mengelola content marketing untuk e-commerce terbesar di Asia Tenggara.',
        rating: 4.2,
        reviews: 78
      }
    ],
    reviews: [
      {
        name: 'Budi Santoso',
        role: 'Marketing Manager',
        description: 'Materi content marketing yang sangat komprehensif. Membantu saya memahami cara membuat konten yang benar-benar convert.',
        rating: 4,
        date: '3 minggu lalu'
      }
    ]
  },
  {
    id: 4,
    image: '/assets/index/course section/course type/image-4.jpeg',
    title: 'UI/UX Design Fundamentals',
    description: 'Pelajari dasar-dasar desain UI/UX untuk menciptakan pengalaman pengguna yang optimal...',
    teacherImage: '/assets/index/course section/course teacher/image-4.png',
    teacherName: 'David Kim',
    teacherJob: 'Senior UI/UX Designer di Grab',
    stars: ['full', 'full', 'full', 'full', 'full'],
    rating: '5.0 (150)',
    price: 'Rp 450K',
    category: 'Desain',
    fullDescription: 'UI/UX Design Fundamentals adalah kursus yang dirancang untuk memberikan pemahaman mendalam tentang prinsip-prinsip desain user interface dan user experience. Anda akan belajar tentang design thinking, user research, wireframing, prototyping, dan testing. Kursus ini cocok untuk pemula yang ingin memulai karier sebagai UI/UX designer.',
    modules: [
      {
        id: 1,
        title: 'Introduction to UI/UX Design',
        lessons: [
          { title: 'Apa itu UI/UX Design?', type: 'video', duration: '12 Menit' },
          { title: 'Perbedaan UI dan UX', type: 'video', duration: '10 Menit' },
          { title: 'Design Thinking Process', type: 'video', duration: '15 Menit' }
        ]
      },
      {
        id: 2,
        title: 'User Research & Analysis',
        lessons: [
          { title: 'Metode User Research', type: 'video', duration: '20 Menit' },
          { title: 'Creating User Personas', type: 'video', duration: '18 Menit' },
          { title: 'User Journey Mapping', type: 'video', duration: '22 Menit' }
        ]
      },
      {
        id: 3,
        title: 'Wireframing & Prototyping',
        lessons: [
          { title: 'Low-fidelity Wireframes', type: 'video', duration: '16 Menit' },
          { title: 'High-fidelity Prototypes', type: 'video', duration: '25 Menit' }
        ]
      }
    ],
    tutors: [
      {
        name: 'David Kim',
        role: 'Senior UI/UX Designer di Grab',
        description: 'Senior UI/UX Designer dengan pengalaman 7 tahun di industri teknologi. Telah mendesain aplikasi yang digunakan oleh jutaan pengguna di Asia Tenggara.',
        rating: 4.9,
        reviews: 150
      }
    ],
    reviews: [
      {
        name: 'Rina Wijaya',
        role: 'Junior Designer',
        description: 'Kursus yang sangat lengkap untuk pemula. Penjelasan David sangat mudah dipahami dan contoh-contoh yang diberikan sangat relevan.',
        rating: 5,
        date: '1 minggu lalu'
      },
      {
        name: 'Fajar Nugroho',
        role: 'Product Manager',
        description: 'Sebagai PM, kursus ini membantu saya memahami proses design dan berkomunikasi lebih baik dengan tim design.',
        rating: 5,
        date: '2 minggu lalu'
      }
    ]
  },
  {
    id: 5,
    image: '/assets/index/course section/course type/image-5.jpeg',
    title: 'Graphic Design Essentials',
    description: 'Kuasai teknik desain grafis menggunakan Adobe Creative Suite untuk berbagai kebutuhan...',
    teacherImage: '/assets/index/course section/course teacher/image-5.png',
    teacherName: 'Maria Santos',
    teacherJob: 'Creative Director di Traveloka',
    stars: ['full', 'full', 'full', 'full', 'empty'],
    rating: '4.2 (88)',
    price: 'Rp 380K',
    category: 'Desain',
    fullDescription: 'Graphic Design Essentials mengajarkan fundamental desain grafis menggunakan Adobe Creative Suite (Photoshop, Illustrator, InDesign). Anda akan belajar prinsip-prinsip desain, typography, color theory, dan cara membuat berbagai jenis desain untuk keperluan digital dan print.',
    modules: [
      {
        id: 1,
        title: 'Design Fundamentals',
        lessons: [
          { title: 'Prinsip-prinsip Desain', type: 'video', duration: '15 Menit' },
          { title: 'Color Theory', type: 'video', duration: '18 Menit' },
          { title: 'Typography Basics', type: 'video', duration: '20 Menit' }
        ]
      },
      {
        id: 2,
        title: 'Adobe Photoshop',
        lessons: [
          { title: 'Interface dan Tools Photoshop', type: 'video', duration: '22 Menit' },
          { title: 'Photo Editing Techniques', type: 'video', duration: '25 Menit' }
        ]
      }
    ],
    tutors: [
      {
        name: 'Maria Santos',
        role: 'Creative Director di Traveloka',
        description: 'Creative Director dengan pengalaman 10 tahun di industri kreatif. Ahli dalam branding dan visual communication untuk berbagai platform.',
        rating: 4.5,
        reviews: 88
      }
    ],
    reviews: [
      {
        name: 'Dian Pratiwi',
        role: 'Graphic Designer',
        description: 'Kursus yang sangat membantu untuk meningkatkan skill design. Teknik-teknik yang diajarkan sangat praktis dan applicable.',
        rating: 4,
        date: '2 minggu lalu'
      }
    ]
  },
  {
    id: 6,
    image: '/assets/index/course section/course type/image-6.jpeg',
    title: 'Web Design with Figma',
    description: 'Belajar mendesain website modern dan responsif menggunakan Figma dari dasar hingga mahir...',
    teacherImage: '/assets/index/course section/course teacher/image-6.png',
    teacherName: 'Ryan Pratama',
    teacherJob: 'Product Designer di Bukalapak',
    stars: ['full', 'full', 'full', 'full', 'half'],
    rating: '4.6 (110)',
    price: 'Rp 420K',
    category: 'Desain',
    fullDescription: 'Web Design with Figma adalah kursus yang mengajarkan cara mendesain website modern menggunakan Figma. Anda akan belajar dari basic interface Figma hingga advanced techniques seperti component system, auto-layout, dan prototyping untuk web design.',
    modules: [
      {
        id: 1,
        title: 'Figma Basics',
        lessons: [
          { title: 'Pengenalan Interface Figma', type: 'video', duration: '12 Menit' },
          { title: 'Basic Tools dan Shapes', type: 'video', duration: '15 Menit' },
          { title: 'Working with Layers', type: 'video', duration: '10 Menit' }
        ]
      },
      {
        id: 2,
        title: 'Web Design Principles',
        lessons: [
          { title: 'Layout dan Grid System', type: 'video', duration: '20 Menit' },
          { title: 'Responsive Design Concepts', type: 'video', duration: '18 Menit' }
        ]
      }
    ],
    tutors: [
      {
        name: 'Ryan Pratama',
        role: 'Product Designer di Bukalapak',
        description: 'Product Designer dengan spesialisasi web design. Berpengalaman mendesain interface untuk e-commerce dan fintech.',
        rating: 4.7,
        reviews: 110
      }
    ],
    reviews: [
      {
        name: 'Indra Kusuma',
        role: 'Web Designer',
        description: 'Tutorial Figma yang paling lengkap yang pernah saya ikuti. Sangat membantu untuk meningkatkan workflow design saya.',
        rating: 5,
        date: '1 minggu lalu'
      }
    ]
  },
  {
    id: 7,
    image: '/assets/index/course section/course type/image-7.jpeg',
    title: 'Leadership & Management',
    description: 'Kembangkan kemampuan kepemimpinan dan manajemen untuk memimpin tim yang efektif...',
    teacherImage: '/assets/index/course section/course teacher/image-7.png',
    teacherName: 'Jennifer Wong',
    teacherJob: 'VP Operations di OVO',
    stars: ['full', 'full', 'full', 'full', 'empty'],
    rating: '4.3 (92)',
    price: 'Rp 500K',
    category: 'Pengembangan Diri',
    fullDescription: 'Leadership & Management adalah kursus yang dirancang untuk mengembangkan kemampuan kepemimpinan dan manajemen. Anda akan belajar tentang leadership styles, team management, conflict resolution, dan strategic thinking untuk menjadi pemimpin yang efektif.',
    modules: [
      {
        id: 1,
        title: 'Leadership Fundamentals',
        lessons: [
          { title: 'What Makes a Great Leader?', type: 'video', duration: '15 Menit' },
          { title: 'Leadership Styles', type: 'video', duration: '18 Menit' },
          { title: 'Building Trust and Credibility', type: 'video', duration: '12 Menit' }
        ]
      },
      {
        id: 2,
        title: 'Team Management',
        lessons: [
          { title: 'Building High-Performance Teams', type: 'video', duration: '20 Menit' },
          { title: 'Delegation and Empowerment', type: 'video', duration: '16 Menit' }
        ]
      }
    ],
    tutors: [
      {
        name: 'Jennifer Wong',
        role: 'VP Operations di OVO',
        description: 'VP Operations dengan pengalaman 12 tahun memimpin tim lintas fungsi di berbagai perusahaan teknologi dan finansial.',
        rating: 4.6,
        reviews: 92
      }
    ],
    reviews: [
      {
        name: 'Agus Setiawan',
        role: 'Team Lead',
        description: 'Kursus yang sangat membantu untuk mengembangkan soft skill leadership. Banyak insight praktis yang bisa langsung diterapkan.',
        rating: 4,
        date: '2 minggu lalu'
      }
    ]
  },
  {
    id: 8,
    image: '/assets/index/course section/course type/image-8.jpeg',
    title: 'Public Speaking Mastery',
    description: 'Tingkatkan kemampuan berbicara di depan umum dan presentasi yang percaya diri...',
    teacherImage: '/assets/index/course section/course teacher/image-8.png',
    teacherName: 'Michael Johnson',
    teacherJob: 'Communication Coach',
    stars: ['full', 'full', 'full', 'half', 'empty'],
    rating: '3.9 (75)',
    price: 'Rp 350K',
    category: 'Pengembangan Diri',
    fullDescription: 'Public Speaking Mastery mengajarkan teknik-teknik untuk menjadi pembicara publik yang percaya diri dan persuasif. Anda akan belajar cara mengatasi nervous, struktur presentasi yang efektif, body language, dan teknik storytelling.',
    modules: [
      {
        id: 1,
        title: 'Overcoming Fear of Public Speaking',
        lessons: [
          { title: 'Understanding Speech Anxiety', type: 'video', duration: '12 Menit' },
          { title: 'Confidence Building Techniques', type: 'video', duration: '15 Menit' }
        ]
      },
      {
        id: 2,
        title: 'Presentation Skills',
        lessons: [
          { title: 'Structuring Your Speech', type: 'video', duration: '18 Menit' },
          { title: 'Engaging Your Audience', type: 'video', duration: '20 Menit' }
        ]
      }
    ],
    tutors: [
      {
        name: 'Michael Johnson',
        role: 'Communication Coach',
        description: 'Professional communication coach dengan pengalaman melatih eksekutif dan public figures untuk berbicara di depan umum.',
        rating: 4.2,
        reviews: 75
      }
    ],
    reviews: [
      {
        name: 'Sari Dewi',
        role: 'Marketing Executive',
        description: 'Sangat membantu untuk mengatasi rasa nervous saat presentasi. Teknik-teknik yang diajarkan sangat praktis.',
        rating: 4,
        date: '1 bulan lalu'
      }
    ]
  },
  {
    id: 9,
    image: '/assets/index/course section/course type/image-9.jpeg',
    title: 'Business Strategy & Planning',
    description: 'Pelajari strategi bisnis dan perencanaan untuk mengembangkan usaha yang berkelanjutan...',
    teacherImage: '/assets/index/course section/course teacher/image-3.png',
    teacherName: 'Robert Chen',
    teacherJob: 'Business Consultant',
    stars: ['full', 'full', 'full', 'full', 'half'],
    rating: '4.4 (105)',
    price: 'Rp 600K',
    category: 'Bisnis',
    fullDescription: 'Business Strategy & Planning adalah kursus komprehensif yang mengajarkan cara mengembangkan strategi bisnis yang efektif. Anda akan belajar tentang market analysis, competitive strategy, business model canvas, dan financial planning untuk bisnis.',
    modules: [
      {
        id: 1,
        title: 'Strategic Thinking',
        lessons: [
          { title: 'Introduction to Business Strategy', type: 'video', duration: '15 Menit' },
          { title: 'Market Analysis Techniques', type: 'video', duration: '20 Menit' },
          { title: 'Competitive Analysis', type: 'video', duration: '18 Menit' }
        ]
      },
      {
        id: 2,
        title: 'Business Planning',
        lessons: [
          { title: 'Business Model Canvas', type: 'video', duration: '25 Menit' },
          { title: 'Financial Planning Basics', type: 'video', duration: '22 Menit' }
        ]
      }
    ],
    tutors: [
      {
        name: 'Robert Chen',
        role: 'Business Consultant',
        description: 'Business consultant dengan pengalaman 15 tahun membantu startup dan perusahaan mengembangkan strategi bisnis yang sustainable.',
        rating: 4.6,
        reviews: 105
      }
    ],
    reviews: [
      {
        name: 'Andi Wijaya',
        role: 'Entrepreneur',
        description: 'Kursus yang sangat valuable untuk entrepreneur. Framework yang diajarkan sangat applicable untuk bisnis real.',
        rating: 5,
        date: '1 minggu lalu'
      }
    ]
  },
];

export default courses;