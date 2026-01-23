export interface UserDropdownProps {
  user: { name?: string } | null;
  onLogout: () => void;
}
