/**
 * Templates re-mount on every navigation, so this gives each page a
 * short, calm entrance. (Disabled for reduced-motion users in CSS.)
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
