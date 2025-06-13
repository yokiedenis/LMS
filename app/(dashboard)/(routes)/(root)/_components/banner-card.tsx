import { LucideIcon } from "lucide-react";

import { IconBadge } from "@/components/icon-badge"

interface BannerCardProps {
  variant?: "default" | "success";
  label: string;
  description: string;
  icon: LucideIcon;
}

export const BannerCard = ({
  variant,
  icon: Icon,
  description,
  label,
}: BannerCardProps) => {
  return (
    <div className="border rounded-md flex items-center gap-x-2 p-3"
    style={{ backgroundColor: '#61005f' }}
    >
      <IconBadge
        variant={variant}
        icon={Icon}
      />
      <div>
        <p className="font-medium" style={{ color: '#fbe800' }}>
          {label}
        </p>
        <p className="text-sm" style={{ color: '#ffff' }}>
            {description}
         </p>
      </div>
    </div>
  )
}