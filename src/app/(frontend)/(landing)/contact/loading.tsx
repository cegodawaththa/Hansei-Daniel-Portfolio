import { PageHeader } from "@/modules/landing/components/page-header";
import { Loader } from "lucide-react";

export default function ContactPageLoading() {
  return (
    <div className="">
      <PageHeader
        title={"Get in touch with me"}
        subtitle={"Leave me a message or email to get connected !"}
      />

      <div className="h-[40vh]">
        <div className="my-12 content-container flex items-center justify-center">
          <div className="p-2 bg-secondary/20 rounded-full">
            <Loader className="size-8 animate-spin text-secondary-foreground" />
          </div>
        </div>
      </div>
    </div>
  );
}
