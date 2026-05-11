export interface Doctor {
  slug: string;
  name: string;
  title: string;
  image: string;
  birthPlace: string;
  training: string;
  specialization: string;
  profession: string;
  languages: string;
  associations: string[];
  additionalInfo: string;
  sortOrder: number;
}

export const doctors: Doctor[] = [
  {
    slug: "muammer-coskun",
    name: "Dr. Muammer Coskun",
    title: "Consultant Ophthalmologist / Eye Surgeon",
    image: "/doctors/muammer-coskun.jpeg",
    birthPlace: "Kayseri, Turkey",
    training:
      "Ege University Faculty of Medicine (1985); Ophthalmology Residency at Istanbul Kartal Training and Research Hospital (1996–2000)",
    specialization: "Ophthalmology",
    profession:
      "Cataract Surgery, Glaucoma Surgery, Laser Eye Procedures, Medical Retina, Pterygium Surgery",
    languages: "English",
    associations: ["Turkish Ophthalmology Society"],
    additionalInfo:
      "Over two decades of clinical and surgical experience across leading hospitals in Turkey and Nigeria. Performed approximately 4,500 cataract surgeries, glaucoma surgeries, laser procedures, and retina-related treatments.",
    sortOrder: 1,
  },
  {
    slug: "vangilisasi-msola",
    name: "Dr. Vangilisasi Msola",
    title: "Ophthalmologist, Epidemiologist & Data Scientist",
    image: "/doctors/vangilisasi-msola.jpeg",
    birthPlace: "Tanzania",
    training:
      "Muhimbili University of Health and Allied Sciences (MD); Kilimanjaro Christian Medical University College (MMed Ophthalmology); University of the Witwatersrand (MSc Epidemiology / Implementation Science); Mzumbe University (MBA Corporate Management)",
    specialization: "Ophthalmology, Epidemiology, Implementation Science",
    profession:
      "General Ophthalmology, Public Health Eye Care, Clinical Research, Health Data, Medical Teaching",
    languages: "English, Swahili",
    associations: [
      "Tanzania Ophthalmologist Society",
      "Public Health Association of South Africa (Associate Member)",
    ],
    additionalInfo:
      "Serving at International Eye Hospital since June 2022. Strong background in clinical eye care, research, teaching, and public health. WHO/TDR MSc Epidemiology / Implementation Science fellow at Wits University.",
    sortOrder: 2,
  },
  {
    slug: "harley-mkini",
    name: "Dr. Harley H. Mkini",
    title: "Optometrist",
    image: "/doctors/harley-mkini.jpeg",
    birthPlace: "Tanzania",
    training:
      "Kilimanjaro Christian Medical University College (BSc Optometry, 2015–2019)",
    specialization: "Optometry, Primary Eye Care",
    profession:
      "Refraction, Contact Lenses, Low Vision, Pediatric Optometry, Diabetic Eye Clinic, Glaucoma Clinic",
    languages: "English, Swahili",
    associations: ["IACLE", "Myopia Society"],
    additionalInfo:
      "Serving at International Eye Hospital since August 2021. Experience in refraction, ophthalmic dispensing, low vision rehabilitation, binocular vision assessment, and ocular disease management.",
    sortOrder: 3,
  },
  {
    slug: "zayd-sangey",
    name: "Dr. Zayd Mohamed Sangey",
    title: "Ophthalmologist",
    image: "/doctors/zayd-sangey.jpeg",
    birthPlace: "Dar es Salaam, Tanzania",
    training:
      "Muhimbili University of Health and Allied Sciences (MD, 2012–2017); Master of Medicine in Ophthalmology at Muhimbili University of Health and Allied Sciences (2019–2022)",
    specialization: "Ophthalmology",
    profession:
      "Cornea, Refractive & External Eye Diseases, Cataract, Glaucoma, Medical Retina, Uveitis, Pediatric Ophthalmology",
    languages: "English, Swahili",
    associations: ["Tanzania Ophthalmology Society"],
    additionalInfo:
      "Serving at International Eye Hospital since January 2023. Completed ophthalmology residency at Muhimbili National Hospital (2019–2022). Former Medical Officer at Regency Medical Centre.",
    sortOrder: 4,
  },
  {
    slug: "michael-machimu",
    name: "Dr. Michael Machimu",
    title: "Optometrist",
    image: "/doctors/michael-machimu.jpeg",
    birthPlace: "Tanzania",
    training:
      "Kilimanjaro Christian Medical University College (BSc Optometry, 2016–2020); Master of Science in Applied Epidemiology and Biostatistics, James Lind Institute, Switzerland (in progress)",
    specialization: "Optometry",
    profession:
      "Vision Testing, Refraction, Corrective Lens Prescription, Corrective Lens Fitting, Eye Condition Assessment, Patient Eye Care",
    languages: "English, Swahili",
    associations: [],
    additionalInfo:
      "Serving at International Eye Hospital since April 2022. Internship at Bugando Medical Centre, Mwanza (2020–2021). Previous clinical experience at Kamanga Medics Hospital and Best Vision Eye Clinic, Mwanza.",
    sortOrder: 5,
  },
];

export function getDoctorBySlug(slug: string): Doctor | undefined {
  return doctors.find((d) => d.slug === slug);
}
