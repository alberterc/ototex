import { NavLink } from "react-router";

export function Sidebar({ className }: { className?: string }) {
  className = className?.trim() + " bg-dark";
  return (
    <div className={className.trim()}>
      <div className="bg-azure p-3 lg:block lg:p-5">
        <NavLink to="/">
          <h1>Ototex</h1>
        </NavLink>
        <h2 className="hidden lg:mt-3 lg:block">
          Find a sentence from a video
        </h2>
      </div>
      <div className="hidden lg:block">
        <nav className="flex flex-col">
          <NavLink
            className={({ isActive }) =>
              isActive ? "bg-pickled-bluewood p-5" : "p-5"
            }
            to="/youtube"
          >
            YouTube URL
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "bg-pickled-bluewood p-5" : "p-5"
            }
            to="/video"
          >
            Video File
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "bg-pickled-bluewood p-5" : "p-5"
            }
            to="/audio"
          >
            Audio File
          </NavLink>
        </nav>
      </div>
    </div>
  );
}
