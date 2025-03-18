import React from "react";
import ChangeModeComponents from "@/components/ChangeModeComponents";
import PhotoModeComponents from "@/components/PhotoModeComponents";

export default function Main() {
  return (
    <div>
      {/* Dark Mode Toggle */}
      <ChangeModeComponents />
    </div>
  );
}
