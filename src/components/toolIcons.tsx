// Icons for the Toolkit tiles. Brand logos come from simple-icons (CC0); tools without a logo
// get a simple line glyph. `hex` is the colour the icon turns on hover.
import {
  siArduino,
  siAutocad,
  siClaude,
  siCplusplus,
  siCursor,
  siDassaultsystemes,
  siGithub,
  siGoogle,
  siHtml5,
  siJavascript,
  siPython,
} from "simple-icons";

type Icon = { path: string; hex: string; stroke?: boolean };

const brand = (i: { path: string; hex: string }): Icon => ({ path: i.path, hex: `#${i.hex}` });

// 24×24 line glyphs, drawn for this site.
const glyph = (path: string, hex: string): Icon => ({ path, hex, stroke: true });

const ICONS: Record<string, Icon> = {
  SolidWorks: { ...brand(siDassaultsystemes), hex: "#DA291C" },
  AutoCAD: brand(siAutocad),
  Python: brand(siPython),
  "C/C++": brand(siCplusplus),
  "Arduino (Embedded C)": brand(siArduino),
  "Arduino Uno R4 WiFi": brand(siArduino),
  JavaScript: brand(siJavascript),
  "HTML/CSS": brand(siHtml5),
  "Git/GitHub": brand(siGithub),
  "Claude Code": brand(siClaude),
  Cursor: { ...brand(siCursor), hex: "#2457ff" },
  Antigravity: brand(siGoogle),

  "ANSYS FEA": glyph("M3 20 12 4l9 16zM7.5 12h9M5.25 16h13.5M12 4v16M7.5 12 12 20l4.5-8M5.25 16 7.5 12M18.75 16 16.5 12", "#FFB71B"),
  MATLAB: glyph("M2 18c3 0 4-9 7-9s3 6 6 6 3-11 7-11", "#E16737"),
  "NI DAQ": glyph("M4 7h16v10H4zM2 10h2M2 14h2M20 10h2M20 14h2M7 13l2-3 2 4 2-5 2 4h2", "#03B585"),
  "6-axis force/torque": glyph("M12 12V3M12 12l8 5M12 12l-8 5M9 5l3-2 3 2M18 15l2 2-1 3M6 15l-2 2 1 3", "#2457ff"),
  PIV: glyph("M4 6h4M4 12h6M4 18h4M12 6h5M13 12h7M12 18h5M7 4l1 2-1 2M9 10l1 2-1 2M17 4l1 2-1 2M19 10l1 2-1 2", "#2457ff"),
  "GD&T": glyph("M3 7h18v10H3zM9 7v10M15 7v10M6 10a2 2 0 1 0 0 4 2 2 0 1 0 0-4M4.5 15.5l3-7", "#2457ff"),
  "Tolerance stack-up": glyph("M4 5h10v4H4zM7 11h10v4H7zM5 17h12v4H5zM20 5v16M18.5 6.5 20 5l1.5 1.5M18.5 19.5 20 21l1.5-1.5", "#ff3d2e"),
  Servos: glyph("M12 8a4 4 0 1 0 0 8 4 4 0 1 0 0-8M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2", "#ff3d2e"),
  "3D printing (FDM)": glyph("M8 3h8v6l-2 3h-4l-2-3zM12 12v3M4 21h16M6 18h12", "#ff3d2e"),
  "Load testing": glyph("M12 2v9M8 7l4 4 4-4M3 14h18v3H3zM6 17v4M18 17v4", "#ff3d2e"),
  Codex: glyph("M3 5h18v14H3zM7 10l3 2-3 2M12 15h5", "#101010"),
};

export function ToolIcon({ name }: { name: string }) {
  const icon = ICONS[name];
  if (!icon) return <span className="block h-7 w-7" aria-hidden />;
  return (
    <svg
      viewBox="0 0 24 24"
      width="28"
      height="28"
      aria-hidden
      className="tool-icon"
      fill={icon.stroke ? "none" : "currentColor"}
      stroke={icon.stroke ? "currentColor" : "none"}
      strokeWidth={icon.stroke ? 1.6 : undefined}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={icon.path} />
    </svg>
  );
}

export const toolColor = (name: string) => ICONS[name]?.hex ?? "#2457ff";
