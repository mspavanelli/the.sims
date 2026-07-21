import "./Avatar.css";

type AvatarProps = {
  name: string;
  image?: string;
  emoji?: string;
  size?: number;
};

// Gera um gradiente estável a partir do nome.
function gradientFor(name: string): string {
  const palettes = [
    ["#38d39f", "#2f8bff"],
    ["#7b6cff", "#38d39f"],
    ["#ff7a8a", "#ffbf5c"],
    ["#4aa6ff", "#7b6cff"],
    ["#17c08a", "#8fd0ff"],
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  const [a, b] = palettes[hash % palettes.length];
  return `linear-gradient(135deg, ${a}, ${b})`;
}

export default function Avatar({ name, image, emoji, size = 64 }: AvatarProps) {
  const style = {
    width: size,
    height: size,
    fontSize: size * 0.42,
    background: image ? undefined : gradientFor(name),
  } as React.CSSProperties;

  return (
    <div className="avatar" style={style} aria-hidden>
      {image ? (
        <img src={image} alt="" />
      ) : emoji ? (
        <span>{emoji}</span>
      ) : (
        <span className="avatar-initial">{name.charAt(0).toUpperCase()}</span>
      )}
    </div>
  );
}
