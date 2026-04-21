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
    slug: "bulent-guler",
    name: "Prof. Dr. A. Bulent Guler",
    title: "Professor of Ophthalmology",
    image: "/doctor headshot place holder.jpg",
    birthPlace: "Turkey",
    training: "Istanbul University, Faculty of Medicine",
    specialization: "University of Istanbul, Ophthalmologist",
    profession: "Retina, Cataract, Glaucoma, Keratoconus",
    languages: "English",
    associations: [
      "American Academy of Ophthalmology",
      "Turkish Ophthalmology Society",
    ],
    additionalInfo: "Over 25 years of experience in the field of eye diseases.",
    sortOrder: 1,
  },
  {
    slug: "aydin-yildirim",
    name: "Assoc. Prof. Aydin Yildirim",
    title: "Associate Professor of Ophthalmology",
    image: "/doctor headshot place holder.jpg",
    birthPlace: "Turkey",
    training: "University of Istanbul, Faculty of Medicine",
    specialization: "Istanbul University, Faculty of Medicine, Ophthalmologist",
    profession: "LASIK surgery, Cataract, Glaucoma, Corneal disorders, Pediatric eye care",
    languages: "English",
    associations: [
      "American Cataract and Refractive Surgery Society (ASCRS)",
      "American Academy of Ophthalmology",
      "European Cataract and Refractive Surgery Society (ESCRS)",
    ],
    additionalInfo: "Over 25 years of experience in LASIK surgery and other eye diseases.",
    sortOrder: 2,
  },
  {
    slug: "ugurcan-keskin",
    name: "Assoc. Prof. Ugurcan Keskin",
    title: "Associate Professor of Ophthalmology",
    image: "/doctor headshot place holder.jpg",
    birthPlace: "Turkey",
    training: "Hacettepe University, Faculty of Medicine, Ankara",
    specialization: "Hacettepe University, Ophthalmology",
    profession: "Glaucoma, Cataract, Anterior segment surgeries",
    languages: "Fluent in English",
    associations: ["Turkish Medical Association"],
    additionalInfo: "",
    sortOrder: 3,
  },
];

export function getDoctorBySlug(slug: string): Doctor | undefined {
  return doctors.find((d) => d.slug === slug);
}
