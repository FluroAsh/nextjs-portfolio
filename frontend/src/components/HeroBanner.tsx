import React from "react"
import Image from "next/image"
import Link from "next/link"
import { ROUTE_URL } from "constants/paths"

export const HeroBanner = () => {
  return (
    <div className="relative flex justify-center px-6 pt-6 mx-auto mb-6 dark:bg-gradient-to-tr dark:to-slate-500 dark:via-slate-600 dark:from-slate-700 bg-gradient-to-r to-orange-200 from-orange-100">
      <div className="flex flex-col items-center justify-center w-full max-w-screen-xl md:flex-row md:items-end">
        <div
          id="img-wrapper"
          className="flex max-w-[470px] overflow-hidden rounded-full shadow-lg border-orange-500/50 bg-dark-background-primary bg-gradient-to-tr from-orange-200
          dark:border-2 dark:from-slate-700 to-orange-50 dark:to-background-dark-primary dark:border-slate-300
          md:justify-center md:w-1/2 md:border-none md:rounded-none md:shadow-none md:bg-none bg-inherit"
        >
          <Image
            src="/images/hero-home.webp"
            alt="Portrait of Ashley"
            width={470}
            height={470}
            loading="eager"
            className="relative w-full top-2 md:top-0 md:pb-4 md:block md:max-w-[470px]"
          />
        </div>

        {/* -- MOBILE -- */}
        <div
          id="small-hero"
          className="max-w-md pb-0 mx-auto mt-4 mb-8 text-3xl sm:pb-2 md:hidden"
        >
          <h1 className="text-center">Howdy Partner! 🤠</h1>
          <h3 className="mt-2 text-lg text-center">
            Ash here. I&apos;m a Front-End Developer with a passion for building
            beautiful, functional, and accessible web applications. If you want
            to learn some more tricks, check out my{" "}
            <Link
              href={ROUTE_URL.BLOG}
              className="text-orange-400 transition hover:text-orange-500 dark:text-sky-500 dark:hover:text-sky-600"
            >
              blog.
            </Link>
          </h3>
        </div>
        {/* ---- */}

        {/* -- DESKTOP --  */}
        <div
          id="large-hero"
          className="relative hidden w-1/2 max-w-2xl pb-12 mx-6 my-auto md:block"
        >
          {/* TODO: Add proper FA caret icon & format text */}
          <h1 className="absolute top-0 text-3xl text-slate-900/50 -left-24 dark:text-slate-300/40 drop-shadow-sm">
            {"< ABOUT-ME />"}
          </h1>
          <div id="inner-content">
            <h3 className="mt-10 text-3xl text-slate-900 dark:text-white drop-shadow-sm">
              ASHLEY{" "}
              <span className="text-orange-500 dark:text-sky-500">
                THOMPSON
              </span>
            </h3>
            <h4 className="text-2xl text-slate-900 dark:text-white drop-shadow-sm">
              Front-End{" "}
              <span className="text-orange-500 align-center dark:text-sky-500">
                /
              </span>{" "}
              Full-Stack Developer
            </h4>
            <p className="mt-2 leading-6 text-neutral-600 drop-shadow-sm dark:text-slate-300">
              Hey there! 👋 You&apos;ve stumbled into my humble abode. This is
              no ordinary developer dungeon, I&apos;ve got the secrets to unlock
              the universe in here. Fugiat iste ipsam deserunt dolor, porro hic
              itaque accusantium aut laborum alias tempora vero vitae. Suscipit
              similique, asperiores quibusdam vitae porro aspernatur! Eum dicta
              hic blanditiis aperiam est ab soluta accusantium repellendus. Sed
              tempora nihil modi voluptatibus quas incidunt. Ratione, nihil!
              Tempore iure aliquid perferendis soluta non dicta.
            </p>
          </div>
          {/* TODO: Add proper FA arrow icon & interactivity/animation for Discover More element */}
          <div className="mt-4 font-semibold text-right text-orange-500 dark:font-semibold dark:text-slate-300 text-1xl">
            Discover More ↓
          </div>
        </div>
      </div>
      {/* ---- */}

      <svg
        id="hero-banner-svg"
        className="absolute bottom-0 left-0 w-full h-6 transition duration-300 fill-orange-50 sm:h-12 dark:fill-dark-background-primary"
        viewBox="0 0 1440 220"
        preserveAspectRatio="none"
      >
        <path d="M0,22L80,47.7C160,73,320,125,480,139.3C640,154,800,132,960,110C1120,88,1280,66,1440,77C1600,88,1760,132,1920,139.3C2080,147,2240,117,2400,95.3C2560,73,2720,59,2880,47.7C3040,37,3200,29,3360,55C3520,81,3680,139,3840,150.3C4000,161,4160,125,4320,99C4480,73,4640,59,4800,44C4960,29,5120,15,5280,40.3C5440,66,5600,132,5760,154C5920,176,6080,154,6240,146.7C6400,139,6560,147,6720,139.3C6880,132,7040,110,7200,113.7C7360,117,7520,147,7680,161.3C7840,176,8000,176,8160,168.7C8320,161,8480,147,8640,117.3C8800,88,8960,44,9120,29.3C9280,15,9440,29,9600,51.3C9760,73,9920,103,10080,117.3C10240,132,10400,132,10560,135.7C10720,139,10880,147,11040,143C11200,139,11360,125,11440,117.3L11520,110L11520,220L11440,220C11360,220,11200,220,11040,220C10880,220,10720,220,10560,220C10400,220,10240,220,10080,220C9920,220,9760,220,9600,220C9440,220,9280,220,9120,220C8960,220,8800,220,8640,220C8480,220,8320,220,8160,220C8000,220,7840,220,7680,220C7520,220,7360,220,7200,220C7040,220,6880,220,6720,220C6560,220,6400,220,6240,220C6080,220,5920,220,5760,220C5600,220,5440,220,5280,220C5120,220,4960,220,4800,220C4640,220,4480,220,4320,220C4160,220,4000,220,3840,220C3680,220,3520,220,3360,220C3200,220,3040,220,2880,220C2720,220,2560,220,2400,220C2240,220,2080,220,1920,220C1760,220,1600,220,1440,220C1280,220,1120,220,960,220C800,220,640,220,480,220C320,220,160,220,80,220L0,220Z"></path>
      </svg>
    </div>
  )
}
