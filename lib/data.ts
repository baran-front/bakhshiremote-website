import { PageSectionItemT, ProductT } from "@/types/api.types";

export const mapSectionItemToProduct = (sectionItem: PageSectionItemT) => {
  const jsonExt = sectionItem.jsonExt ? JSON.parse(sectionItem.jsonExt) : {};
  
  return {
    id: sectionItem.linkUrl,
    name: sectionItem.name || "",
    masterImage: sectionItem.mediaPath || "",
    masterPrice: +(jsonExt.masterPrice || "0"),
    discountPercent: +(jsonExt.discountPercent || "0"),
    jsonExt: sectionItem.jsonExt,
  } as ProductT;
};