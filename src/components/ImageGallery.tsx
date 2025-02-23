"use client"

import { ResultCellProps, ResultRowView, useDelRowCallback, useHasTable, useQueries, useResultCell, useResultSortedRowIds } from '@/lib/schema';
import { default as NextImage } from "next/image";
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { LuZoomIn } from 'react-icons/lu';
import { toast } from 'sonner';

export default function ImageGallery() {
  const data = useHasTable("images");
  const searchParams = useSearchParams()
  const queriesReference = useQueries();
  const queryTableRowIds = useResultSortedRowIds(
    "imagesQuery",
    "id",
    false,
    0,
    undefined,
  );

  return (
    <>
      {data ? (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {queryTableRowIds.length > 0 && 
            queryTableRowIds.map((rowId) => (
              <div key={rowId} className="group relative max-h-[200px] max-w-[200px] overflow-hidden rounded-md border border-accent shadow-lg">
                <ResultRowView
                  queryId={"imagesQuery"}
                  rowId={rowId}
                  resultCellComponent={GridCell}
                />
              </div>
            ))
          }
        </div>
      ) : null}
    </>
  );
}

const GridCell = (props: typeof ResultCellProps) => {
  const id = useResultCell(props.queryId, props.rowId, "id", props.queries) as string
  const name = useResultCell(props.queryId, props.rowId, "name", props.queries) as string
  const width = useResultCell(props.queryId, props.rowId, "width", props.queries) as number
  const height = useResultCell(props.queryId, props.rowId, "height", props.queries) as number
  const imageUrl = useResultCell(props.queryId, props.rowId, "imageUrl", props.queries) as string
  const transformedImageUrl = useResultCell(props.queryId, props.rowId, "transformedImageUrl", props.queries) as string
  const searchParams = useSearchParams()

  const removeImage = useDelRowCallback(
    "images",
    id,
    undefined,
    () => {
      toast.message(`Deleted image:${name}`);
    }
  );
  return props.cellId === "imageUrl" ? (
    <>
      <NextImage
        src={transformedImageUrl || imageUrl}
        width={width}
        height={height}
        alt={name}
        className="size-full object-contain transition-all group-hover:scale-105"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-foreground/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <button
          type='button'
          onClick={removeImage}
          className="absolute right-2 top-2 flex size-6 items-center justify-center rounded-full bg-background/50 text-primary hover:bg-background/70"
          aria-label={`Remove image ${name}`}
        >
          &#x2715;
        </button>
        <Link href={`/images/${id}?${searchParams.toString()}`} scroll={false}>
          <LuZoomIn className="size-8 text-primary/50 hover:text-primary" />
        </Link>
      </div>
    </>
  ) : null
}