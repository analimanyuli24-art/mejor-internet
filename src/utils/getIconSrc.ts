// BUSCA IMÁGENES en src/assets/icons/ (planes y ventajas)
// y en src/assets/logos/ (logos de canales)

const icons = import.meta.glob('../assets/icons/*.{png,svg,jpg,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

const logos = import.meta.glob('../assets/logos/*.{png,svg,jpg,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

function findSrc(files: Record<string, string>, name: string): string | undefined {
  const entry = Object.entries(files).find(([path]) => {
    const file = path.split('/').pop() ?? '';
    return file.replace(/\.(png|svg|jpg|webp)$/, '') === name;
  });
  return entry?.[1];
}

export function getIconSrc(name: string) {
  return findSrc(icons, name);
}

export function getLogoSrc(name: string) {
  return findSrc(logos, name);
}