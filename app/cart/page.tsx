"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  CopyIcon,
  MinusIcon,
  PlusIcon,
  TrashIcon,
  CircleCheckIcon,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import secondEmptyCartImg from "@/public/images/empty-cart.png";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ButtonGroup, ButtonGroupText } from "@/components/ui/button-group";
import {
  InputGroup,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { brand } from "@/brand";
import { useBasket } from "@/lib/hooks/useBasket";
import {
  getTransactionWalletTotal,
  getMe,
  createHandyOrder,
} from "@/lib/fetchs";
import Breadcrumbs from "@/components/modules/breadcrumbs";

function CartPage() {
  const router = useRouter();
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    address1: "",
    phone1: "",
    postStateNumber: "",
    userFullname: "",
    city: "",
    description: "",
  });
  const {
    cartItems,
    isLoading,
    isUpdating,
    isCartEmpty,
    token,
    totalItems,
    totalPrice,
    totalOriginalPrice,
    totalDiscount,
    updateQuantity,
    removeItem,
    refetch: refetchBasket,
  } = useBasket();

  const { data: walletTotalData, isLoading: isLoadingWalletTotal } = useQuery({
    queryKey: ["wallet-total"],
    queryFn: () => getTransactionWalletTotal({ token: token || "" }),
    enabled: !!token,
  });

  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: () => getMe({ token: token || "" }),
    enabled: !!token,
  });

  const walletTotal = walletTotalData?.result?.data?.[0]?.price || 0;
  const userId = userData?.result?.id;
  const user = userData?.result;

  // Parse address from jsonExt if available
  const addressData = useMemo(() => {
    if (!user?.jsonExt) return {};
    try {
      return JSON.parse(user.jsonExt) as {
        province?: string;
        city?: string;
        postalCode?: string;
        plaque?: string;
        unit?: string;
        address?: string;
      };
    } catch {
      return {};
    }
  }, [user]);

  // Initialize form data when modal opens or user data is available
  const initializeFormData = () => {
    const fullName = user
      ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
      : "";
    setFormData({
      address1: addressData.address || "",
      phone1: user?.phoneNumber || "",
      postStateNumber: addressData.postalCode || "",
      userFullname: fullName,
      city: addressData.city || "",
      description: "",
    });
  };

  const handleOpenModal = () => {
    if (!token || !userId) {
      toast.error("لطفا ابتدا وارد حساب کاربری خود شوید");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("سبد خرید شما خالی است");
      return;
    }

    initializeFormData();
    setIsModalOpen(true);
  };

  const handleCreateOrder = async () => {
    if (!token || !userId) {
      toast.error("لطفا ابتدا وارد حساب کاربری خود شوید");
      return;
    }

    // Validate required fields
    if (!formData.address1.trim()) {
      toast.error("لطفا آدرس را وارد کنید");
      return;
    }
    if (!formData.phone1.trim()) {
      toast.error("لطفا شماره تلفن را وارد کنید");
      return;
    }
    if (!formData.postStateNumber.trim()) {
      toast.error("لطفا کد پستی را وارد کنید");
      return;
    }
    if (!formData.userFullname.trim()) {
      toast.error("لطفا نام و نام خانوادگی را وارد کنید");
      return;
    }
    if (!formData.city.trim()) {
      toast.error("لطفا شهر را وارد کنید");
      return;
    }

    setIsCreatingOrder(true);

    try {
      const response = await createHandyOrder({
        token,
        totalPrice,
        address1: formData.address1,
        phone1: formData.phone1,
        postStateNumber: formData.postStateNumber,
        status: 0,
        userId,
        userFullname: formData.userFullname,
        city: formData.city,
        description: formData.description,
        orderItems: cartItems,
      });

      if (response.status === 200) {
        await refetchBasket();
        toast.success("سفارش با موفقیت ثبت شد");
        setIsModalOpen(false);
        router.push("/dashboard/orders", {
          scroll: false
        });
      } else {
        toast.error("خطا در ثبت سفارش. لطفا دوباره تلاش کنید");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("خطا در ثبت سفارش. لطفا دوباره تلاش کنید");
    } finally {
      setIsCreatingOrder(false);
    }
  };
  return (
    <>
      <Breadcrumbs links={[{ name: "سبد خرید", href: "/cart" }]} />

      <div className="wrapper mt-3 lg:mt-6">
        <h1 className="heading mt-6">سبد خرید</h1>

        {!token ? (
          <div className="text-center py-12">
            <p className="text-lg mb-4">لطفا ابتدا وارد حساب کاربری خود شوید</p>
            <Link href="/">
              <Button>بازگشت به صفحه اصلی</Button>
            </Link>
          </div>
        ) : isLoading ? (
          <div className="text-center py-12">
            <p>در حال بارگذاری سبد خرید...</p>
          </div>
        ) : isCartEmpty ? (
          <Image
            width={327}
            height={286}
            className="mx-auto"
            alt="سبد خرید خالی"
            src={secondEmptyCartImg}
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <div className="lg:col-span-2 space-y-6 lg:h-max">
              {cartItems.map((item) => (
                <div
                  key={`${item.productId}-${item.p1 || ""}-${item.r1 || ""}-${item.r2 || ""
                    }-${item.r3 || ""}-${item.r4 || ""}-${item.r5 || ""}`}
                  className="card sm:h-52 flex items-center max-sm:flex-col gap-3 space-y-0"
                >
                  <div className="sm:h-full max-sm:w-full aspect-video bg-background rounded-lg relative overflow-hidden">
                    <Image
                      fill
                      alt={item.name}
                      className="object-cover"
                      src={brand.apiBaseUrl + item.masterImage}
                    />
                  </div>
                  <div className="sm:flex-1 sm:h-full flex flex-col sm:justify-evenly gap-3">
                    <p className="title">{item.name}</p>
                    <span>{item.masterPrice.toLocaleString("fa")} تومان</span>
                    <div className="w-full flex items-center gap-3">
                      <ButtonGroup>
                        <Button
                          variant={"outline"}
                          size={"icon"}
                          disabled={isUpdating}
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.p1,
                              item.r1,
                              item.r2,
                              item.r3,
                              item.r4,
                              item.r5,
                              item.quantity + 1
                            )
                          }
                        >
                          <PlusIcon />
                        </Button>
                        <ButtonGroupText>
                          <span>{item.quantity}</span>
                        </ButtonGroupText>
                        <Button
                          variant={"outline"}
                          size={"icon"}
                          disabled={isUpdating}
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.p1,
                              item.r1,
                              item.r2,
                              item.r3,
                              item.r4,
                              item.r5,
                              item.quantity - 1
                            )
                          }
                        >
                          <MinusIcon />
                        </Button>
                      </ButtonGroup>
                      <Button
                        variant={"destructive"}
                        size={"icon"}
                        disabled={isUpdating}
                        onClick={() =>
                          removeItem(
                            item.productId,
                            item.p1,
                            item.r1,
                            item.r2,
                            item.r3,
                            item.r4,
                            item.r5
                          )
                        }
                      >
                        <TrashIcon />
                      </Button>

                      {(() => {
                        const hasDiscount = (item.discountPercent || 0) > 0;
                        const masterPrice = item.masterPrice || 0;
                        const discountAmount = hasDiscount
                          ? Math.floor(
                            (masterPrice * (item.discountPercent || 0)) / 100
                          )
                          : 0;
                        const displayPrice = Math.max(
                          masterPrice - discountAmount,
                          0
                        );
                        return (
                          <div className="mr-auto flex flex-col items-end gap-1.5">
                            <span className="text-secondary">
                              {(displayPrice * item.quantity).toLocaleString(
                                "fa"
                              )}{" "}
                              تومان
                            </span>
                            {hasDiscount && (
                              <div className="flex items-center gap-1.5">
                                <span className="bg-primary p-1 rounded text-xs not-dark:text-background">
                                  {item.discountPercent}%
                                </span>
                                <span className="text-foreground/60 line-through text-xs">
                                  {(masterPrice * item.quantity).toLocaleString(
                                    "fa"
                                  )}{" "}
                                  تومان
                                </span>
                              </div>
                            )}
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="card lg:h-max lg:sticky lg:top-26">
              <label htmlFor="discount-code">کد تخفیف</label>
              <div className="flex items-center gap-3 mt-1.5">
                <InputGroup>
                  <InputGroupInput type="text" placeholder="کد تخفیف" />
                  <InputGroupButton>
                    <CopyIcon className="text-primary" />
                  </InputGroupButton>
                </InputGroup>
                <Button size={"icon"}>
                  <CircleCheckIcon />
                </Button>
              </div>

              <p className="mt-6">صورتحساب</p>
              <ul className="mt-3 space-y-3">
                <li className="flex items-center justify-between">
                  <span className="opacity-75">تعداد آیتم</span>
                  <span>{totalItems}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="opacity-75">قیمت کل</span>
                  <span>{totalOriginalPrice.toLocaleString("fa")} تومان</span>
                </li>
                {totalDiscount > 0 && (
                  <li className="flex items-center justify-between">
                    <span className="opacity-75">تخفیف</span>
                    <span>{totalDiscount.toLocaleString("fa")} تومان</span>
                  </li>
                )}
                <li className="flex items-center justify-between">
                  <span className="opacity-75">قیمت با تخفیف</span>
                  <span>{totalPrice.toLocaleString("fa")} تومان</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="opacity-75">کارمزد</span>
                  <span>0 تومان</span>
                </li>
              </ul>

              <p className="flex items-center justify-between mt-9">
                <span className="opacity-75">مبلغ نهایی</span>
                <span>{totalPrice.toLocaleString("fa")} تومان</span>
              </p>

              <Button
                className="w-full mt-6"
                onClick={handleOpenModal}
                disabled={!userId}
              >
                <span>تایید و پرداخت</span>
              </Button>
            </div>
          </div>
        )}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>اطلاعات سفارش</DialogTitle>
            <DialogDescription>
              لطفا اطلاعات مورد نیاز برای ثبت سفارش را وارد کنید
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div>
              <label htmlFor="userFullname" className="block mb-1.5">
                نام و نام خانوادگی <span className="text-destructive">*</span>
              </label>
              <Input
                id="userFullname"
                value={formData.userFullname}
                onChange={(e) =>
                  setFormData({ ...formData, userFullname: e.target.value })
                }
                placeholder="نام و نام خانوادگی"
              />
            </div>

            <div>
              <label htmlFor="phone1" className="block mb-1.5">
                شماره تلفن <span className="text-destructive">*</span>
              </label>
              <Input
                id="phone1"
                value={formData.phone1}
                onChange={(e) =>
                  setFormData({ ...formData, phone1: e.target.value })
                }
                placeholder="شماره تلفن"
              />
            </div>

            <div>
              <label htmlFor="city" className="block mb-1.5">
                شهر <span className="text-destructive">*</span>
              </label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                placeholder="شهر"
              />
            </div>

            <div>
              <label htmlFor="address1" className="block mb-1.5">
                آدرس <span className="text-destructive">*</span>
              </label>
              <Input
                id="address1"
                value={formData.address1}
                onChange={(e) =>
                  setFormData({ ...formData, address1: e.target.value })
                }
                placeholder="آدرس کامل"
              />
            </div>

            <div>
              <label htmlFor="postStateNumber" className="block mb-1.5">
                کد پستی <span className="text-destructive">*</span>
              </label>
              <Input
                id="postStateNumber"
                value={formData.postStateNumber}
                onChange={(e) =>
                  setFormData({ ...formData, postStateNumber: e.target.value })
                }
                placeholder="کد پستی"
              />
            </div>

            <div>
              <label htmlFor="description" className="block mb-1.5">
                توضیحات (اختیاری)
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="توضیحات اضافی"
                className="w-full min-h-[100px] rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-primary/20 hover:ring-primary/20 focus-visible:border-primary hover:border-primary focus-visible:placeholder:text-foreground ring-[3px] ring-transparent resize-none"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsModalOpen(false)}
              disabled={isCreatingOrder}
            >
              انصراف
            </Button>
            <Button
              onClick={handleCreateOrder}
              disabled={isCreatingOrder}
            >
              {isCreatingOrder ? "در حال ثبت سفارش..." : "ثبت سفارش"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CartPage;
