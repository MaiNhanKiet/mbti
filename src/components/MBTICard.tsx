// import type { MBTIType } from "@/data/mbtiTypes";
// // import { cn } from "@/lib/utils"; 

// type Props = {
//   type: MBTIType;
// };

// export default function MBTICard({ type }: Props) {
//   return (
//     <div className="group [perspective:1000px] w-full h-64">
//       <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
//         {/* Front Side */}
//         <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted rounded-xl shadow-md backface-hidden">
//           {/* Placeholder image */}
//           <div className="w-20 h-20 bg-accent rounded-full mb-4"></div>
//           <h3 className="text-lg font-bold">{type.code}</h3>
//           <p className="text-sm text-muted-foreground">{type.name}</p>
//         </div>

//         {/* Back Side */}
//         <div className="absolute inset-0 bg-background rounded-xl shadow-md px-4 py-6 text-center [transform:rotateY(180deg)] backface-hidden flex items-center justify-center">
//           <p className="text-sm text-muted-foreground">{type.description}</p>
//         </div>
//       </div>
//     </div>
//   );
// }
