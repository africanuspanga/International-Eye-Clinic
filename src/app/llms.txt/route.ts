import { NextResponse } from "next/server";

export async function GET() {
  const llms = `# International Eye Hospital

> International Eye Hospital is Tanzania's premier specialized eye hospital, delivering world-class ophthalmic care since 2014. Located in Dar es Salaam, we offer advanced eye care services including cataract surgery, LASIK, retina treatment, glaucoma management, and more.

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
- LASIK – Refractive Surgery
- Glaucoma Treatment & Surgery
- Retina – Diabetic Retinopathy Care
- Keratoconus Crosslinking
- Cornea Transplant
- Optic Department (Eyewear & Frames)
- General Eye Examination
- Eye Tests & Diagnostics (OCT, FFA, Topography, Tonometry, Visual Field, A-Scan)

## Doctors

### Prof. Dr. A. Bulent Guler
- Professor of Ophthalmology
- Specialties: Retina, Cataract, Glaucoma, Keratoconus
- Training: Istanbul University, Faculty of Medicine
- Experience: Over 25 years
- Member: American Academy of Ophthalmology, Turkish Ophthalmology Society

### Assoc. Prof. Aydin Yildirim
- Associate Professor of Ophthalmology
- Specialties: LASIK surgery, Cataract, Glaucoma, Corneal disorders, Pediatric eye care
- Training: University of Istanbul, Faculty of Medicine
- Experience: Over 25 years
- Member: ASCRS, American Academy of Ophthalmology, ESCRS

### Assoc. Prof. Ugurcan Keskin
- Associate Professor of Ophthalmology
- Specialties: Glaucoma, Cataract, Anterior segment surgeries
- Training: Hacettepe University, Faculty of Medicine
- Languages: Fluent in English
- Member: Turkish Medical Association

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
