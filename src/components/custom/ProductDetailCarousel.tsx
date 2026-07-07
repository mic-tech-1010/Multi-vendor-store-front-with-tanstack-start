import React, { useState, useEffect, useCallback } from "react"
import useEmblaCarousel from "embla-carousel-react"
import type { EmblaOptionsType } from "embla-carousel"
import type { Image } from "#/types"

type CarouselPropType = {
    images: Image[]
    thumbNails: Image[]
    options?: EmblaOptionsType
}

type ThumbPropType = {
    selected: boolean
    image: Image
    onClick: () => void
    onHover: () => void
}

const OPTIONS: EmblaOptionsType = {
    containScroll: "trimSnaps",
}

const Carousel: React.FC<CarouselPropType> = ({ images, thumbNails }) => {
    const [selectedIndex, setSelectedIndex] = useState(0)

    const [emblaMainRef, emblaMainApi] = useEmblaCarousel(OPTIONS)

    const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
        axis: "y",
        dragFree: true,
        containScroll: "keepSnaps",
    })

    const onThumbClick = useCallback(
        (index: number) => {
            emblaMainApi?.scrollTo(index)
        },
        [emblaMainApi]
    )

    const onSelect = useCallback(() => {
        if (!emblaMainApi || !emblaThumbsApi) return

        const index = emblaMainApi.selectedScrollSnap()
        setSelectedIndex(index)
        emblaThumbsApi.scrollTo(index)
    }, [emblaMainApi, emblaThumbsApi])

    useEffect(() => {
        if (!emblaMainApi) return

        onSelect()
        emblaMainApi.on("select", onSelect)
        emblaMainApi.on("reInit", onSelect)
    }, [emblaMainApi, onSelect])


    useEffect(() => {
        if (!emblaMainApi) return

        emblaMainApi.reInit()
        emblaMainApi.scrollTo(0)
        setSelectedIndex(0)

        emblaThumbsApi?.reInit()
        emblaThumbsApi?.scrollTo(0)
    }, [images, thumbNails])

    return (
        <div className="flex w-full flex-col gap-3 sm:flex-row sm:gap-4">
            
            {/* Thumbnails */}
            <div className="order-2 overflow-x-auto sm:order-1 lg:w-20 lg:overflow-hidden" ref={emblaThumbsRef}>
                <div className="flex gap-2 lg:flex-col lg:gap-3">
                    {thumbNails.map((image, index) => (
                        <Thumb
                            key={index}
                            image={image}
                            selected={index === selectedIndex}
                            onClick={() => onThumbClick(index)}
                            onHover={() => onThumbClick(index)}
                        />
                    ))}
                </div>
            </div>

            {/* Main Carousel */}
            <div className="order-1 flex-1 overflow-hidden rounded-2xl border border-border/60 bg-muted/30 p-2 shadow-sm sm:p-3 lg:order-2" ref={emblaMainRef}>
                <div className="flex h-80 sm:h-105 lg:h-140">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className="flex-[0_0_100%] flex h-full justify-center"
                        >
                            <img
                                src={image.imageUrl}
                                alt={image.imageAltText}
                                className="max-h-full max-w-full object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

const Thumb: React.FC<ThumbPropType> = ({
    selected,
    image,
    onClick,
    onHover,
}) => {
    return (
        <button
            onMouseEnter={onHover}
            onClick={onClick}
            className={`
        h-14 w-14 shrink-0 overflow-hidden rounded-xl border bg-background transition-all sm:h-16 sm:w-16
        ${selected ? "border-primary shadow-sm" : "border-border/70 opacity-70 hover:opacity-100"}
      `}
        >
            <img
                src={image.imageUrl}
                alt={image.imageAltText}
                className="w-full h-full object-cover"
            />
        </button>
    )
}

export default Carousel
