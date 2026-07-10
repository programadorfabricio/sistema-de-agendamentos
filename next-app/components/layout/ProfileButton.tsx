"use client";

import { useAuth } from "@/contexts/AuthContext";
import { initials } from "@/lib/text";

type ProfileButtonProps = {
  onClick: () => void;
};

export function ProfileButton({ onClick }: ProfileButtonProps) {
  const { user } = useAuth();

  return (
    <button
      type="button"
      className={`icon-btn ${user.loggedIn ? "logged-in" : ""}`}
      aria-label={user.loggedIn ? user.name : "Entrar"}
      onClick={onClick}
    >
      {user.loggedIn ? initials(user.name) : "👤"}
    </button>
  );
}
