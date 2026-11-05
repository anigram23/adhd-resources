import {useLayoutEffect, useRef, useState} from "react";
import {Box} from "@chakra-ui/react";
import {FiEye} from "react-icons/fi";
import type {Review} from "@/utils/types.ts";
import {Prose} from "@/components/ui/prose.tsx";
import GenericDialog from "@/components/utils/GenericDialog.tsx";
import ReviewDetailsDialog from "@/components/reviews/ReviewDetailsDialog.tsx";

// Fills the remaining card height; if the review doesn't fit, it fades out and offers the full review in a dialog.
export default function ReviewContent({review}: { review: Review }) {
    const ref = useRef<HTMLDivElement>(null);
    const [overflowing, setOverflowing] = useState(false);

    useLayoutEffect(() => {
        const el = ref.current!;
        const check = () => setOverflowing(el.scrollHeight > el.clientHeight);
        const observer = new ResizeObserver(check);
        observer.observe(el);
        return () => observer.disconnect();
    }, [review.content]);

    return (
        <>
            <Box
                ref={ref}
                flex={1}
                minH={0}
                w="full"
                overflow="hidden"
                maskImage={overflowing ? "linear-gradient(to bottom, black 70%, transparent)" : undefined}
            >
                <Prose
                    size="lg"
                    color="gray.700"
                    lineHeight="1.8"
                    maxW="none"
                    dangerouslySetInnerHTML={{__html: review.content}}
                />
            </Box>
            {overflowing && (
                <GenericDialog
                    component={() => <ReviewDetailsDialog review={review}/>}
                    title="Review Information"
                    buttonText="Read full review"
                    size={"xl" as never}
                    variant="outline"
                    buttonSize="sm"
                    icon={<FiEye/>}
                />
            )}
        </>
    );
}
