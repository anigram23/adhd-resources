import {useLayoutEffect, useRef, useState} from "react";
import {Box} from "@chakra-ui/react";
import type {Review} from "@/utils/types.ts";
import {Prose} from "@/components/ui/prose.tsx";
import GenericDialog from "@/components/utils/GenericDialog.tsx";
import ReviewDetailsDialog from "@/components/reviews/ReviewDetailsDialog.tsx";

// Fills the remaining card height; if the review doesn't fit, it fades out and a "Read more" link over the fade opens the full review.
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
        <Box position="relative" flex={1} minH={0} w="full">
            <Box
                ref={ref}
                h="full"
                overflow="hidden"
                maskImage={overflowing ? "linear-gradient(to bottom, black 60%, transparent)" : undefined}
            >
                <Prose
                    size="lg"
                    color="gray.700"
                    lineHeight="1.8"
                    maxW="none"
                    css={{"& > :first-child": {marginTop: 0}, "& > :last-child": {marginBottom: 0}}}
                    dangerouslySetInnerHTML={{__html: review.content}}
                />
            </Box>
            {overflowing && (
                <Box position="absolute" bottom={0} right={0} bg="bg.panel" pl={2}>
                    <GenericDialog
                        component={() => <ReviewDetailsDialog review={review}/>}
                        title="Review Information"
                        buttonText="Read more"
                        size={"xl" as never}
                        variant="plain"
                        buttonSize="xs"
                    />
                </Box>
            )}
        </Box>
    );
}
