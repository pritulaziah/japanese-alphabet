import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDice, faLanguage } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import Link from "next/link";
import clsx from "clsx";

const menu = [
  {
    href: "/learn",
    icon: <FontAwesomeIcon icon={faLanguage} />,
  },
  {
    href: "learn/game",
    icon: <FontAwesomeIcon icon={faDice} />,
  },
];

const Navigation = () => {
  const router = useRouter();

  return (
    <div className="basis-16">
      <nav className="py-4 h-full bg-gray-800 shadow-navigation">
        <ul className="list-none flex flex-col">
          {menu.map((menuItem) => (
            <li key={menuItem.href} className="mb-10 last-of-type:mb-0">
              <Link href={menuItem.href}>
                <a
                  className={clsx(
                    "text-xl flex px-4 py-2.5 items-center justify-center border-l-4 border-transparent transition-all",
                    router.pathname === menuItem.href
                      ? "border-blue-400 text-blue-400"
                      : "text-gray-100 hover:border-gray-100/50"
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
