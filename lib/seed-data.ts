import { Faculty, Facility, CareerJob, Notice, GalleryItem } from './types';

export const SEED_FACULTY: Faculty[] = [];

export const SEED_FACILITIES: Facility[] = [
  {
    id: 'fac-comp-lab',
    title: 'Computer Lab',
    icon: 'Monitor',
    description: '[EDITABLE CONTENT — replace with the university-verified Computer Lab description.]',
    image_url: '/images/computer_lab.jpg',
    features: [
      '[EDITABLE CONTENT — verified facility feature]'
    ]
  },
  {
    id: 'fac-library',
    title: 'Library',
    icon: 'BookOpen',
    description: '[EDITABLE CONTENT — replace with the university-verified Library description.]',
    image_url: '/images/library.jpg',
    features: [
      '[EDITABLE CONTENT — verified facility feature]'
    ]
  },
  {
    id: 'fac-smart-class',
    title: 'Smart Classroom',
    icon: 'Presentation',
    description: '[EDITABLE CONTENT — replace with the university-verified Smart Classroom description.]',
    image_url: '/images/smart_classroom.jpg',
    features: [
      '[EDITABLE CONTENT — verified facility feature]'
    ]
  },
  {
    id: 'fac-hostel',
    title: 'Hostel',
    icon: 'Home',
    description: '[EDITABLE CONTENT — replace with the university-verified Hostel description.]',
    image_url: '/images/hostel.jpg',
    features: [
      '[EDITABLE CONTENT — verified facility feature]'
    ]
  },
  {
    id: 'fac-sports',
    title: 'Sports Complex',
    icon: 'Trophy',
    description: '[EDITABLE CONTENT — replace with the university-verified Sports Complex description.]',
    image_url: '/images/sports_complex.jpg',
    features: [
      '[EDITABLE CONTENT — verified facility feature]'
    ]
  }
];

export const SEED_JOBS: CareerJob[] = [];
/* Example job records intentionally disabled until an administrator verifies and publishes them.
export const SEED_JOBS: CareerJob[] = [
  {
    id: 'job-1',
    title: 'Assistant Professor - Computer Science & Engineering',
    department: 'Computer Science & Engineering',
    location: 'NIST Campus',
    employment_type: 'Full-Time',
    experience: '2 - 5 Years teaching / research experience',
    description: 'Seeking dynamic educators and researchers with strong foundations in Artificial Intelligence, Machine Learning, or Systems Architecture to mentor undergraduate and postgraduate students.',
    responsibilities: [
      'Deliver undergraduate lectures and laboratory sessions in core CS subjects',
      'Supervise capstone design projects and undergraduate research thesis',
      'Publish research in peer-reviewed indexed journals and conferences',
      'Participate actively in departmental curriculum revision and NBA accreditation activities'
    ],
    requirements: [
      'M.Tech in CSE / IT with first class; Ph.D. submitted or awarded is strongly preferred',
      'Demonstrated teaching proficiency and curriculum delivery skills',
      'Strong coding skills in Python, C++, Java, or modern web frameworks',
      'Passionate about student mentorship and innovation'
    ],
    active: true,
    created_at: '2026-09-01T10:00:00Z'
  },
  {
    id: 'job-2',
    title: 'Associate Professor - Electronics & Communication Engineering',
    department: 'Electronics & Communication Engineering',
    location: 'NIST Campus',
    employment_type: 'Full-Time',
    experience: '8+ Years teaching / industrial research experience',
    description: 'Leadership role driving experimental research, sponsored grants, and academic pedagogy in Embedded Systems, VLSI, and Wireless Communications.',
    responsibilities: [
      'Lead laboratory modernization and industry-sponsored research initiatives',
      'Teach advanced courses in VLSI, Digital Signal Processing, or RF systems',
      'Author proposals for government and industrial research grants',
      'Mentor junior faculty and Ph.D. scholars'
    ],
    requirements: [
      'Ph.D. in Electronics & Communication Engineering or related discipline',
      'Minimum of 8 years of post-qualification teaching or industrial research',
      'Proven track record of high-impact SCI/Scopus journal publications',
      'Hands-on experience with CAD tools like Cadence, Synopsys, or MATLAB'
    ],
    active: true,
    created_at: '2026-09-05T10:00:00Z'
  },
  {
    id: 'job-3',
    title: 'Lab Assistant - AI & Computing Systems',
    department: 'Information Technology / Computer Labs',
    location: 'NIST Campus',
    employment_type: 'Full-Time',
    experience: '1 - 3 Years',
    description: 'Manage specialized computing labs, assist faculty during laboratory classes, maintain workstation software images, and support student hackathons.',
    responsibilities: [
      'Configure and maintain Linux and Windows workstations in student labs',
      'Assist students with IDE setup, Docker environments, and GPU toolkits',
      'Monitor hardware inventory and peripheral functionality',
      'Ensure safety standards and cleanliness across computing facilities'
    ],
    requirements: [
      'Diploma or B.Sc. / BCA in Computer Science or Information Technology',
      'Familiarity with Ubuntu/Debian server administration and networking basics',
      'Helpful demeanor and willingness to assist students'
    ],
    active: true,
    created_at: '2026-09-10T10:00:00Z'
  },
  {
    id: 'job-4',
    title: 'Administrative Officer - Admissions & Student Affairs',
    department: 'Administration',
    location: 'NIST Campus',
    employment_type: 'Full-Time',
    experience: '3 - 6 Years in higher education administration',
    description: 'Coordinate admissions inquiries, verify student candidate dossiers, organize campus tours, and support registrar operations.',
    responsibilities: [
      'Process candidate applications and assist prospective students and parents',
      'Maintain verified student records and admissions database integrity',
      'Liaise with academic departments during counseling and enrollment cycles',
      'Coordinate open days and education fairs'
    ],
    requirements: [
      'Bachelor’s or Master’s degree in Management, Public Administration, or related field',
      'Excellent verbal and written communication in English and local languages',
      'Proficiency in ERP systems, spreadsheets, and database management'
    ],
    active: true,
    created_at: '2026-09-12T10:00:00Z'
  }
];
*/

export const SEED_NOTICES: Notice[] = [];
/* Example notices intentionally disabled until verified by an administrator.
export const SEED_NOTICES: Notice[] = [
  {
    id: 'not-1',
    title: 'Admissions 2026-27 Open for B.Tech (CSE, ECE, EEE) & MCA Programs',
    category: 'Admissions',
    content: 'Online applications are formally invited for admission into B.Tech and MCA programmes for the academic session 2026-2027. Eligible candidates can submit their online admission form through the portal before the announced priority deadlines.',
    date: '2026-09-15',
    attachment: '/docs/admissions_brochure_2026.pdf',
    published: true,
    created_at: '2026-09-15T09:00:00Z'
  },
  {
    id: 'not-2',
    title: 'National Level TechFest & Hackathon "INNOVIX 2026" Announced',
    category: 'Events',
    content: 'NIST University cordially invites student engineering teams nationwide to compete in the 36-hour flagship hackathon on Smart Cities, Generative AI, and Sustainable Energy Systems. Cash prizes worth [EDITABLE CONTENT] to be won.',
    date: '2026-09-20',
    attachment: '/docs/innovix_rulebook_2026.pdf',
    published: true,
    created_at: '2026-09-20T11:00:00Z'
  },
  {
    id: 'not-3',
    title: 'Autumn Semester 2026 Mid-Term Examination Schedule Released',
    category: 'Examination',
    content: 'The official timetable for B.Tech (1st, 3rd, 5th, 7th Semesters) and MCA Autumn 2026 mid-term evaluations has been published. Students are advised to download the detailed departmental timetable from the student ERP.',
    date: '2026-09-22',
    attachment: '/docs/midterm_schedule_autumn2026.pdf',
    published: true,
    created_at: '2026-09-22T14:30:00Z'
  },
  {
    id: 'not-4',
    title: 'Recruitment of Assistant Professors and Research Fellows',
    category: 'Recruitment',
    content: 'Applications are invited from eligible Ph.D./M.Tech candidates for faculty positions in the Department of Computer Science & Engineering and Electronics & Communication Engineering. Apply online via the Careers portal.',
    date: '2026-09-25',
    attachment: '/docs/faculty_recruitment_circular_2026.pdf',
    published: true,
    created_at: '2026-09-25T16:00:00Z'
  },
  {
    id: 'not-5',
    title: 'Campus Placement Orientation Drive for Final Year Students',
    category: 'General',
    content: 'The Training & Placement Cell will conduct mandatory mock interviews, technical test preparation, and resume clinic sessions for final year B.Tech and MCA students starting this Friday at the Main Auditorium.',
    date: '2026-09-26',
    attachment: '',
    published: true,
    created_at: '2026-09-26T10:00:00Z'
  }
];
*/

export const SEED_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Main Academic Quad & Central Entrance',
    category: 'Campus',
    image_url: '/images/hero.jpg',
    caption: 'The landmark architectural entrance and green campus walkways of NIST University.',
    created_at: '2026-09-01T00:00:00Z'
  },
  {
    id: 'gal-2',
    title: 'High Performance AI & Computing Lab',
    category: 'Laboratories',
    image_url: '/images/computer_lab.jpg',
    caption: 'Engineering students collaborating on machine learning research projects in the computing laboratory.',
    created_at: '2026-09-02T00:00:00Z'
  },
  {
    id: 'gal-3',
    title: 'Central Multi-Tier Library Atrium',
    category: 'Campus',
    image_url: '/images/library.jpg',
    caption: 'Students engaged in quiet scholarly research under the naturally illuminated geometric skylight.',
    created_at: '2026-09-03T00:00:00Z'
  },
  {
    id: 'gal-4',
    title: 'Amphitheater Smart Lecture Hall',
    category: 'Laboratories',
    image_url: '/images/smart_classroom.jpg',
    caption: 'Interactive presentation and lecture session featuring panoramic smart boards.',
    created_at: '2026-09-04T00:00:00Z'
  },
  {
    id: 'gal-5',
    title: 'Olympic-Standard Athletic Stadium',
    category: 'Sports',
    image_url: '/images/sports_complex.jpg',
    caption: 'Students training on the running track and turf ground during university athletic trials.',
    created_at: '2026-09-05T00:00:00Z'
  },
  {
    id: 'gal-6',
    title: 'Student Residential Halls & Courtyard',
    category: 'Campus',
    image_url: '/images/hostel.jpg',
    caption: 'Evening atmosphere around the hostel courtyard and modern student study commons.',
    created_at: '2026-09-06T00:00:00Z'
  },
  {
    id: 'gal-7',
    title: 'Annual Technical Innovation Symposium',
    category: 'Events',
    image_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80',
    caption: 'Keynote address by industry leaders at the annual NIST University Technology Summit.',
    created_at: '2026-09-07T00:00:00Z'
  },
  {
    id: 'gal-8',
    title: 'Robotics & Hardware Hackathon Project',
    category: 'Students',
    image_url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80',
    caption: 'Students fine-tuning autonomous robotics prototypes in the innovation makerspace.',
    created_at: '2026-09-08T00:00:00Z'
  },
  {
    id: 'gal-9',
    title: 'Inter-College Football Tournament',
    category: 'Sports',
    image_url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1000&q=80',
    caption: 'Vibrant action from the annual university sports championship tournament.',
    created_at: '2026-09-09T00:00:00Z'
  },
  {
    id: 'gal-10',
    title: 'Cultural Festival "SANSKRITI" Music Night',
    category: 'Cultural Events',
    image_url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=80',
    caption: 'Dazzling stage lights and musical performances during the annual cultural celebration.',
    created_at: '2026-09-10T00:00:00Z'
  },
  {
    id: 'gal-11',
    title: 'Collaborative Student Study Group',
    category: 'Students',
    image_url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80',
    caption: 'Undergraduate engineering students brainstorming algorithms in the campus study lounge.',
    created_at: '2026-09-11T00:00:00Z'
  },
  {
    id: 'gal-12',
    title: 'Graduation Day & Convocation Ceremony',
    category: 'Events',
    image_url: 'https://images.unsplash.com/photo-1627556704290-2b1f5853ff78?auto=format&fit=crop&w=1000&q=80',
    caption: 'Graduating batch tossing their convocation caps at the NIST University Amphitheater.',
    created_at: '2026-09-12T00:00:00Z'
  }
];
