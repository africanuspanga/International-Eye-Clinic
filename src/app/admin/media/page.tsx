import { MediaLibrary } from "@/components/admin/MediaLibrary";
import { PageHeader, ui } from "@/components/admin/ui";

export default function MediaPage() {
  return (
    <>
      <PageHeader
        title="Media Library"
        description="Upload images, videos and PDFs (up to 50 MB each). Click “Copy link” to use a file anywhere on the site."
      />
      <div className={`${ui.card} p-5 sm:p-6`}>
        <MediaLibrary />
      </div>
    </>
  );
}
