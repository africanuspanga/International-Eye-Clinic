// Built-in website content that used to live inside components.
// It is the fallback if the database can't be reached, and the source the
// seed script copies into Supabase. Edit content in the admin, not here.

export type HeroSlide = { src: string; alt: string; href?: string };
export type GalleryImage = { src: string; alt: string; category?: string; span?: string };
export type Testimonial = {
  name: string;
  location: string;
  procedure: string;
  rating: number;
  initials: string;
  color: string;
  text: string;
};
export type DoctorCard = {
  name: string;
  title: string;
  specialty: string[];
  experience: string;
  education: string;
  membership: string;
  href: string;
  image: string;
  bio: string;
};
export type ServiceCard = { title: string; href: string; image: string; desc: string; category: string };

export const HERO_SLIDES: HeroSlide[] = [
  { src: "/images/hero/poster-glaucoma.png", alt: "Glaucoma — damage to the optic nerve that can lead to total loss of vision if not detected and treated early. Call 0784 104 300" },
  { src: "/images/hero/poster-glaucoma-causes.png", alt: "Causes and symptoms of glaucoma — age, ethnicity and family history. Call 0784 104 300" },
  { src: "/images/hero/poster-glaucoma-prevention.png", alt: "Glaucoma prevention and treatment — early detection through regular eye exams. Call 0784 104 300" },
  { src: "/images/hero/poster-smart-lenses.png", alt: "Smart Lenses — faida za kutumia. Weka oda yako sasa" },
];

/** Home page gallery grid (with tile sizes). */
export const HOME_GALLERY: GalleryImage[] = [
  { src: "/images/new images/eye.jpg", alt: "Eye close-up", span: "col-span-2 row-span-2" },
  { src: "/images/eye examination 1.jpg", alt: "Eye examination" },
  { src: "/images/lasik 1.jpg", alt: "LASIK vision correction" },
  { src: "/images/eye 2.jpg", alt: "Eye detail", span: "col-span-2" },
  { src: "/images/new images/gallery-surgery-equipment.jpg", alt: "Surgical microscope suite", span: "row-span-2" },
  { src: "/images/eye test 1.jpg", alt: "Eye test" },
  { src: "/images/optic 4.jpg", alt: "Optic examination" },
  { src: "/images/new images/gallery-doctors-team.jpg", alt: "Doctors with diagnostic equipment", span: "col-span-2" },
  { src: "/images/lasik 2.jpg", alt: "Advanced laser surgery" },
  { src: "/images/eye examination 6.jpg", alt: "Patient examination" },
  { src: "/images/staff-3.jpg", alt: "Medical staff", span: "row-span-2" },
  { src: "/images/new images/gallery-patient-glasses.jpg", alt: "Patient trying on glasses" },
  { src: "/images/eye examination 8.jpg", alt: "Advanced eye exam" },
  { src: "/images/new images/gallery-diagnostic-equipment.jpg", alt: "Diagnostic phoropter station" },
  { src: "/images/eye test 2.jpg", alt: "Vision testing" },
];

/** Full gallery page. */
export const GALLERY_IMAGES: GalleryImage[] = [
  { src: "/images/new images/eye.jpg", alt: "Close-up eye detail", category: "Clinical" },
  { src: "/images/eye examination 1.jpg", alt: "Patient eye examination", category: "Examination" },
  { src: "/images/eye examination 6.jpg", alt: "Slit-lamp examination", category: "Examination" },
  { src: "/images/eye examination 8.jpg", alt: "Advanced diagnostic exam", category: "Examination" },
  { src: "/images/eye examination 9.jpg", alt: "Ophthalmology consultation", category: "Examination" },
  { src: "/images/eye test 1.jpg", alt: "Visual acuity test", category: "Eye Tests" },
  { src: "/images/eye test 2.jpg", alt: "Automated refraction", category: "Eye Tests" },
  { src: "/images/eye 2.jpg", alt: "Anterior segment detail", category: "Clinical" },
  { src: "/images/eye 3.jpg", alt: "Retinal imaging", category: "Clinical" },
  { src: "/images/lasik 1.jpg", alt: "LASIK laser vision correction", category: "Surgery" },
  { src: "/images/lasik 2.jpg", alt: "Advanced laser eye surgery", category: "Surgery" },
  { src: "/images/optic 4.jpg", alt: "Optic nerve evaluation", category: "Diagnostics" },
  { src: "/images/staff 3.jpg", alt: "Medical team", category: "Our Team" },
  { src: "/images/staff-3.jpg", alt: "Clinical staff", category: "Our Team" },
  { src: "/images/new images/gallery-patient-glasses.jpg", alt: "Patient trying on prescription glasses", category: "Eye Tests" },
  { src: "/images/new images/gallery-surgery-equipment.jpg", alt: "Advanced ophthalmic surgical microscope and laser suite", category: "Surgery" },
  { src: "/images/new images/gallery-diagnostic-equipment.jpg", alt: "TOPCON CV-3000 automated phoropter and diagnostic station", category: "Diagnostics" },
  { src: "/images/new images/gallery-phaco-machine.jpg", alt: "Bausch & Lomb Stellaris PC phacoemulsification system", category: "Surgery" },
  { src: "/images/new images/gallery-laser-suite.jpg", alt: "VISX Star S4 laser vision correction suite", category: "Surgery" },
  { src: "/images/new images/gallery-lensmeter.jpg", alt: "Auto lensmeter measuring prescription eyeglasses", category: "Eye Tests" },
  { src: "/images/new images/gallery-doctors-team.jpg", alt: "Ophthalmologists with slit-lamp examination equipment", category: "Our Team" },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Amina Hassan",
    location: "Dar es Salaam",
    procedure: "Cataract Surgery",
    rating: 5,
    initials: "AH",
    color: "#e62d26",
    text: "I had been struggling with cloudy vision for years, too afraid to seek help. International Eye Hospital changed my life completely. The doctors were kind, patient, and incredibly skilled. My vision is now clearer than it has been in decades. I am forever grateful.",
  },
  {
    name: "John Mkwawa",
    location: "Dodoma",
    procedure: "Glaucoma Treatment",
    rating: 5,
    initials: "JM",
    color: "#1a2a6c",
    text: "After struggling with high eye pressure for years, the glaucoma treatment at International Eye Hospital has preserved my vision. The doctors were thorough, the monitoring is excellent, and the staff made me feel completely at ease from the moment I walked in. Truly world-class care.",
  },
  {
    name: "Fatuma Ali",
    location: "Zanzibar",
    procedure: "Glaucoma Treatment",
    rating: 5,
    initials: "FA",
    color: "#1a6c3a",
    text: "I was diagnosed with glaucoma and was terrified of losing my sight. Prof. Dr. Guler and his team put my fears to rest with their expertise and compassion. My condition is now well-managed and my vision is preserved. I recommend this hospital to everyone.",
  },
  {
    name: "David Mwangi",
    location: "Mwanza",
    procedure: "Retina Treatment",
    rating: 5,
    initials: "DM",
    color: "#1a5a6c",
    text: "The retina specialists here are extraordinary. I came with diabetic eye complications that had gone untreated. They were professional, thorough, and genuinely caring. The advanced equipment they use is as good as anything I have seen abroad.",
  },
  {
    name: "Sarah Kimani",
    location: "Arusha",
    procedure: "General Eye Exam",
    rating: 5,
    initials: "SK",
    color: "#6c1a5a",
    text: "Even for a routine eye check, the experience was exceptional. The facility is immaculate, modern, and calming. The doctor took time to explain everything clearly. This is how healthcare should feel everywhere in Tanzania.",
  },
  {
    name: "Omar Juma",
    location: "Dar es Salaam",
    procedure: "Cornea Transplant",
    rating: 5,
    initials: "OJ",
    color: "#6c3a1a",
    text: "My cornea transplant was performed with absolute precision. The surgical team's confidence and competence put me completely at ease. Six months later, my vision is outstanding. A life-changing experience I am deeply thankful for.",
  },
];

/** Doctor cards on the home page (short bios). */
export const HOME_DOCTOR_CARDS: DoctorCard[] = [
  {
    name: "Dr. Muammer Coskun",
    title: "Consultant Ophthalmologist / Eye Surgeon",
    specialty: ["Cataract Surgery", "Glaucoma Surgery", "Laser Eye Procedures", "Medical Retina", "Pterygium Surgery"],
    experience: "20+",
    education: "Ege University Faculty of Medicine",
    membership: "Turkish Ophthalmology Society",
    href: "/doctors/muammer-coskun",
    image: "/doctors/muammer-coskun.jpeg",
    bio: "Experienced ophthalmologist and eye surgeon with more than two decades of clinical and surgical experience across leading hospitals in Turkey and Nigeria.",
  },
  {
    name: "Dr. Vangilisasi Msola",
    title: "Ophthalmologist, Epidemiologist & Data Scientist",
    specialty: ["General Ophthalmology", "Public Health Eye Care", "Clinical Research", "Health Data", "Medical Teaching"],
    experience: "5+",
    education: "University of the Witwatersrand",
    membership: "Tanzania Ophthalmologist Society",
    href: "/doctors/vangilisasi-msola",
    image: "/doctors/vangilisasi-msola.jpeg",
    bio: "Tanzanian ophthalmologist with additional expertise in epidemiology, implementation science, data science, health research, and medical teaching.",
  },
  {
    name: "Dr. Zayd Mohamed Sangey",
    title: "Ophthalmologist",
    specialty: ["Cornea", "Refractive & External Eye Diseases", "Cataract", "Glaucoma", "Medical Retina", "Uveitis", "Pediatric Ophthalmology"],
    experience: "3+",
    education: "Muhimbili University of Health and Allied Sciences",
    membership: "Tanzania Ophthalmology Society",
    href: "/doctors/zayd-sangey",
    image: "/doctors/zayd-sangey.jpeg",
    bio: "A compassionate ophthalmologist focused on improving vision through preventive, corrective, medical, and surgical eye care.",
  },
  {
    name: "Dr. Harley H. Mkini",
    title: "Optometrist",
    specialty: ["Refraction", "Contact Lenses", "Low Vision", "Pediatric Optometry", "Diabetic Eye Clinic", "Glaucoma Clinic"],
    experience: "4+",
    education: "Kilimanjaro Christian Medical University College",
    membership: "IACLE, Myopia Society",
    href: "/doctors/harley-mkini",
    image: "/doctors/harley-mkini.jpeg",
    bio: "Optometrist and primary eye care provider experienced in refraction, contact lenses, low vision rehabilitation, glaucoma clinic support, and diabetic eye clinic support.",
  },
  {
    name: "Dr. Michael Machimu",
    title: "Optometrist",
    specialty: ["Vision Testing", "Corrective Lenses", "Eye Condition Assessment", "Patient Eye Care", "Preventive Vision Care"],
    experience: "3+",
    education: "Kilimanjaro Christian Medical University College",
    membership: "",
    href: "/doctors/michael-machimu",
    image: "/doctors/michael-machimu.jpeg",
    bio: "A skilled optometrist providing professional vision assessment, corrective lens support, and patient-focused eye care services.",
  },
];

/** Doctor cards on /doctors (long bios). */
export const DOCTOR_CARDS: DoctorCard[] = [
  {
    name: "Dr. Muammer Coskun",
    title: "Consultant Ophthalmologist / Eye Surgeon",
    specialty: ["Cataract Surgery", "Glaucoma Surgery", "Laser Eye Procedures", "Medical Retina", "Pterygium Surgery"],
    experience: "20+",
    education: "Ege University Faculty of Medicine",
    membership: "Turkish Ophthalmology Society",
    href: "/doctors/muammer-coskun",
    image: "/doctors/muammer-coskun.jpeg",
    bio: "Experienced ophthalmologist and eye surgeon with more than two decades of clinical and surgical experience across leading hospitals in Turkey and Nigeria. His areas of experience include cataract surgery, glaucoma surgery, pterygium surgery, YAG laser, argon laser, medical retina treatments, and other ophthalmic procedures.",
  },
  {
    name: "Dr. Vangilisasi Msola",
    title: "Ophthalmologist, Epidemiologist & Data Scientist",
    specialty: ["General Ophthalmology", "Public Health Eye Care", "Clinical Research", "Health Data", "Medical Teaching"],
    experience: "5+",
    education: "University of the Witwatersrand, Mzumbe University",
    membership: "Tanzania Ophthalmologist Society",
    href: "/doctors/vangilisasi-msola",
    image: "/doctors/vangilisasi-msola.jpeg",
    bio: "Tanzanian ophthalmologist with advanced training in ophthalmology, epidemiology, implementation science, and corporate management. He has worked with International Eye Hospital since June 2022 and has broad experience in clinical ophthalmology, research, public health, teaching, and health data analysis.",
  },
  {
    name: "Dr. Zayd Mohamed Sangey",
    title: "Ophthalmologist",
    specialty: ["Cornea", "Refractive & External Eye Diseases", "Cataract", "Glaucoma", "Medical Retina", "Uveitis", "Pediatric Ophthalmology"],
    experience: "3+",
    education: "Muhimbili University of Health and Allied Sciences",
    membership: "Tanzania Ophthalmology Society",
    href: "/doctors/zayd-sangey",
    image: "/doctors/zayd-sangey.jpeg",
    bio: "A compassionate ophthalmologist focused on improving vision through preventive, corrective, medical, and surgical eye care. Trained at Muhimbili, he provides specialist care with special interests in cornea, refractive and external eye diseases, cataract, glaucoma, medical retina, uveitis, and pediatric ophthalmology.",
  },
  {
    name: "Dr. Harley H. Mkini",
    title: "Optometrist",
    specialty: ["Refraction", "Contact Lenses", "Low Vision", "Pediatric Optometry", "Diabetic Eye Clinic", "Glaucoma Clinic"],
    experience: "4+",
    education: "Kilimanjaro Christian Medical University College",
    membership: "IACLE, Myopia Society",
    href: "/doctors/harley-mkini",
    image: "/doctors/harley-mkini.jpeg",
    bio: "Optometrist and primary eye care provider with experience in refraction, ophthalmic dispensing, low vision rehabilitation, binocular vision assessment, pediatric and geriatric optometry, contact lenses, glaucoma clinic support, diabetic eye clinic support, and ocular disease management. He has served at International Eye Hospital since August 2021.",
  },
  {
    name: "Dr. Michael Machimu",
    title: "Optometrist",
    specialty: ["Vision Testing", "Corrective Lenses", "Eye Condition Assessment", "Patient Eye Care", "Preventive Vision Care"],
    experience: "3+",
    education: "Kilimanjaro Christian Medical University College",
    membership: "",
    href: "/doctors/michael-machimu",
    image: "/doctors/michael-machimu.jpeg",
    bio: "A skilled optometrist providing professional vision assessment, corrective lens support, and patient-focused eye care services. He holds a Bachelor of Science in Optometry from Kilimanjaro Christian Medical University College and is currently pursuing a Master of Science in Applied Epidemiology and Biostatistics.",
  },
];

/** Cards on /services. */
export const SERVICE_CARDS: ServiceCard[] = [
  {
    title: "Cataract Surgery",
    href: "/services/cataract",
    image: "/images/eye examination 8.jpg",
    desc: "Modern surgical techniques to remove clouded lenses and restore clear vision using premium intraocular lenses.",
    category: "Surgery",
  },
  {
    title: "Multifocal Cataract Surgery",
    href: "/services/multifocal-cataract",
    image: "/images/eye examination 8.jpg",
    desc: "Advanced cataract treatment with premium multifocal lenses for clear vision at all distances with reduced dependence on glasses.",
    category: "Surgery",
  },

  {
    title: "Glaucoma",
    href: "/services/glaucoma",
    image: "/images/eye test 1.jpg",
    desc: "Early detection and long-term management of glaucoma to preserve your optic nerve and vision.",
    category: "Medical",
  },
  {
    title: "Retina – Diabetic Retinopathy",
    href: "/services/retina",
    image: "/images/optic 4.jpg",
    desc: "Expert retina care including treatment for diabetic retinopathy, macular degeneration, and retinal detachment.",
    category: "Specialist",
  },
  {
    title: "Keratoconus Crosslinking",
    href: "/services/keratoconus",
    image: "/images/eye examination 5.jpg",
    desc: "Corneal crosslinking and specialty contact lens management for keratoconus patients.",
    category: "Specialist",
  },
  {
    title: "Cornea Transplant",
    href: "/services/cornea",
    image: "/images/eye examination 9.jpg",
    desc: "Full-thickness and lamellar corneal transplantation by our experienced corneal surgeons.",
    category: "Surgery",
  },
  {
    title: "Optic Department",
    href: "/services/optic",
    image: "/images/eye examination 6.jpg",
    desc: "Prescription glasses and contact lens services with the latest optical technology.",
    category: "General",
  },
  {
    title: "General Eye Examination",
    href: "/services/general-exam",
    image: "/images/eye examination 1.jpg",
    desc: "Comprehensive eye health assessment for all ages — ideal for annual check-ups and early detection.",
    category: "General",
  },
  {
    title: "Eye Tests (Diagnostics)",
    href: "/services/eye-tests",
    image: "/images/eye test 2.jpg",
    desc: "OCT, FFA, Corneal Topography, Tonometry, Visual Field, A-Scan and full diagnostic testing.",
    category: "Diagnostics",
  },
];

/** SEO titles/descriptions from the original per-page files, keyed by "doctors/slug" or "services/slug". */
export const SEO_OVERRIDES: Record<string, { title: string; description: string }> = {
  "doctors/harley-mkini": {
    "title": "Dr. Harley H. Mkini | Optometrist",
    "description": "Dr. Harley H. Mkini — Optometrist at International Eye Hospital, Dar es Salaam. Experience in refraction, contact lenses, low vision care, pediatric optometry, glaucoma clinic support, and diabetic eye clinic support."
  },
  "doctors/michael-machimu": {
    "title": "Dr. Michael Machimu | Optometrist",
    "description": "Dr. Michael Machimu — Optometrist at International Eye Hospital, Dar es Salaam. He provides professional eye care services including vision assessment, corrective lens support, and patient-focused optometry care. He holds a Bachelor of Science in Optometry from Kilimanjaro Christian Medical University College and is currently pursuing a Master of Science in Applied Epidemiology and Biostatistics."
  },
  "doctors/muammer-coskun": {
    "title": "Dr. Muammer Coskun | Consultant Ophthalmologist / Eye Surgeon",
    "description": "Dr. Muammer Coskun — Consultant Ophthalmologist and Eye Surgeon at International Eye Hospital, Dar es Salaam. Extensive experience in cataract surgery, glaucoma care, laser eye procedures, and medical retina."
  },
  "doctors/vangilisasi-msola": {
    "title": "Dr. Vangilisasi Msola | Ophthalmologist, Epidemiologist & Data Scientist",
    "description": "Dr. Vangilisasi Msola — Ophthalmologist, Epidemiologist, and Data Scientist at International Eye Hospital, Dar es Salaam. Expertise in clinical eye care, research, teaching, and public health."
  },
  "doctors/zayd-sangey": {
    "title": "Dr. Zayd Mohamed Sangey | Ophthalmologist",
    "description": "Dr. Zayd Mohamed Sangey — Ophthalmologist at International Eye Hospital, Dar es Salaam. Trained at Muhimbili, he provides preventive, corrective, medical, and surgical eye care, with special interests in cornea, refractive and external eye diseases, cataract, glaucoma, medical retina, uveitis, and pediatric ophthalmology."
  },
  "services/a-scan": {
    "title": "A-Scan Ultrasound Biometry | International Eye Hospital",
    "description": "Precision eye length measurement for intraocular lens power calculation before cataract surgery."
  },
  "services/argon-laser": {
    "title": "Argon Laser Trabeculoplasty (ALT) | International Eye Hospital",
    "description": "Laser treatment to lower eye pressure in open-angle glaucoma. Outpatient procedure at International Eye Hospital."
  },
  "services/automated-refractor": {
    "title": "Automated Refractor | International Eye Hospital",
    "description": "Objective, computerized measurement of your eye's focusing power for precise eyeglass and contact lens prescriptions."
  },
  "services/cataract": {
    "title": "Cataract Surgery | International Eye Hospital",
    "description": "Advanced cataract surgery using phacoemulsification technique. Restore clarity to your vision at International Eye Hospital."
  },
  "services/cornea": {
    "title": "Cornea Transplant | International Eye Hospital",
    "description": "Cornea transplant surgery to replace damaged cornea with healthy donor tissue. Performed under general or local anesthetic."
  },
  "services/corneal-topography": {
    "title": "Corneal Topography | International Eye Hospital",
    "description": "Precise corneal curvature mapping for keratoconus diagnosis, cataract surgical planning, and contact lens fitting at International Eye Hospital."
  },
  "services/ffa": {
    "title": "Fundus Fluorescein Angiography (FFA) | International Eye Hospital",
    "description": "Detailed retinal blood flow imaging using fluorescein dye. Expert FFA diagnostics for diabetic retinopathy, macular degeneration, and retinal vascular diseases."
  },
  "services/general-exam": {
    "title": "General Eye Examination | International Eye Hospital",
    "description": "Comprehensive eye health assessments using the latest technology. Detect diabetes, brain tumors, hypertension and more through regular eye exams."
  },
  "services/glaucoma": {
    "title": "Glaucoma Treatment | International Eye Hospital",
    "description": "Complete glaucoma testing and treatment including OCT, visual field machines, medicine drops, laser and surgical options."
  },
  "services/keratoconus": {
    "title": "Keratoconus Crosslinking | International Eye Hospital",
    "description": "Specialized keratoconus treatment including glasses, contact lenses, Intacs, cross-linking therapy, and cornea transplant when needed."
  },
  "services/keratometry": {
    "title": "Keratometry | International Eye Hospital",
    "description": "Accurate corneal curvature measurement for astigmatism assessment, contact lens fitting, and cataract surgery planning."
  },
  "services/lens-meter": {
    "title": "Lens Meter | International Eye Hospital",
    "description": "Accurate verification and measurement of eyeglass lenses to ensure your prescription is manufactured correctly."
  },
  "services/multifocal-cataract": {
    "title": "Multifocal Cataract Surgery | International Eye Hospital",
    "description": "Advanced multifocal cataract surgery using premium intraocular lenses. Reduce dependence on glasses after cataract treatment at International Eye Hospital."
  },
  "services/oct": {
    "title": "Optical Coherence Tomography (OCT) | International Eye Hospital",
    "description": "Advanced OCT imaging for detailed retinal and optic nerve assessment. Non-invasive, quick, and safe diagnostic testing at International Eye Hospital."
  },
  "services/optic": {
    "title": "Optic Department | International Eye Hospital",
    "description": "Premium eyewear and precision optical solutions. Frames from Vague, Adidas, Polo and more. Same-day glasses delivery when lenses are in stock."
  },
  "services/pachymetry": {
    "title": "Pachymetry | International Eye Hospital",
    "description": "Corneal thickness measurement for glaucoma risk assessment and refractive surgery candidacy at International Eye Hospital."
  },
  "services/retina": {
    "title": "Retina – Diabetic Retinopathy | International Eye Hospital",
    "description": "Expert retina care including OCT, FFA, visual field, and biometry. Early detection and treatment of diabetic retinopathy and other retina diseases."
  },
  "services/tonometry": {
    "title": "Tonometry | International Eye Hospital",
    "description": "Intraocular pressure measurement for glaucoma detection and monitoring using Goldmann, air puff, and iCare tonometry."
  },
  "services/visual-field": {
    "title": "Visual Field Test | International Eye Hospital",
    "description": "Comprehensive peripheral and central vision mapping for glaucoma monitoring, retinal disease detection, and neurological assessment."
  },
  "services/yag-laser": {
    "title": "YAG Laser | International Eye Hospital",
    "description": "Quick, painless YAG laser capsulotomy to restore clear vision after cataract surgery. Treat posterior capsule opacification safely."
  }
};
