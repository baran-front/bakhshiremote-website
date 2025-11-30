import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { ChevronLeftIcon, CopyIcon, UsersIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationEllipsis,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import Link from "next/link";
import { getCookie } from "cookies-next";
import { getMe } from "@/lib/fetchs";
import SetRepresentativeButton from "@/components/templates/setRepresentativeButton";

async function DashboardReferralPage() {
  const token = (await getCookie("token")) || "";
  const user = await getMe({ token });

  return (
    <>
      <div className="card flex items-center space-y-0 justify-between gap-3 mb-6 lg:hidden">
        <h1 className="title">دعوت از دوستان</h1>
        <Link href={"/dashboard"}>
          <Button variant={"outline"} size={"icon"}>
            <ChevronLeftIcon />
          </Button>
        </Link>
      </div>

      <div className="card flex items-center max-md:flex-col gap-3 space-y-0">
        <div className="flex items-center gap-3">
          <UsersIcon className="size-10" />
          <div>
            <p className="text-xs opacity-50">کد دعوت از دوستان</p>
            <p className="title mt-1.5">34 نفر</p>
          </div>
        </div>
        <div className="flex items-center max-sm:flex-col-reverse gap-3 md:mr-auto max-md:w-full">
          <SetRepresentativeButton />
          <div className="h-9 w-px bg-foreground/10 max-sm:hidden" />
          <InputGroup dir="ltr" className="max-md:flex-1 md:w-72">
            <InputGroupButton size={"icon-sm"}>
              <CopyIcon className="text-primary" />
            </InputGroupButton>
            <InputGroupInput
              type="text"
              defaultValue={user.result?.representative}
            />
          </InputGroup>
        </div>
      </div>

      <Table className="mt-6">
        <TableHeader>
          <TableRow>
            <TableHead className="bg-card rounded-r-lg">ردیف</TableHead>
            <TableHead className="bg-card">نام و نام خانوادگی</TableHead>
            <TableHead className="bg-card">زمان عضویت</TableHead>
            <TableHead className="bg-card rounded-l-lg">
              امتیاز دریافتی
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 10 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell className="title">{index + 1}</TableCell>
              <TableCell>فرزاد وحدتی</TableCell>
              <TableCell>{new Date().toLocaleDateString("fa")}</TableCell>
              <TableCell>100</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination className="mt-6">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}

export default DashboardReferralPage;
