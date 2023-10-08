import Image from "next/image"
import Link from "next/link"
import { ROUTE_URL } from "constants/paths"

import { cn } from "lib/utils"

const HeroImage = () => (
  <div
    id="img-wrapper"
    className={cn(
      "flex max-w-[470px] overflow-hidden rounded-full shadow-lg",
      "outline outline-2 outline-transparent bg-gradient-to-tr from-neutral-100 to-neutral-200",
      "dark:outline-slate-300 dark:md:outline-transparent bg-dark-background-primary dark:from-slate-700 dark:to-background-dark-primary",
      "md:justify-center md:w-1/2 md:rounded-none md:shadow-none md:bg-none bg-inherit"
    )}
  >
    <Image
      src="/images/hero-home.webp"
      alt="Ash the Creator"
      width={470}
      height={470}
      loading="eager"
      className="relative w-full top-2 md:top-0 md:pb-4 md:block max-w-[250px] md:max-w-[470px]"
    />
  </div>
)

export const HeroBanner = () => {
  return (
    <div
      className={cn(
        "relative flex justify-center px-6 pt-6 transition-colors duration-300 mb-6 bg-gradient-to-r to-neutral-300 from-neutral-200 ",
        "dark:bg-gradient-to-tr dark:to-slate-500 dark:via-slate-600 dark:from-slate-700"
      )}
    >
      <div className="flex flex-col items-center justify-center w-full max-w-screen-xl md:flex-row md:items-end">
        <HeroImage />

        {/* -- MOBILE -- */}
        <div
          id="small-hero"
          className="max-w-md pb-0 mt-4 mb-8 text-3xl sm:pb-6 md:hidden"
        >
          <h2 className="text-center">G&apos;day Traveller! 👋</h2>
          <p className="mt-2 text-lg text-center text-neutral-600 dark:text-slate-300">
            Ash here — I&apos;m a Front-End Developer based in Melbourne,
            Australia 🇦🇺 with a passion for building beautiful and functional
            web applications.
          </p>
          <p className="mt-2 text-lg text-center text-neutral-600 dark:text-slate-300">
            I created this space to be my own little digital garden 🌱 If
            you&apos;d like to learn more about me, or add a thing or two to
            your toolbox 🧰 check out my{" "}
            <Link
              href={ROUTE_URL.BLOG}
              className="transition-colors duration-300 text-sky-500 hover:text-sky-600"
            >
              blog.
            </Link>
          </p>
        </div>

        {/* -- DESKTOP --  */}
        <div
          id="large-hero"
          className="relative hidden w-1/2 max-w-2xl pb-12 mx-6 my-auto md:block"
        >
          {/* TODO: Add proper FA caret icon & format text */}
          <h1 className="absolute top-0 text-3xl text-neutral-400 -left-24 dark:text-slate-300/40 drop-shadow-sm">
            {"< ABOUT-ME />"}
          </h1>
          <div id="inner-content">
            <h3 className="mt-10 text-2xl font-semibold tracking-wider dark:text-white drop-shadow-sm font-ptSans">
              ASHLEY <span className="text-sky-500">THOMPSON</span>
            </h3>
            <h4 className="text-xl dark:text-white drop-shadow-sm">
              Front-End <span className="align-center text-sky-500">/</span>{" "}
              Full-Stack Developer
            </h4>
            <p className="mt-2 lg:text-lg text-md text-neutral-600 drop-shadow-sm dark:text-slate-300">
              Hey there! 👋 You&apos;ve stumbled into my humble abode. My
              name&apos;s Ash — I&apos;m a Front-End{" "}
              <em className="text-sky-500">slash</em> Full-Stack Developer who
              is at the beginning of his career with a passion for building
              practical and useful applications to solve real-world problems and
              create engaging and mesmerizing user experiences.
            </p>
          </div>
          {/* TODO: Add proper FA arrow icon & interactivity/animation for Discover More element */}
          <div className="pt-6 pb-4 font-semibold tracking-wider text-right text-md lg:text-lg text-neutral-600 dark:font-semibold dark:text-slate-300">
            Discover More ↓
          </div>
        </div>
      </div>

      <svg
        id="hero-banner-svg"
        className="absolute bottom-0 left-0 w-full h-6 transition duration-300 fill-neutral-100 sm:h-12 dark:fill-dark-background-primary"
        viewBox="0 0 1440 220"
        preserveAspectRatio="none"
      >
        <path d="M0,22L80,47.7C160,73,320,125,480,139.3C640,154,800,132,960,110C1120,88,1280,66,1440,77C1600,88,1760,132,1920,139.3C2080,147,2240,117,2400,95.3C2560,73,2720,59,2880,47.7C3040,37,3200,29,3360,55C3520,81,3680,139,3840,150.3C4000,161,4160,125,4320,99C4480,73,4640,59,4800,44C4960,29,5120,15,5280,40.3C5440,66,5600,132,5760,154C5920,176,6080,154,6240,146.7C6400,139,6560,147,6720,139.3C6880,132,7040,110,7200,113.7C7360,117,7520,147,7680,161.3C7840,176,8000,176,8160,168.7C8320,161,8480,147,8640,117.3C8800,88,8960,44,9120,29.3C9280,15,9440,29,9600,51.3C9760,73,9920,103,10080,117.3C10240,132,10400,132,10560,135.7C10720,139,10880,147,11040,143C11200,139,11360,125,11440,117.3L11520,110L11520,220L11440,220C11360,220,11200,220,11040,220C10880,220,10720,220,10560,220C10400,220,10240,220,10080,220C9920,220,9760,220,9600,220C9440,220,9280,220,9120,220C8960,220,8800,220,8640,220C8480,220,8320,220,8160,220C8000,220,7840,220,7680,220C7520,220,7360,220,7200,220C7040,220,6880,220,6720,220C6560,220,6400,220,6240,220C6080,220,5920,220,5760,220C5600,220,5440,220,5280,220C5120,220,4960,220,4800,220C4640,220,4480,220,4320,220C4160,220,4000,220,3840,220C3680,220,3520,220,3360,220C3200,220,3040,220,2880,220C2720,220,2560,220,2400,220C2240,220,2080,220,1920,220C1760,220,1600,220,1440,220C1280,220,1120,220,960,220C800,220,640,220,480,220C320,220,160,220,80,220L0,220Z"></path>
      </svg>
    </div>
  )
}
