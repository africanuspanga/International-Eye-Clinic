export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  content: BlogSection[];
};

export type BlogSection = {
  type: "heading" | "paragraph" | "list" | "tip";
  text?: string;
  items?: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "warning-signs-your-eyes-need-attention",
    title: "5 Warning Signs Your Eyes Need Immediate Attention",
    excerpt:
      "Most eye conditions are silent at first — symptoms only appear when damage has already begun. Knowing what to look for can save your vision. Here are five signs you should never ignore.",
    category: "Eye Health Tips",
    readTime: "3 min read",
    date: "March 28, 2026",
    image: "/images/eye examination 1.jpg",
    content: [
      {
        type: "paragraph",
        text: "Most people only visit an eye specialist when something already feels wrong. But by the time symptoms appear, some conditions may have been progressing silently for months or even years. Recognising early warning signs is one of the most important things you can do to protect your long-term vision.",
      },
      {
        type: "heading",
        text: "1. Sudden Blurring or Loss of Vision",
      },
      {
        type: "paragraph",
        text: "If your vision suddenly becomes blurry — especially in one eye — this is a medical emergency. Sudden vision loss can be caused by a detached retina, a stroke affecting the optic nerve, or a blockage in the blood vessels of the eye. Do not wait to see if it improves on its own.",
      },
      {
        type: "heading",
        text: "2. Flashes of Light or New Floaters",
      },
      {
        type: "paragraph",
        text: "Everyone sees occasional floaters — those small specks or strands that drift across your field of view. However, if you suddenly notice a large number of new floaters, or if they're accompanied by flashes of light, this could indicate a retinal tear or detachment. Seek care within 24 hours.",
      },
      {
        type: "heading",
        text: "3. Eye Pain or Pressure",
      },
      {
        type: "paragraph",
        text: "Persistent eye pain, a feeling of pressure behind the eye, or headaches concentrated around the eye socket can be signs of acute glaucoma — a rapid rise in intraocular pressure that can cause irreversible nerve damage within hours if untreated.",
      },
      {
        type: "heading",
        text: "4. Redness That Doesn't Clear in 48 Hours",
      },
      {
        type: "paragraph",
        text: "While mild redness from tiredness or dust is common, persistent redness — particularly if combined with discharge, light sensitivity, or pain — can signal infection, uveitis (inflammation inside the eye), or even a corneal ulcer.",
      },
      {
        type: "heading",
        text: "5. Difficulty Seeing at Night",
      },
      {
        type: "paragraph",
        text: "Struggling to drive at night or adapt quickly when moving from bright to dim environments can be an early sign of cataracts, vitamin A deficiency, or retinitis pigmentosa — a progressive condition affecting the retinal cells responsible for low-light vision.",
      },
      {
        type: "tip",
        text: "When in doubt, get checked. A comprehensive eye examination at International Eye Hospital takes less than an hour and can detect conditions before they affect your quality of life.",
      },
    ],
  },
  {
    slug: "understanding-glaucoma-the-silent-thief-of-sight",
    title: "Understanding Glaucoma: The Silent Thief of Sight",
    excerpt:
      "Glaucoma affects millions of people worldwide and remains one of the leading causes of irreversible blindness — yet most patients have no idea they have it until significant vision has already been lost.",
    category: "Eye Conditions",
    readTime: "3 min read",
    date: "March 14, 2026",
    image: "/images/optic 4.jpg",
    content: [
      {
        type: "paragraph",
        text: "Glaucoma is a group of eye diseases that damage the optic nerve — the vital connection between your eye and your brain. In the most common form, damage is caused by elevated pressure inside the eye (intraocular pressure, or IOP). Because peripheral vision is affected first, and because the brain compensates by filling in the gaps, most people do not notice anything is wrong until the disease is well advanced.",
      },
      {
        type: "heading",
        text: "Who Is at Risk?",
      },
      {
        type: "paragraph",
        text: "Glaucoma does not discriminate, but certain groups carry a significantly higher risk:",
      },
      {
        type: "list",
        items: [
          "People over the age of 40",
          "Those with a family history of glaucoma",
          "Patients with diabetes or hypertension",
          "People who are very short-sighted (high myopia)",
          "Individuals who have used steroid eye drops or tablets for extended periods",
          "Anyone who has previously experienced an eye injury",
        ],
      },
      {
        type: "heading",
        text: "How Is Glaucoma Detected?",
      },
      {
        type: "paragraph",
        text: "The only reliable way to detect glaucoma early is through a comprehensive eye examination. At International Eye Hospital, our glaucoma screening includes measurement of intraocular pressure (tonometry), inspection of the optic nerve head, corneal thickness measurement (pachymetry), and visual field testing. These tests are painless and take less than 30 minutes.",
      },
      {
        type: "heading",
        text: "Can Glaucoma Be Treated?",
      },
      {
        type: "paragraph",
        text: "Glaucoma cannot be cured and any vision already lost cannot be recovered — but the progression can be halted or significantly slowed. Treatment options include medicated eye drops to lower IOP, laser therapy (selective laser trabeculoplasty), and surgical procedures such as trabeculectomy or minimally invasive glaucoma surgery (MIGS). Early detection makes all the difference.",
      },
      {
        type: "tip",
        text: "If you are over 40 or have any risk factors, we recommend a glaucoma screening at least once every two years — even if your vision feels perfectly normal.",
      },
    ],
  },
  {
    slug: "lasik-is-it-right-for-you",
    title: "LASIK Surgery: Is It the Right Choice for You?",
    excerpt:
      "Millions of people around the world have ditched their glasses and contact lenses through LASIK. But is it right for everyone? Here is what you need to know before making the decision.",
    category: "Treatments & Procedures",
    readTime: "3 min read",
    date: "February 27, 2026",
    image: "/images/lasik 1.jpg",
    content: [
      {
        type: "paragraph",
        text: "LASIK (Laser-Assisted In Situ Keratomileusis) is one of the most performed elective surgical procedures in the world. It uses an excimer laser to precisely reshape the cornea — the clear front surface of the eye — so that light focuses correctly on the retina. The procedure itself typically takes less than 15 minutes per eye, and most patients notice a dramatic improvement in vision within 24 hours.",
      },
      {
        type: "heading",
        text: "What Conditions Does LASIK Treat?",
      },
      {
        type: "list",
        items: [
          "Myopia (short-sightedness) — difficulty seeing distant objects clearly",
          "Hyperopia (long-sightedness) — difficulty focusing on close objects",
          "Astigmatism — blurred or distorted vision caused by an irregular corneal shape",
        ],
      },
      {
        type: "heading",
        text: "Am I a Good Candidate?",
      },
      {
        type: "paragraph",
        text: "LASIK is not suitable for everyone. The ideal candidate is over 21 with a stable prescription, has corneas of sufficient thickness, and has no conditions such as keratoconus, severe dry eye, or autoimmune disease that might compromise healing. A thorough pre-operative assessment — including corneal mapping and topography — is essential before any decision is made.",
      },
      {
        type: "heading",
        text: "What Should I Expect During Recovery?",
      },
      {
        type: "paragraph",
        text: "Recovery from LASIK is generally fast. You will be asked to rest on the day of surgery and attend a follow-up examination the next morning. Most patients can return to work and light activities within one to two days. You will need to avoid rubbing your eyes, swimming, and dusty environments for several weeks, and use medicated drops as prescribed.",
      },
      {
        type: "heading",
        text: "Are the Results Permanent?",
      },
      {
        type: "paragraph",
        text: "For the vast majority of patients, the vision correction achieved by LASIK is permanent. However, the natural ageing of the lens inside the eye (presbyopia) that begins in the mid-40s may still require reading glasses later in life — this is separate from the refractive error that LASIK corrects.",
      },
      {
        type: "tip",
        text: "Our LASIK consultations are thorough and completely honest. If you are not a suitable candidate, we will tell you — and suggest the best alternative for your specific prescription and corneal profile.",
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
