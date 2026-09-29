export interface CourseDetail {
  slug: string;
  code: string;
  name: string;
  degree: string;
  department: string;
  duration: string;
  intake: string;
  eligibility: string;
  overview: string;
  curriculumHighlight: string;
  keySubjects: {
    semester: string;
    subjects: string[];
  }[];
  labs: string[];
  careerOpportunities: string[];
  admissionProcess: string[];
}

export const COURSES: Record<string, CourseDetail> = {
  cse: {
    slug: 'cse',
    code: 'B.Tech CSE',
    name: 'B.Tech Computer Science & Engineering',
    degree: 'Bachelor of Technology (B.Tech)',
    department: 'Department of Computer Science & Engineering',
    duration: '4 Years (8 Semesters, Full-Time)',
    intake: '[OFFICIAL INTAKE: e.g. 180 SEATS]',
    eligibility: '10+2 with Physics, Mathematics, and Chemistry/Computer Science with minimum 50% aggregate (45% for reserved categories) and valid score in JEE Main / OJEE / University Entrance.',
    overview: 'The Department of Computer Science & Engineering at NIST University provides a world-class academic foundation coupled with rigorous software and algorithmic development. The curriculum spans artificial intelligence, distributed systems, deep learning, cybersecurity, cloud architecture, and competitive coding, nurturing engineers who lead technological breakthroughs worldwide.',
    curriculumHighlight: 'Outcome-based Choice Based Credit System (CBCS) updated every academic year in collaboration with top IT advisory councils.',
    keySubjects: [
      {
        semester: 'Semester I & II (Foundation)',
        subjects: ['Engineering Mathematics I & II', 'Programming for Problem Solving (C/C++)', 'Digital Logic Design', 'Data Structures & Algorithms Basics', 'Engineering Physics', 'Basic Electrical Systems']
      },
      {
        semester: 'Semester III & IV (Core CS)',
        subjects: ['Advanced Data Structures', 'Object-Oriented Programming (Java/C++)', 'Discrete Mathematics', 'Computer Organization & Architecture', 'Database Management Systems (DBMS)', 'Operating Systems & Linux Kernel']
      },
      {
        semester: 'Semester V & VI (Advanced Systems)',
        subjects: ['Design & Analysis of Algorithms', 'Theory of Computation & Automata', 'Computer Networks & Protocols', 'Software Engineering & Agile Methodologies', 'Artificial Intelligence & Machine Learning', 'Cloud Computing & Microservices']
      },
      {
        semester: 'Semester VII & VIII (Specialization & Capstone)',
        subjects: ['Information Security & Cryptography', 'Big Data Analytics', 'Natural Language Processing / Computer Vision', 'DevOps & Site Reliability Engineering', 'Major Capstone Project', 'Industrial Internship & Seminar']
      }
    ],
    labs: [
      'NVIDIA GPU Deep Learning & AI Research Lab',
      'Advanced Cloud & Systems Architecture Lab',
      'Cybersecurity & Network Forensics Center',
      'Open Source & Competitive Programming Suite'
    ],
    careerOpportunities: [
      'Full Stack Software Engineer',
      'AI / Machine Learning Engineer',
      'Cloud Solutions Architect',
      'Cybersecurity Specialist & Penetration Tester',
      'Data Scientist & Analytics Consultant',
      'DevOps & Systems Reliability Engineer'
    ],
    admissionProcess: [
      'Fill and submit the online application form at /admissions/apply',
      'Upload 10th and 12th marksheets, candidate photograph and entrance score card',
      'Participate in academic counseling and document verification',
      'Receive official admission offer and complete semester enrollment'
    ]
  },
  ece: {
    slug: 'ece',
    code: 'B.Tech ECE',
    name: 'B.Tech Electronics & Communication Engineering',
    degree: 'Bachelor of Technology (B.Tech)',
    department: 'Department of Electronics & Communication Engineering',
    duration: '4 Years (8 Semesters, Full-Time)',
    intake: '[OFFICIAL INTAKE: e.g. 120 SEATS]',
    eligibility: '10+2 with Physics, Mathematics, and Chemistry with minimum 50% aggregate (45% for reserved categories) and valid score in JEE Main / OJEE / University Entrance.',
    overview: 'The B.Tech ECE programme focuses on the synthesis of semiconductor technology, signal processing, wireless communications, robotics, and embedded architectures. Students gain hands-on expertise with Cadence EDA suites, FPGA development boards, and RF instrumentation essential for modern aerospace, telecommunications, and automotive industries.',
    curriculumHighlight: 'Strong balance between theoretical semiconductor physics and practical embedded systems programming with IoT integration.',
    keySubjects: [
      {
        semester: 'Semester I & II (Engineering Basics)',
        subjects: ['Applied Mathematics', 'Engineering Chemistry', 'Basic Electronics & Instrumentation', 'Computer Programming (Python/C)', 'Circuit Theory & Analysis', 'Engineering Graphics']
      },
      {
        semester: 'Semester III & IV (Electronics Core)',
        subjects: ['Analog Electronic Circuits', 'Digital Electronics & Logic Circuits', 'Signals and Systems', 'Electromagnetic Field Theory', 'Microprocessors & Microcontrollers (8051, ARM)', 'Semiconductor Devices & Fabrication']
      },
      {
        semester: 'Semester V & VI (Communication Systems)',
        subjects: ['Digital Communication Systems', 'Digital Signal Processing (DSP)', 'VLSI Design & Hardware Description Languages (Verilog/VHDL)', 'Antenna & Microwave Engineering', 'Control Systems Engineering', 'Wireless Sensor Networks & IoT']
      },
      {
        semester: 'Semester VII & VIII (Industry Electives)',
        subjects: ['Optical Fiber Communications', 'Embedded Linux Systems', 'Radar & Satellite Communication', 'Nano-electronics & MEMS', 'Major Capstone Hardware/Software Project', 'Industry Internship']
      }
    ],
    labs: [
      'VLSI Design Lab with Cadence & Synopsys Toolkits',
      'Embedded Systems & ARM Cortex Design Lab',
      'Microwave & RF Communications Testing Suite',
      'Digital Signal Processing (DSP) & Image Processing Lab'
    ],
    careerOpportunities: [
      'VLSI Design & Verification Engineer',
      'Embedded Firmware Developer',
      'RF & Microwave Communications Engineer',
      'Telecommunications Network Specialist',
      'Robotics & Automation Systems Engineer',
      'IoT Solutions Architect'
    ],
    admissionProcess: [
      'Submit the online admission form at /admissions/apply',
      'Upload academic records and national/state entrance test credentials',
      'Attend departmental counseling & technical orientation',
      'Confirm seat allocation and finalize hostel/registration formalities'
    ]
  },
  eee: {
    slug: 'eee',
    code: 'B.Tech EEE',
    name: 'B.Tech Electrical & Electronics Engineering',
    degree: 'Bachelor of Technology (B.Tech)',
    department: 'Department of Electrical & Electronics Engineering',
    duration: '4 Years (8 Semesters, Full-Time)',
    intake: '[OFFICIAL INTAKE: e.g. 90 SEATS]',
    eligibility: '10+2 with Physics, Mathematics, and Chemistry with minimum 50% aggregate (45% for reserved categories) and valid score in JEE Main / OJEE / University Entrance.',
    overview: 'The B.Tech EEE program prepares engineers to lead the energy transition, electric vehicle revolution, and smart power grids. By unifying high-power electrical infrastructure with modern microcontroller automation, power electronics, and renewable energy conversion, graduates tackle critical sustainability and industrial power challenges.',
    curriculumHighlight: 'Specialized lab tracks in Electric Vehicle Powertrains, Renewable Micro-grids, and SCADA industrial automation.',
    keySubjects: [
      {
        semester: 'Semester I & II (Core Foundation)',
        subjects: ['Calculus & Differential Equations', 'Engineering Mechanics', 'Basic Electrical Engineering', 'Physics for Engineers', 'Programming with Python', 'Workshop Practice']
      },
      {
        semester: 'Semester III & IV (Electrical Fundamentals)',
        subjects: ['Network Analysis & Synthesis', 'Electrical Machines I (Transformers & DC Machines)', 'Analog & Digital Electronics', 'Electromagnetic Theory', 'Electrical & Electronic Measurements', 'Power Generation & Economics']
      },
      {
        semester: 'Semester V & VI (Power & Drives)',
        subjects: ['Electrical Machines II (AC Machines & Synchronous)', 'Power Electronics & Converters', 'Control Systems', 'Power System Analysis & Protection', 'Microcontrollers & PLC Programming', 'Renewable Energy Systems']
      },
      {
        semester: 'Semester VII & VIII (Advanced Systems)',
        subjects: ['Electric Vehicle Technology & Battery Management', 'Smart Grid & High Voltage Engineering', 'Industrial Drives & Automation', 'Power Quality & FACTS', 'Final Capstone Project', 'Industrial Field Training']
      }
    ],
    labs: [
      'Electrical Machines & Drives Laboratory',
      'Power Electronics & Renewable Energy Lab',
      'Power Systems Simulation & Protection Lab',
      'Electric Vehicle Propulsion & Battery Testing Center'
    ],
    careerOpportunities: [
      'Power Systems & Grid Operations Engineer',
      'Electric Vehicle (EV) Powertrain Engineer',
      'Power Electronics Design Engineer',
      'Renewable Energy Project Manager',
      'Industrial Automation & PLC Specialist',
      'Energy Audit & Sustainability Consultant'
    ],
    admissionProcess: [
      'Apply online via the university portal /admissions/apply',
      'Provide qualifying examination details and entrance scorecard',
      'Counseling round with university admission deans',
      'Document verification and issuance of admission letter'
    ]
  },
  mca: {
    slug: 'mca',
    code: 'MCA',
    name: 'Master of Computer Applications',
    degree: 'Master of Computer Applications (MCA)',
    department: 'Department of Computer Applications',
    duration: '2 Years (4 Semesters, Full-Time)',
    intake: '[OFFICIAL INTAKE: e.g. 60 SEATS]',
    eligibility: 'Passed BCA / Bachelor Degree in Computer Science Engineering or equivalent Degree. OR Passed B.Sc./ B.Com./ B.A. with Mathematics at 10+2 Level or at Graduation Level with minimum 50% marks (45% for reserved category) and OJEE / University Entrance.',
    overview: 'The Master of Computer Applications (MCA) is a premier postgraduate program designed for ambitious graduates aiming for high-level software engineering, cloud architecture, and data science leadership. The accelerated 2-year curriculum provides deep immersion into modern software stacks, distributed databases, machine learning, and enterprise DevOps.',
    curriculumHighlight: 'Intensive industry capstone project with mandatory 6-month enterprise software internship.',
    keySubjects: [
      {
        semester: 'Semester I (Advanced Foundations)',
        subjects: ['Mathematical Foundations of Computer Science', 'Advanced Data Structures & Algorithms', 'Modern Operating Systems & Shell Scripting', 'Enterprise Database Management Systems', 'Software Engineering & Object-Oriented Design', 'Python & Java Programming Lab']
      },
      {
        semester: 'Semester II (Enterprise Systems)',
        subjects: ['Full-Stack Web Technologies (React, Node, Next.js)', 'Computer Networks & Network Security', 'Cloud Computing & Virtualization', 'Artificial Intelligence & Data Mining', 'Mobile Application Development', 'Full-Stack Development Lab']
      },
      {
        semester: 'Semester III (Specialization & Research)',
        subjects: ['Machine Learning & Big Data Analytics', 'DevOps, CI/CD & Kubernetes', 'Information Security & Blockchain Basics', 'Agile Product Management', 'Elective Track (Cloud / AI / Cybersecurity)', 'Mini Project with Industry Mentor']
      },
      {
        semester: 'Semester IV (Capstone & Internship)',
        subjects: ['Full Semester Industry Internship / Industrial Project', 'Comprehensive Viva Voce', 'Dissertation Presentation & Defense']
      }
    ],
    labs: [
      'Enterprise Full-Stack & Cloud Computing Lab',
      'Big Data & Advanced Analytics Center',
      'Software Testing & Quality Assurance Suite',
      'Mobile Application & UI/UX Design Studio'
    ],
    careerOpportunities: [
      'Senior Software Engineer / Lead Developer',
      'Enterprise Cloud & DevOps Architect',
      'Data Engineer & Big Data Specialist',
      'Database Administrator (DBA)',
      'Product Engineer & Technical Consultant',
      'Mobile Solutions Architect'
    ],
    admissionProcess: [
      'Submit your application through the portal at /admissions/apply',
      'Upload undergraduate marksheets and entrance qualification proof',
      'Undergo document validation and merit seat counseling',
      'Receive registration package and orientation schedule'
    ]
  }
};
