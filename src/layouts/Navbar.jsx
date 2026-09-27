import {NavLink,Link,useNavigate} from "react-router-dom";
import {useState,useEffect} from "react";
import useAuthContext from "../hooks/useAuthContext";
import useCartContext from "../hooks/useCartContext";
import useFetchCategories from "../hooks/useFetchCategories";

const PetalMark=()=>(
  <svg viewBox="0 0 32 32" className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden="true">
    <g>
      <path d="M16 16C16 16 13 8 16 3C19 8 16 16 16 16Z" fill="currentColor" className="text-secondary"/>
      <path d="M16 16C16 16 24 14 29 17C24 20 16 16 16 16Z" fill="currentColor" className="text-primary"/>
      <path d="M16 16C16 16 19 24 16 29C13 24 16 16 16 16Z" fill="currentColor" className="text-primary/80"/>
      <path d="M16 16C16 16 8 18 3 15C8 12 16 16 16 16Z" fill="currentColor" className="text-secondary/80"/>
      <circle cx="16" cy="16" r="3" fill="currentColor" className="text-primary"/>
    </g>
  </svg>
);

const DashboardIcon=()=>(
  <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13h8V3H3v10Zm0 8h8v-6H3v6Zm10 0h8V11h-8v10Zm0-18v6h8V3h-8Z"/></svg>
);
const ShopIcon=()=>(
  <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.6-8M7 13l-2.3 2.3c-.63.63-.18 1.7.7 1.7H17m0 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8 2a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"/></svg>
);
const AboutIcon=()=>(
  <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 11v5m0-8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>
);

const Navbar=()=>{
  const {user,logoutUser}=useAuthContext();
  const {cart}=useCartContext();
  const {categories,loading}=useFetchCategories();
  const [mobileMenuOpen,setMobileMenuOpen]=useState(false);
  const [scrolled,setScrolled]=useState(false);
  const navigate=useNavigate();

  useEffect(()=>{
    const onScroll=()=>setScrolled(window.scrollY>8);
    onScroll();
    window.addEventListener("scroll",onScroll,{passive:true});
    return()=>window.removeEventListener("scroll",onScroll);
  },[]);

  const closeMenu=()=>setMobileMenuOpen(false);
  const handleLogout=async()=>{
    await logoutUser();
    closeMenu();
    navigate("/");
  };

  const MenuLink=({to,children,onClick})=>(
    <NavLink to={to} onClick={onClick} className={({isActive})=>`group relative py-2 text-[15px] font-medium tracking-tight transition-colors duration-200 focus:outline-none focus-visible:rounded-lg focus-visible:ring-2 focus-visible:ring-primary/40 ${isActive?"text-primary":"text-gray-600 hover:text-primary"}`}>
      {({isActive})=>(<>
        {children}
        <span className={`absolute -bottom-1 left-0 h-[2px] rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-300 ${isActive?"right-0":"right-full group-hover:right-0"}`}/>
      </>)}
    </NavLink>
  );

  return(
    <header className={`sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur-md transition-shadow duration-300 ${scrolled?"border-gray-200 shadow-[0_1px_20px_-4px_rgba(0,0,0,0.08)]":"border-gray-100 shadow-none"}`}>
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2.5">
          <button onClick={()=>setMobileMenuOpen(!mobileMenuOpen)} className="rounded-xl p-2.5 text-gray-600 transition hover:bg-gray-100 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 lg:hidden" aria-label="Toggle Menu" aria-expanded={mobileMenuOpen}>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {mobileMenuOpen?<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>:<path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>}
            </svg>
          </button>
          <Link to="/" onClick={closeMenu} className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-lg">
            <PetalMark/>
            <span className="font-serif text-2xl italic tracking-tight text-gray-900 sm:text-[28px]">
              Phul<span className="text-primary not-italic font-sans font-extrabold">Bazar</span>
            </span>
          </Link>
        </div>

        <nav className="hidden items-center gap-8 lg:flex">
          {user?<>
            <MenuLink to="/dashboard">Dashboard</MenuLink>
            <div className="group relative">
              <button className="flex items-center gap-1.5 py-2 text-[15px] font-medium tracking-tight text-gray-600 transition hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-lg">
                Category
                <svg className="h-3.5 w-3.5 transition duration-200 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6"/></svg>
              </button>
              <div className="invisible absolute left-1/2 top-full w-60 -translate-x-1/2 translate-y-1 scale-95 rounded-2xl border border-gray-100 bg-white p-2 opacity-0 shadow-xl transition-all duration-200 ease-out group-hover:visible group-hover:translate-y-2 group-hover:scale-100 group-hover:opacity-100">
                <div className="h-1 w-10 rounded-full bg-gradient-to-r from-primary to-secondary mx-3 mb-2 mt-1"/>
                <div className="mb-1 px-3 text-[11px] font-semibold tracking-wide text-gray-400">Shop by category</div>
                {loading?<div className="px-3 py-3 text-sm text-gray-500">Loading...</div>:categories?.map(category=>(
                  <Link key={category.id} to={`/shop_cate_pagi/${category.id}`} className="block rounded-xl px-3 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-primary/5 hover:text-primary">{category.name}</Link>
                ))}
              </div>
            </div>
            <MenuLink to="/shop">Shop</MenuLink>
            <MenuLink to="/about">About Us</MenuLink>
          </>:<>
            <MenuLink to="/">Home</MenuLink>
            <MenuLink to="/about">About Us</MenuLink>
            <MenuLink to="/shop">Shop</MenuLink>
          </>}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-3">
          {user?<>
            <div className="dropdown dropdown-end relative">
              <button tabIndex={0} className="relative rounded-xl p-2.5 text-gray-600 transition hover:bg-gray-100 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40" aria-label="Cart">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.6-8M7 13l-2.3 2.3c-.63.63-.18 1.7.7 1.7H17m0 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8 2a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"/>
                </svg>
                {cart?.items?.length>0&&<span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-secondary px-1 text-[10px] font-bold text-white ring-2 ring-white">{cart.items.length}</span>}
              </button>
              <div tabIndex={0} className="dropdown-content mt-3 w-72 rounded-2xl border border-gray-100 bg-white p-4 shadow-2xl">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <div><p className="font-semibold text-gray-800">Shopping Cart</p><p className="text-xs text-gray-400">{cart?.items?.length||0} items</p></div>
                  <span className="text-sm font-bold text-primary">${cart?.total_price||0}</span>
                </div>
                <Link to="/dashboard/cart" className="mt-4 flex w-full items-center justify-center rounded-xl bg-primary py-2.5 font-semibold text-white transition hover:opacity-90">View Cart</Link>
              </div>
            </div>

            <div className="dropdown dropdown-end relative">
              <button tabIndex={0} className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-sm font-bold text-white shadow-sm transition hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2" aria-label="Profile">
                {(user?.name||user?.email||"U").charAt(0).toUpperCase()}
              </button>
              <ul tabIndex={0} className="dropdown-content menu mt-3 w-56 rounded-2xl border border-gray-100 bg-white p-2 shadow-2xl">
                <li className="mb-1 border-b border-gray-100 px-3 py-2"><span className="block cursor-default text-[11px] font-semibold tracking-wide text-gray-400">Account</span></li>
                <li><Link to="/dashboard/profile" className="rounded-xl py-2.5">Profile</Link></li>
                <li><Link to="/dashboard" className="rounded-xl py-2.5">Dashboard</Link></li>
                <li><button onClick={handleLogout} className="rounded-xl py-2.5 text-red-500 hover:bg-red-50 hover:text-red-600">Logout</button></li>
              </ul>
            </div>
          </>:<>
            <div className="hidden items-center gap-2 sm:flex">
              <Link to="/login" className="rounded-xl px-4 py-2 font-semibold text-gray-600 transition hover:bg-gray-100 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40">Login</Link>
              <Link to="/register" className="rounded-xl bg-primary px-5 py-2.5 font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2">Register</Link>
            </div>
          </>}
        </div>
      </div>

      <div className={`grid border-t border-gray-100 bg-white transition-[grid-template-rows] duration-300 ease-out lg:hidden ${mobileMenuOpen?"grid-rows-[1fr]":"grid-rows-[0fr] border-t-0"}`}>
        <div className="overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
            <nav className="flex flex-col gap-1">
              {user?<>
                <NavLink to="/dashboard" onClick={closeMenu} className={({isActive})=>`flex items-center gap-3 rounded-xl px-2 py-3 font-medium transition ${isActive?"bg-primary/5 text-primary":"text-gray-600 hover:bg-gray-50 hover:text-primary"}`}><DashboardIcon/>Dashboard</NavLink>
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between rounded-xl px-2 py-3 font-medium text-gray-600 hover:bg-gray-50 hover:text-primary"><span className="flex items-center gap-3"><ShopIcon/>Category</span><svg className="h-4 w-4 transition group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6"/></svg></summary>
                  <div className="ml-3 mt-1 border-l-2 border-primary/10 pl-3">
                    {loading?<p className="px-3 py-2 text-sm text-gray-400">Loading...</p>:categories?.map(cat=><Link key={cat.id} onClick={closeMenu} to={`/shop_cate_pagi/${cat.id}`} className="block rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-primary/5 hover:text-primary">{cat.name}</Link>)}
                  </div>
                </details>
                <NavLink to="/shop" onClick={closeMenu} className={({isActive})=>`flex items-center gap-3 rounded-xl px-2 py-3 font-medium transition ${isActive?"bg-primary/5 text-primary":"text-gray-600 hover:bg-gray-50 hover:text-primary"}`}><ShopIcon/>Shop</NavLink>
                <NavLink to="/about" onClick={closeMenu} className={({isActive})=>`flex items-center gap-3 rounded-xl px-2 py-3 font-medium transition ${isActive?"bg-primary/5 text-primary":"text-gray-600 hover:bg-gray-50 hover:text-primary"}`}><AboutIcon/>About Us</NavLink>
                <button onClick={handleLogout} className="mt-2 w-full rounded-xl bg-red-50 px-4 py-3 text-left font-semibold text-red-500 transition hover:bg-red-100">Logout</button>
              </>:<>
                <NavLink to="/" onClick={closeMenu} className={({isActive})=>`rounded-xl px-2 py-3 font-medium transition ${isActive?"bg-primary/5 text-primary":"text-gray-600 hover:bg-gray-50 hover:text-primary"}`}>Home</NavLink>
                <NavLink to="/about" onClick={closeMenu} className={({isActive})=>`rounded-xl px-2 py-3 font-medium transition ${isActive?"bg-primary/5 text-primary":"text-gray-600 hover:bg-gray-50 hover:text-primary"}`}>About Us</NavLink>
                <NavLink to="/shop" onClick={closeMenu} className={({isActive})=>`rounded-xl px-2 py-3 font-medium transition ${isActive?"bg-primary/5 text-primary":"text-gray-600 hover:bg-gray-50 hover:text-primary"}`}>Shop</NavLink>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <Link onClick={closeMenu} to="/login" className="rounded-xl border border-gray-200 py-3 text-center font-semibold text-gray-700 transition hover:border-primary hover:text-primary">Login</Link>
                  <Link onClick={closeMenu} to="/register" className="rounded-xl bg-primary py-3 text-center font-semibold text-white transition hover:shadow-md">Register</Link>
                </div>
              </>}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
