import Image, { type StaticImageData } from "next/image";
import { useTranslations } from "next-intl";

import mobileCalendarImage from "../public/images/pawth-mobile-calendar.webp";
import mobileTimelineImage from "../public/images/pawth-mobile-timeline.webp";
import Container from "./Container";
import FadeIn from "./FadeIn";

type UsabilityImage = {
  src: string;
  alt: string;
};

type UsabilityProps = {
  onImageClick: (image: UsabilityImage) => void;
};

type MobileScreen = {
  id: "mobileCalendar" | "mobileTimeline";
  src: StaticImageData;
  modalSrc: string;
};

const items = ["record", "calendar", "timeline"] as const;

const mobileScreens: MobileScreen[] = [
  {
    id: "mobileCalendar",
    src: mobileCalendarImage,
    modalSrc: "/images/pawth-mobile-calendar.webp",
  },
  {
    id: "mobileTimeline",
    src: mobileTimelineImage,
    modalSrc: "/images/pawth-mobile-timeline.webp",
  },
];

export default function Usability({ onImageClick }: UsabilityProps) {
  const t = useTranslations("Usability");

  return (
    <section className="py-20 md:py-28">
      <Container>
        <FadeIn>
          <div className="mb-12">
            <p className="mb-4 text-sm font-bold tracking-[0.14em] text-(--accent) uppercase">
              {t("label")}
            </p>

            <h2 className="title-gradient text-[clamp(2rem,5vw,3.5rem)] leading-tight font-black">
              {t("title")}
            </h2>

            <p className="mt-5 leading-8 text-(--muted)">{t("description")}</p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {items.map((item, index) => (
              <article
                key={item}
                className="rounded-3xl border border-(--border) bg-(--surface) p-7 shadow-(--shadow)"
              >
                <p className="mb-5 text-sm font-black tracking-[0.12em] text-(--accent)">
                  {String(index + 1).padStart(2, "0")}
                </p>

                <h3 className="text-xl font-black">{t(`${item}.title`)}</h3>

                <p className="mt-3 leading-7 text-(--muted)">
                  {t(`${item}.description`)}
                </p>
              </article>
            ))}
          </div>

          <div className="mx-auto mt-16 grid max-w-3xl gap-8 md:mt-20 md:grid-cols-2 md:gap-12">
            {mobileScreens.map((screen) => {
              const alt = t(`${screen.id}.alt`);

              return (
                <button
                  key={screen.id}
                  type="button"
                  className="group mx-auto w-full overflow-hidden rounded-3xl"
                  onClick={() =>
                    onImageClick({
                      src: screen.modalSrc,
                      alt,
                    })
                  }
                  aria-label={t(`${screen.id}.button`)}
                >
                  <Image
                    src={screen.src}
                    alt={alt}
                    sizes="(max-width: 768px) 90vw, 50vw"
                    draggable={false}
                    className="h-auto w-full select-none transition-transform duration-500 group-hover:scale-[1.01]"
                  />
                </button>
              );
            })}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
