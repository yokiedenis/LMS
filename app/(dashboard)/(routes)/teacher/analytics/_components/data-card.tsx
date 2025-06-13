// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { formatPrice } from "@/lib/format";

// interface DataCardProps {
//     value: number;
//     label: string;
//     shouldFormat?: boolean;
// }

// export const DataCard = ({
//     value,
//     label,
//     shouldFormat = true,
// }: DataCardProps) => {
//     return (
//         <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-white font-semibold text-lg">
//                     {label}
//                 </CardTitle>
//             </CardHeader>
//             <CardContent>
//                 <div className="text-3xl font-bold text-white">
//                     {shouldFormat ? formatPrice(value) : value}
//                 </div>
//             </CardContent>
//         </Card>
//     );
// };











import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Users, Book, ShoppingCart, ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface DataCardProps {
  label: string;
  value: number;
  shouldFormat?: boolean;
  icon?: "dollar" | "users" | "book" | "cart";
  trend?: "up" | "down";
  trendValue?: string;
  description?: string;
  className?: string; // Add className prop
}

const iconMap = {
  dollar: DollarSign,
  users: Users,
  book: Book,
  cart: ShoppingCart,
};

export const DataCard = ({
  label,
  value,
  shouldFormat,
  icon,
  trend,
  trendValue,
  description,
  className,
}: DataCardProps) => {
  const Icon = icon ? iconMap[icon] : null;

  const formattedValue = shouldFormat
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(value)
    : value;

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-blue-600">
          {label}
        </CardTitle>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formattedValue}</div>
        {trend && trendValue && (
          <div className="flex items-center text-xs mt-2">
            {trend === "up" ? (
              <ArrowUp className="h-3 w-3 text-green-500" />
            ) : (
              <ArrowDown className="h-3 w-3 text-red-500" />
            )}
            <span
              className={cn(
                "ml-1",
                trend === "up" ? "text-green-500" : "text-red-500"
              )}
            >
              {trendValue}
            </span>
            {description && (
              <span className="text-muted-foreground ml-1">{description}</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};










































// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { formatPrice, formatDuration } from "@/lib/format1";

// interface DataCardProps {
//     value: number;
//     label: string;
//     shouldFormat?: boolean;
//     isDuration?: boolean;  // Added to indicate if the value should be formatted as duration
// }

// export const DataCard = ({
//     value,
//     label,
//     shouldFormat = true,
//     isDuration = false,  // Default to false
// }: DataCardProps) => {
//     // Format the value based on whether it's a duration or a number to be formatted as currency
//     let formattedValue: string | number = value; // Changed to string | number
//     if (shouldFormat) {
//         formattedValue = isDuration ? formatDuration(value) : formatPrice(value);
//     }

//     return (
//         <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-white font-semibold text-lg">
//                     {label}
//                 </CardTitle>
//             </CardHeader>
//             <CardContent>
//                 <div className="text-3xl font-bold text-white">
//                     {formattedValue}
//                 </div>
//             </CardContent>
//         </Card>
//     );
// };