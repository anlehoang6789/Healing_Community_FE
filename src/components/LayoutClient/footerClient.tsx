"use client";
import Link from "next/link";
import { Facebook, Instagram, Youtube, Linkedin } from "lucide-react";

const footerSections = [
  {
    title: "Cộng đồng Chữa lành",
    links: [
      { text: "Nguyên tắc Cộng đồng", href: "#" },
      { text: "Điều khoản Sử dụng", href: "#" },
      { text: "Gửi Phản hồi", href: "#" },
      { text: "Hỗ trợ & Giúp đỡ", href: "#" },
      { text: "Liên hệ", href: "#" },
    ],
  },
  {
    title: "Chủ đề Phổ biến",
    links: [
      { text: "Chủ đề Phổ biến", href: "#" },
      { text: "Chữa lành Thể chất", href: "#" },
      { text: "Chữa lành Tâm linh", href: "#" },
      { text: "Cân bằng Cảm xúc", href: "#" },
      { text: "Chánh niệm & Thiền định", href: "#" },
      { text: "Định hướng Toàn diện", href: "#" },
    ],
  },
  {
    title: "Định hướng Toàn diện",
    links: [
      { text: "Danh bạ Nhà trị liệu", href: "#" },
      { text: "Sự kiện Chữa lành Trực tuyến", href: "#" },
      { text: "Hướng dẫn Chia sẻ Câu chuyện", href: "#" },
      { text: "Chương trình Sức khỏe", href: "#" },
      { text: "Blog Câu chuyện Chữa lành", href: "#" },
      { text: "Công cụ Chăm sóc bản thân", href: "#" },
    ],
  },
];

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <div className=" bg-black py-12 px-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {footerSections.map((section, index) => (
          <div key={index} className="flex flex-col items-center">
            <h2 className="text-lg font-semibold mb-4 text-white">
              {section.title}
            </h2>
            <ul className="flex flex-col space-y-2 items-center">
              {section.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <Link
                    href={link.href}
                    className="text-white hover:text-gray-900"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-semibold mb-4 items-center text-white">
            Theo dõi chúng tôi
          </h2>
          <div className="flex flex-col space-y-2">
            {socialLinks.map((social, index) => (
              <div key={index}>
                <Link
                  href={social.href}
                  aria-label={social.label}
                  className="flex space-x-2 "
                >
                  <social.icon className="w-6 h-6 text-white hover:text-gray-900" />
                  <span className="text-white">{social.label}</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
