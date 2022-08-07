import { useRouter } from "next/router";
import Link from "next/link";
import clsx from "clsx";

const menuItems = [
  {
    href: "/",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z" />
      </svg>
    ),
  },
  {
    href: "/game",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M15 7.5V2H9v5.5l3 3 3-3zM7.5 9H2v6h5.5l3-3-3-3zM9 16.5V22h6v-5.5l-3-3-3 3zM16.5 9l-3 3 3 3H22V9h-5.5z" />
      </svg>
    ),
  },
];

const Navigation = () => {
  const router = useRouter();

  return (
    <div className="relative basis-16 hidden lg:block">
      <nav className="py-4 bg-gray-50 dark:bg-gray-800 shadow-navigation sticky top-0 min-h-screen">
        <ul className="list-none flex flex-col">
          {menuItems.map((menuItem) => (
            <li key={menuItem.href} className="mb-10 last-of-type:mb-0">
              <Link href={menuItem.href}>
                <a
                  className={clsx(
                    "text-xl flex px-4 py-2.5 items-center justify-center border-l-4 border-transparent transition-all",
                    router.pathname === menuItem.href
                      ? "text-blue-700 border-blue-700 dark:text-blue-600 dark:border-blue-600"
                      : "text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
                  )}
                >
                  {menuItem.icon}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
