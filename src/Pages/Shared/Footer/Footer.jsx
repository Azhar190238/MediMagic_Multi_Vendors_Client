
import { Link } from "react-router-dom";


const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="mt-10 ">
      <footer className="footer py-10 lg:py-16 px-10 lg:px-24 bg-neutral text-neutral-content rounded-xl">
        <nav className="space-y-2 mx-auto lg:mx-0">
          <Link to='/' className="flex items-center">
            <div className="flex items-center space-x-1 md:space-x-2">
              <img className="w-10 rounded-2xl" src="https://i.ibb.co/YdL3J1T/R.jpg" alt="" />
              <a className="text-md  md:text-3xl">Medi<span className="text-red-500">M</span>agic</a>
            </div>
          </Link>
          <aside className="footer-center py-4 text-[#FFFFFF99] ">
            <p>Copyright © {currentYear} - All right reserved by Md Azharuddin</p>
          </aside>
          <div className="flex gap-2 mx-auto lg:mx-0">
            <img src={'https://i.ibb.co/X2WnJ3F/Frame.png'} alt="" />
            <a className="link link-hover text-[#FFFFFF99]">azhar73397@gmail.com</a>
          </div>
          <div className="flex gap-2 mx-auto lg:mx-0">
            <img src={'https://i.ibb.co/SsYgTTw/Frame-1.png'} alt="" />
            <a className="link link-hover text-[#FFFFFF99]">(+62)123-321-543</a>
          </div>
        </nav>
        <div className="footer flex flex-row gap-10 lg:gap-40">
          <nav className="space-y-1 mx-auto lg:mx-0">
            <header className="text-2xl font-extrabold mx-auto lg:mx-0">Company</header>
            <a className="link link-hover text-[#FFFFFF99] mx-auto lg:mx-0">About us</a>
            <a className="link link-hover text-[#FFFFFF99] mx-auto lg:mx-0">Leadership</a>
            <a className="link link-hover text-[#FFFFFF99] mx-auto lg:mx-0">Careers</a>
            <a className="link link-hover text-[#FFFFFF99] mx-auto lg:mx-0">News & Article</a>
            <a className="link link-hover text-[#FFFFFF99] mx-auto lg:mx-0">Legal Rules</a>
          </nav>
          <nav className="space-y-1 mx-auto">
            <header className="text-2xl font-extrabold mx-auto lg:mx-0">Support</header>
            <a className="link link-hover text-[#FFFFFF99] mx-auto lg:mx-0">Help Center</a>
            <a className="link link-hover text-[#FFFFFF99] mx-auto lg:mx-0">FAQ</a>
            <a className="link link-hover text-[#FFFFFF99] mx-auto lg:mx-0">Tourist Spot Support</a>
            <a className="link link-hover text-[#FFFFFF99] mx-auto lg:mx-0">Contact us</a>
          </nav>
        </div>
        <nav className="space-y-1 mx-auto">
          <header className="text-2xl font-extrabold mx-auto lg:mx-0">Services</header>
          <a className="link link-hover text-[#FFFFFF99] mx-auto lg:mx-0">Tourist Guid</a>
          <a className="link link-hover text-[#FFFFFF99] mx-auto lg:mx-0">Group Guid</a>
          <a className="link link-hover text-[#FFFFFF99] mx-auto lg:mx-0">Private Guid</a>
          <a className="link link-hover text-[#FFFFFF99] mx-auto lg:mx-0">Guid for kids</a>
          <a className="link link-hover text-[#FFFFFF99] mx-auto lg:mx-0">Guid for Adult</a>
        </nav>
      </footer>
    </div>
  );

};

export default Footer;