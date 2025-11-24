"use client";

import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";

const testimonials = [
  {
    text: "Joki web mereka sangat membantu! Website company profile saya selesai cepat dengan harga terjangkau. Hasilnya profesional dan sesuai ekspektasi.",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    name: "Sari Dewi",
    role: "Owner UMKM",
  },
  {
    text: "Deadline tugas kuliah ketat, tapi mereka bisa selesaikan tepat waktu. Kualitas kodenya rapi dan dokumentasinya lengkap. Recommended!",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "Budi Santoso",
    role: "Mahasiswa",
  },
  {
    text: "Support mereka responsif banget, selalu siap membantu kapan saja. Proses revisi juga cepat dan tidak ribet. Puas dengan layanannya!",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    name: "Maya Indira",
    role: "Freelancer",
  },
  {
    text: "Harga joki web mereka murah tapi kualitasnya tidak murahan. Website e-commerce saya sudah jalan lancar dan customer puas.",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "Ahmad Rizki",
    role: "Entrepreneur",
  },
  {
    text: "Joki aplikasi mobile mereka sangat profesional. Aplikasi saya selesai sesuai timeline dan fitur-fitur yang diminta semua terpenuhi.",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    name: "Diana Putri",
    role: "Startup Founder",
  },
  {
    text: "Mereka membantu saya menyelesaikan tugas tubes dengan cepat. Kode yang diberikan mudah dipahami dan bisa dikembangkan lebih lanjut.",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    name: "Lina Kartika",
    role: "Mahasiswa",
  },
  {
    text: "Website landing page yang mereka buat sangat menarik dan conversion rate-nya tinggi. Harga terjangkau untuk hasil yang bagus!",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    name: "Fajar Nugroho",
    role: "Digital Marketer",
  },
  {
    text: "Joki web mereka memahami kebutuhan saya dengan baik. Hasil akhirnya melebihi ekspektasi dan sesuai dengan budget yang saya punya.",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    name: "Sinta Wulandari",
    role: "Business Owner",
  },
  {
    text: "Proses pengerjaan transparan, update progress rutin, dan hasilnya memuaskan. Joki web terbaik yang pernah saya gunakan!",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    name: "Rizki Pratama",
    role: "Developer",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-primary mb-2 tracking-widest uppercase">Testimoni</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 text-balance">Apa Kata Klien Kami</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-balance">
            Testimoni dari klien yang telah menggunakan layanan joki web kami
          </p>
        </div>
        <div className="flex justify-center gap-6 mt-10 mask-[linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
