import { motion } from "framer-motion";

export const Skeleton = ({ className = "", variant = "rectangular" }) => {
  const baseClasses = "bg-gray-200 dark:bg-gray-700";

  const variantClasses = {
    text: "h-4 rounded",
    circular: "rounded-full",
    rectangular: "rounded-lg",
  };

  return (
    <motion.div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      animate={{ opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 1.2, repeat: Infinity }}
    />
  );
};

export const CardSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
    <Skeleton className="h-6 w-32 mb-4" />
    <Skeleton className="h-10 w-20 mb-2" />
    <Skeleton className="h-4 w-24" />
  </div>
);

export const TableRowSkeleton = () => (
  <tr>
    <td className="px-6 py-4">
      <Skeleton className="h-4 w-32" />
    </td>
    <td className="px-6 py-4">
      <Skeleton className="h-4 w-20" />
    </td>
    <td className="px-6 py-4">
      <Skeleton className="h-4 w-16" />
    </td>
    <td className="px-6 py-4">
      <Skeleton className="h-4 w-16" />
    </td>
    <td className="px-6 py-4">
      <Skeleton className="h-4 w-12" />
    </td>
  </tr>
);

export const ChartSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
    <Skeleton className="h-6 w-40 mb-6" />
    <Skeleton className="h-64 w-full" />
  </div>
);
