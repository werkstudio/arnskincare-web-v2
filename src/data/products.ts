import type { ImageMetadata } from 'astro';
import facialWash from '../assets/products/facial-wash-editorial.jpg';
import toner from '../assets/products/toner-editorial.jpg';
import serum from '../assets/products/serum-flat-editorial.jpg';
import dayCream from '../assets/products/day-cream-flat.jpg';
import barrier from '../assets/products/barrier-cream-editorial.jpg';

export interface Product {
  slug: string;
  step: string;
  ritual: string;
  name: string;
  tagline: string;
  description: string;
  ingredients: string[];
  benefits: string[];
  bpom: string | null;
  image: ImageMetadata;
  /** flat packshot on white: blend it into tinted panels */
  flat?: boolean;
  ghost: string;
}

export const products: Product[] = [
  {
    slug: 'gentle-facial-wash',
    step: '01',
    ritual: 'Cleanse',
    name: 'Gentle Facial Wash',
    tagline: 'Bersih menyeluruh, tanpa rasa ketarik.',
    description:
      'Pembersih lembut dengan Cica dan Gluconolactone yang mengangkat kotoran dan minyak berlebih sambil menenangkan kemerahan. Cocok untuk kulit berjerawat dan sensitif.',
    ingredients: ['Cica', 'Gluconolactone'],
    benefits: ['Membersihkan hingga pori tanpa membuat kering', 'Menenangkan kemerahan & iritasi', 'Membantu mencegah jerawat baru'],
    bpom: 'NA18241203311',
    image: facialWash,
    ghost: 'GENTLE',
  },
  {
    slug: 'toner-essence',
    step: '02',
    ritual: 'Tone',
    name: 'Toner Essence',
    tagline: 'Toner dan essence dalam satu langkah.',
    description:
      'Formula dual-action bebas alkohol dengan probiotik dan Salix Alba yang melembapkan, menyeimbangkan minyak, dan mengangkat sel kulit mati dengan lembut.',
    ingredients: ['Probiotik', 'Salix Alba'],
    benefits: ['Melembapkan intensif & menyeimbangkan minyak', 'Mengangkat sisa makeup & sel kulit mati', 'Kulit lebih kenyal dan tampak cerah'],
    bpom: 'NA18241203312',
    image: toner,
    ghost: 'ESSENCE',
  },
  {
    slug: 'ultra-glowing-serum',
    step: '03',
    ritual: 'Treat',
    name: 'Ultra Glowing Serum',
    tagline: 'Cerah merata, dari noda hingga bekas jerawat.',
    description:
      'Tranexamic peptide, kojic dipalmitate, dan ferulic acid bekerja bersama menyamarkan flek hitam dan bekas jerawat sekaligus melindungi dari radikal bebas.',
    ingredients: ['Tranexamic Peptide', 'Kojic Dipalmitate', 'Ferulic Acid'],
    benefits: ['Menyamarkan flek hitam & bekas jerawat', 'Membantu kulit lebih kenyal', 'Melindungi dari tanda penuaan dini'],
    // TODO: konfirmasi nomor BPOM serum — sumber mencantumkan nomor yang sama dengan Day Cream (NA18241901116)
    bpom: null,
    image: serum,
    ghost: 'GLOW',
  },
  {
    slug: 'skin-glowing-day-cream',
    step: '04',
    ritual: 'Protect',
    name: 'Skin Glowing Day Cream',
    tagline: 'SPF 50+ PA++++ yang ringan untuk iklim tropis.',
    description:
      'Perlindungan UVA & UVB maksimal dengan niacinamide, edelweiss, dan glycine soja. Ringan, tidak menyumbat pori, dan nyaman sebagai base makeup.',
    ingredients: ['Niacinamide', 'Edelweiss', 'Glycine Soja'],
    benefits: ['Melindungi dari sinar UVA & UVB', 'Mencerahkan & menyamarkan noda', 'Non-komedogenik, nyaman dipakai harian'],
    bpom: 'NA18241901116',
    image: dayCream,
    flat: true,
    ghost: 'SPF 50+',
  },
  {
    slug: 'skin-glowing-barrier-cream',
    step: '05',
    ritual: 'Restore',
    name: 'Skin Glowing Barrier Cream',
    tagline: 'Benteng lembut untuk skin barrier-mu.',
    description:
      'Krim multifungsi dengan ceramide, Cica, dan probiotik yang memperkuat lapisan pelindung kulit, melembapkan, dan menenangkan kulit kering maupun sensitif.',
    ingredients: ['Ceramide', 'Cica', 'Probiotik'],
    benefits: ['Memperkuat skin barrier', 'Melembapkan & membuat kulit kenyal', 'Menenangkan kemerahan & iritasi'],
    bpom: 'NA18240105902',
    image: barrier,
    ghost: 'BARRIER',
  },
];

export const ingredients = [
  { name: 'Cica', role: 'Menenangkan', text: 'Centella asiatica membantu meredakan kemerahan dan iritasi pada kulit sensitif.' },
  { name: 'Probiotik', role: 'Menyeimbangkan', text: 'Mendukung ekosistem kulit agar tetap sehat dan tidak mudah bereaksi.' },
  { name: 'Ceramide', role: 'Memperkuat', text: 'Mengisi ulang lapisan lipid alami yang menjaga skin barrier tetap utuh.' },
  { name: 'Niacinamide', role: 'Mencerahkan', text: 'Membantu meratakan warna kulit dan menyamarkan noda hitam.' },
  { name: 'Tranexamic Peptide', role: 'Meratakan', text: 'Membantu menghambat produksi melanin berlebih penyebab flek.' },
  { name: 'Ferulic Acid', role: 'Melindungi', text: 'Antioksidan yang membantu menangkal kerusakan akibat radikal bebas.' },
  { name: 'Gluconolactone', role: 'Menghaluskan', text: 'PHA lembut yang memperbaiki tekstur tanpa membuat kulit perih.' },
  { name: 'Salix Alba', role: 'Membersihkan', text: 'Ekstrak willow bark yang membantu mengangkat sel kulit mati dan mengontrol minyak.' },
];
