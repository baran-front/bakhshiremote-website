import Image from "next/image";
import { StarIcon } from "lucide-react";

import Faq from "@/components/templates/faq";
import CommentForm from "@/components/templates/commentForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { brand } from "@/brand";
import { NextPageProps } from "@/types/app.types";
import { getComments } from "@/lib/fetchs";
import ProductCard from "@/components/modules/productCard";
import ProductDetail from "@/components/templates/productDetail";
import { getProductWithRelatedByCategory } from "@/lib/fetchs";
import Breadcrumbs from "@/components/modules/breadcrumbs";

async function ProductDetailPage({ params }: NextPageProps) {
  const id = (await params).id as string;
  const productWithRelatedByCategory = await getProductWithRelatedByCategory({
    id,
  });
  const comments = await getComments({
    productId: id,
    pageNumber: 1,
    pageSize: 100,
    orderBy: [""],
  });

  return (
    <>
      <Breadcrumbs
        links={[
          { name: "محصولات", href: "/products" },
          {
            name:
              productWithRelatedByCategory.result?.data.currentProduct.name ||
              "",
            href: `/products/${id}`,
          },
        ]}
      />

      <div className="wrapper mt-3 lg:mt-6">
        {productWithRelatedByCategory.result?.data.currentProduct && (
          <ProductDetail
            product={productWithRelatedByCategory.result?.data.currentProduct}
          />
        )}

        <Tabs className="mt-3 lg:mt-6" defaultValue={"1"} dir="rtl">
          <TabsList>
            <TabsTrigger value="1">توضیحات</TabsTrigger>
            <TabsTrigger value="2">نظرات</TabsTrigger>
          </TabsList>
          <TabsContent value="1">
            <div
              className="cms mt-3"
              dangerouslySetInnerHTML={{
                __html:
                  productWithRelatedByCategory.result?.data.currentProduct
                    .description || "",
              }}
            />
          </TabsContent>
          <TabsContent value="2">
            <div
              id="comments"
              className="wrapper grid grid-cols-1 lg:grid-cols-5 gap-6 mt-3"
            >
              <CommentForm type="product" typeId={id} />

              <div className="lg:col-span-3">
                {comments.result?.data.length ? (
                  comments.result?.data?.map((item) => (
                    <div key={item.id} className="card not-first:mt-6">
                      <div className="flex items-center gap-3">
                        <Image
                          width={48}
                          height={48}
                          className="rounded-full"
                          alt={item.userFullName || ""}
                          src={brand.apiBaseUrl + (item.userThumbnail || "")}
                        />
                        <div>
                          <p className="font-yekan-bakh-bold">
                            {item.userFullName}
                          </p>
                          <p className="text-sm opacity-50">
                            {new Date(item.createdOn).toLocaleDateString("fa")}
                          </p>
                        </div>

                        <div
                          className="flex items-center mr-auto gap-1.5"
                          dir="ltr"
                        >
                          {[1, 2, 3, 4, 5].map((star) => (
                            <StarIcon
                              key={star}
                              className={`size-4 ${item.rate && item.rate >= star
                                  ? "text-yellow-500 fill-yellow-500"
                                  : ""
                                }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="leading-relaxed mt-3">
                        {item.title} {item.text}
                      </p>

                      {item.children.length
                        ? item.children.map((childItem) => (
                          <div
                            key={childItem.id}
                            className="pr-6 mr-6 mt-6 border-r-2 separator-border"
                          >
                            <div className="flex items-center gap-3">
                              <Image
                                width={48}
                                height={48}
                                className="rounded-full"
                                alt={childItem.userFullName || ""}
                                src={
                                  brand.apiBaseUrl +
                                  (childItem.userThumbnail || "")
                                }
                              />
                              <div>
                                <p className="font-yekan-bakh-bold">
                                  {childItem.userFullName}
                                </p>
                                <p className="text-sm opacity-50">
                                  {new Date(
                                    childItem.createdOn
                                  ).toLocaleDateString("fa")}
                                </p>
                              </div>
                            </div>
                            <p className="leading-relaxed mt-3">
                              {childItem.title} {childItem.text}
                            </p>
                          </div>
                        ))
                        : null}
                    </div>
                  ))
                ) : (
                  <p className="card">هیچ نظری ثبت نشده است</p>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="wrapper mt-24 lg:mt-40">
        <h6 className="heading">محصولات مرتبط</h6>
        {productWithRelatedByCategory.result?.data.relatedProduct?.length ? (
          <div className="card-flex-wrapper mt-6">
            {productWithRelatedByCategory.result.data.relatedProduct?.map(
              (item) => (
                <ProductCard key={item.id} product={item} />
              )
            )}
          </div>
        ) : (
          <p className="card mt-6">هیچ محصولی مرتبطی یافت نشد</p>
        )}
      </div>

      <Faq />
    </>
  );
}

export default ProductDetailPage;
