import { useEffect, useMemo, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

type PdfInlineViewerProps = {
  fileUrl: string;
  className?: string;
};

const PdfInlineViewer = ({ fileUrl, className }: PdfInlineViewerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pageImages, setPageImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const containerWidth = useMemo(() => {
    if (!containerRef.current) return 900;
    return Math.max(360, containerRef.current.clientWidth);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const renderPdf = async () => {
      setIsLoading(true);
      setPageImages([]);

      try {
        const loadingTask = pdfjsLib.getDocument(fileUrl);
        const pdf = await loadingTask.promise;

        const images: string[] = [];
        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
          if (cancelled) return;

          const page = await pdf.getPage(pageNumber);
          const baseViewport = page.getViewport({ scale: 1 });
          const scale = containerWidth / baseViewport.width;
          const viewport = page.getViewport({ scale });

          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          if (!context) continue;

          canvas.width = viewport.width;
          canvas.height = viewport.height;

          await page.render({
            canvas,
            canvasContext: context,
            viewport,
          }).promise;

          images.push(canvas.toDataURL("image/png"));
        }

        if (!cancelled) {
          setPageImages(images);
        }
      } catch {
        if (!cancelled) {
          setPageImages([]);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    renderPdf();

    return () => {
      cancelled = true;
    };
  }, [fileUrl, containerWidth]);

  return (
    <div ref={containerRef} className={className}>
      {isLoading && (
        <div className="py-10 text-center text-sm text-muted-foreground">Loading article pages...</div>
      )}

      {!isLoading && pageImages.length === 0 && (
        <div className="py-10 text-center text-sm text-muted-foreground">Unable to preview this article.</div>
      )}

      <div className="space-y-3">
        {pageImages.map((image, index) => (
          <img
            key={`page-${index + 1}`}
            src={image}
            alt={`Article page ${index + 1}`}
            className="w-full h-auto rounded-md border border-border/40 bg-card"
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
};

export default PdfInlineViewer;
