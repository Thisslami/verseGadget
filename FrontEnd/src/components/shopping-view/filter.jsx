// import { Fragment } from "react";
// import { Label } from "../ui/label";
// import { Checkbox } from "../ui/checkbox";
// import { Separator } from "../ui/separator";

// function ProductFilter({ filters, handleFilter, filterOptions }) {
//   return (
//     <div className="bg-background rounded-lg shadow-sm">
//       <div className="p-4 border-b">
//         <h2 className="text-lg font-extrabold">Filters</h2>
//       </div>

//       <div className="p-4 space-y-4">
//         {Object.keys(filterOptions).map((keyItem) => (
//           <Fragment key={keyItem}>
//             <div>
//               <h3 className="text-base font-bold ">{keyItem}</h3>
//               <div className="grid gap-2 mt-2">
//                 {filterOptions[keyItem].map((option) => (
//                   <Label className="flex items-center gap-2 font-medium">
//                     {/* <Checkbox
//                     checked={
//                       filters &&
//                        Object.keys(filters).length > 0 && 
//                       filters[keyItem] && 
//                       filters[keyItem].indexOf(option.id) > -1
//                     }
//                     onCheckedChange={() => handleFilter(keyItem, option.id)} /> */}
//                     <Checkbox
//                       checked={
//                         filters &&
//                         filters[keyItem] &&
//                         filters[keyItem].includes(option.id)
//                       }
//                       onCheckedChange={
//                         (checked) => handleFilter(keyItem, option.id, checked) // Pass the checked value here
//                       }
//                     />

//                     {option.label}
//                   </Label>
//                 ))}
//               </div>
//             </div>
//             <Separator />
//           </Fragment>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ProductFilter;

import { Fragment } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

function ProductFilter({ filters, handleFilter, filterOptions }) {
  return (
    <div className="bg-background rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-lg font-extrabold">Filters</h2>
      </div>

      <div className="p-4 space-y-4">
        {Object.keys(filterOptions).map((keyItem) => (
          <Fragment key={keyItem}>
            <div>
              <h3 className="text-base font-semibold capitalize">{keyItem}</h3>
              <div className="mt-2 space-y-2">
                {filterOptions[keyItem].map((optionItem) => (
                  <div key={optionItem.id} className="flex items-center gap-2">
                    <Checkbox
                      id={optionItem.id}
                      checked={filters[keyItem]?.includes(optionItem.id)}
                      onCheckedChange={(checked) =>
                        handleFilter(keyItem, optionItem.id, checked)
                      }
                    />
                    <Label htmlFor={optionItem.id}>{optionItem.label}</Label>
                  </div>
                ))}
              </div>
            </div>
            <Separator />
          </Fragment>
        ))}
      </div>
    </div>
  );
}


export default ProductFilter;
