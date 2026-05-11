import { NextResponse } from "next/server";

export async function GET() {
  const llms = `# International Eye Hospital

> International Eye Hospital is Tanzania's premier specialized eye hospital, delivering world-class ophthalmic care since 2014. Located in Dar es Salaam, we offer advanced eye care services including cataract surgery, retina treatment, glaucoma management, and more.

## Overview

International Eye Hospital (IFG Hospitals Group) is a specialized eye care facility in Dar es Salaam, Tanzania. Our hospital combines advanced medical technology with internationally trained specialists to deliver comprehensive eye care services.

## Key Information

- **Name**: International Eye Hospital
- **Location**: Tropical Center, New Bagamoyo Road, P.O. Box 2083, Dar es Salaam, Tanzania
- **Phone**: +255 784 104 300
- **Email**: info@eye.co.tz
- **Website**: https://www.internationaleyehospital.com
- **Instagram**: @internationaleyehospital (https://www.instagram.com/internationaleyehospital/)
- **Working Hours**: Monday – Saturday, 8:30 AM – 5:30 PM (Sunday: Closed)
- **Established**: 2014

## Services

- Cataract Surgery (phacoemulsification)
- Glaucoma Treatment & Surgery
- Retina – Diabetic Retinopathy Care
- Keratoconus Crosslinking
- Cornea Transplant
- Optic Department (Eyewear & Frames)
- General Eye Examination
- Eye Tests & Diagnostics (OCT, FFA, Topography, Tonometry, Visual Field, A-Scan)

## Doctors

### Dr. Muammer Coskun
- Consultant Ophthalmologist / Eye Surgeon
- Specialties: Cataract Surgery, Glaucoma Surgery, Laser Eye Procedures, Medical Retina, Pterygium Surgery
- Training: Ege University Faculty of Medicine; Ophthalmology Residency at Istanbul Kartal Training and Research Hospital
- Experience: Over 20 years
- Member: Turkish Ophthalmology Society

### Dr. Vangilisasi Msola
- Ophthalmologist, Epidemiologist & Data Scientist
- Specialties: General Ophthalmology, Public Health Eye Care, Clinical Research, Health Data, Medical Teaching
- Training: Muhimbili University of Health and Allied Sciences (MD); Kilimanjaro Christian Medical University College (MMed); University of the Witwatersrand (MSc); Mzumbe University (MBA)
- Languages: English, Swahili
- Member: Tanzania Ophthalmologist Society, Public Health Association of South Africa (Associate)

### Dr. Harley H. Mkini
- Optometrist
- Specialties: Refraction, Contact Lenses, Low Vision, Pediatric Optometry, Diabetic Eye Clinic, Glaucoma Clinic
- Training: Kilimanjaro Christian Medical University College (BSc Optometry)
- Languages: English, Swahili
- Member: IACLE, Myopia Society

### Dr. Michael Machimu
- Optometrist
- Specialties: Vision Testing, Corrective Lenses, Eye Condition Assessment, Patient Eye Care, Preventive Vision Care
- Training: Kilimanjaro Christian Medical University College (BSc Optometry, 2016–2020); Master of Science in Applied Epidemiology and Biostatistics, James Lind Institute, Switzerland (in progress)
- Languages: English, Swahili

## Eye Conditions Treated

Strabismus, Cataract, Conjunctivitis, Diabetic Retinopathy, Dry Eye, Glaucoma, Keratoconus, Low Vision, Retina Detachment, Retinal Vein Occlusion, Tear Duct Obstruction, Uveitis.

## Important Notes

- All content is available in both English and Swahili.
- Book appointments online or call +255 784 104 300.
- Emergency contact: +255 784 104 300.
`;

  return new NextResponse(llms, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
