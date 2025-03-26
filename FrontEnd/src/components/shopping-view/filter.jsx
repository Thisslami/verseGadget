

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
//               <h3 className="text-base font-semibold capitalize">{keyItem}</h3>
//               <div className="mt-2 space-y-2">
//                 {filterOptions[keyItem].map((optionItem) => (
//                   <div key={optionItem.id} className="flex items-center gap-2">
//                     <Checkbox
//                       id={optionItem.id}
//                       checked={filters[keyItem]?.includes(optionItem.id)}
//                       onCheckedChange={(checked) =>
//                         handleFilter(keyItem, optionItem.id, checked)
//                       }
//                     />
//                     <Label htmlFor={optionItem.id}>{optionItem.label}</Label>
//                   </div>
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
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

function ProductFilter({ 
  filters, 
  handleFilter, 
  filterOptions, 
  isMobileFilterOpen, 
  setIsMobileFilterOpen,
  isFilterLoading 
}) {
  return (
    <div className={`bg-background rounded-lg shadow-sm ${isMobileFilterOpen ? 'fixed inset-0 z-50 overflow-y-auto' : 'hidden md:block'}`}>
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="text-lg font-extrabold">Filters</h2>
        {isMobileFilterOpen && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMobileFilterOpen(false)}
            className="md:hidden"
            disabled={isFilterLoading}
          >
            {isFilterLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <X className="h-5 w-5" />
            )}
          </Button>
        )}
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
                      disabled={isFilterLoading}
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
      
      {isMobileFilterOpen && (
        <div className="p-4 border-t sticky bottom-0 bg-background">
          <Button 
            className="w-full" 
            onClick={() => setIsMobileFilterOpen(false)}
            disabled={isFilterLoading}
          >
            {isFilterLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Applying Filters...
              </>
            ) : (
              "Apply Filters"
            )}
          </Button>
        </div>
      )}
    </div>
  );
}

export default ProductFilter;