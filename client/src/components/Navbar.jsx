import Logo from "../../images/logo.png";
import { useState } from "react";

// const NavbarItem = ({ title, classProps }) => {
//   return (
//     <li className={`mx-4 cursor-pointer ${classProps}`}>
//       {title}
//     </li>
//   )
// }

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full h-fit flex md:justify-center justify-between items-center p-4 white-glassmorphism-alt">
    {/* <nav className="w-full flex md:justify-center justify-between items-center p-4 white-glassmorphism-alt"> */}
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <img
          src={Logo}
          className="w-32 cursor-pointer"
          alt="logo"
        />
      </div>
      {/*<ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {["Market", "Exchange", "Tutorials", "Wallets"].map((item, index) => (
          <NavbarItem title={item} key={item + index} />
        ))}
        <li className="bg-[#2952E3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546BD]">
          Login
        </li>
      </ul>
      <div className="flex relative">
        {toggleMenu
          ? <AiOutlineClose size={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)} />
          : <HiMenuAlt4 size={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)} />
        }
        {toggleMenu && (
          <ul
            className="z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
          >
            <li className="text-xl w-full my-2">
              <AiOutlineClose className="cursor-pointer" onClick={() => setToggleMenu(false)} />
            </li>
            {["Market", "Exchange", "Tutorials", "Wallets"].map((item, index) => (
              <NavbarItem title={item} key={item + index} classProps="my-2 text-lg" />
            ))}
          </ul>
        )}
      </div>*/}
    </nav>
  )
}

export default Navbar