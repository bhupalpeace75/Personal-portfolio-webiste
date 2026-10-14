export const business = {
  name: "BHUPENDRA SHRESTHA",
  brand: "Digital Bhupendra",
  logo: "/brand/bhupendra-logo.png",
  title: "AI Marketing Expert",
  area: "Inside Valley",
  email: "bhupendrastha2024@gmail.com",
  phone: "9842660210",
  bookingUrl: "", // Add your full https booking URL. Empty routes to the inquiry form.
  photo: "", // Add a local path such as /bhupendra.webp after placing it in public/.
  heroPhoto: "/portraits/bhupendra-hero.png",
  aboutPhoto: "/portraits/bhupendra-about.png",
  socials: [] as { label: string; url: string }[],
  personalStory: "[Add your personal story before launch.]",
  experience:
    "[Add your relevant experience and qualifications before launch.]",
  certifications: "[Add verified certifications, or remove this section.]",
};
export const consultationMessage =
  "During your free consultation, I’ll analyze your business and create a customized digital marketing plan that you can start implementing immediately.";
export const bookingHref = business.bookingUrl || "/contact#consultation";
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
