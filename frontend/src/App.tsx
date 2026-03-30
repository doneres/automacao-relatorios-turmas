import { Outlet } from "react-router";
import { useTheme } from "./contexts/ThemeContext";
import MenuSide from "./components/MenuSide";

export default function App() {
  const { colors, mode } = useTheme();

  return (
    <div
      className="d-flex vh-100"
      style={{
        background: colors.bg.primary,
        color: colors.text.primary,
      }}
    >
      <MenuSide />
      <div
        className="flex-grow-1 overflow-auto"
        style={{
          background:
            mode === "light"
              ? `linear-gradient(135deg, ${colors.bg.secondary} 0%, ${colors.bg.tertiary} 100%)`
              : `linear-gradient(135deg, ${colors.bg.primary} 0%, ${colors.bg.secondary} 100%)`,
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}
