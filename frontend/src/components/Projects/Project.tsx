import Link from "next/link"
import { faGithubSquare } from "@fortawesome/free-brands-svg-icons"
import { faExternalLink } from "@fortawesome/pro-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { externalLinkProps } from "constants/links"
import { COLORS, SKILL_COLORS } from "constants/styles"

import { cn } from "lib/utils"

import { type ProjectAttributes } from "./ProjectList"

export type ProjectProps = ProjectAttributes & { idx: number }

const LABEL_LIMIT = 3

const Label = ({ labelName }: { labelName: keyof typeof COLORS }) => (
  <span
    className="self-center px-2 py-[3px] text-md md:text-[0.78rem] font-semibold tracking-wide border-2 pointer-events-none rounded-lg"
    style={{
      backgroundColor: SKILL_COLORS[labelName].fill,
      color: SKILL_COLORS[labelName].text,
      borderColor: SKILL_COLORS[labelName].borderColor,
    }}
  >
    {labelName}
  </span>
)

const iconStyles =
  "leading-tight text-neutral-700 hover:text-neutral-500 dark:text-white dark:hover:text-slate-300 transition-colors duration-300"

export const Project: React.FC<ProjectProps> = ({
  imgSrc,
  title,
  description,
  labels,
  githubLink,
  deployedUrl,
  idx,
}) => (
  <div
    className={cn(
      "relative flex text-center rounded-lg shadow-md bg-gradient-to-tr md:max-w-[900px] overflow-hidden",
      "to-neutral-300 from-neutral-200 dark:to-slate-500 dark:from-slate-600",
      idx % 2 !== 0 ? "self-end" : ""
    )}
    tabIndex={0}
  >
    <div
      id="project-tile-img"
      className="min-w-[40%] bg-cover bg-center hidden md:block"
      aria-label={title}
      style={{
        backgroundImage: `url(${imgSrc})`,
      }}
    />
    <div
      id="project-bg-img"
      className={cn(
        "w-full h-full absolute inset-0 opacity-[5%]",
        "block md:hidden bg-cover bg-center" // Hide the background image on screens >sm breakpoint
      )}
      style={{
        backgroundImage: `url(${imgSrc})`,
      }}
    />

    <div className="z-10 flex flex-col justify-between p-6 sm:p-5">
      <h3 className="pb-2 text-2xl tracking-wide ">{title}</h3>
      <div className="pb-4 leading-normal text-md md:text-sm text-neutral-600 dark:text-slate-300">
        {description}
      </div>
      <div className="flex flex-col flex-wrap justify-center gap-3 md:flex-row">
        <div className="flex flex-wrap justify-center gap-3 pt-2 md:pt-0 md:flex-1">
          {labels.slice(0, LABEL_LIMIT).map((labelName) => (
            <Label key={labelName} labelName={labelName} />
          ))}
        </div>
        <div className="flex items-center justify-center gap-3 pt-1 md:pt-0">
          <Link
            href={githubLink}
            title="Source Code"
            className={iconStyles}
            {...externalLinkProps}
          >
            <FontAwesomeIcon icon={faGithubSquare} size="2x" />
          </Link>
          {deployedUrl && (
            <Link
              href={deployedUrl}
              title="Deployed Application"
              className={iconStyles}
              {...externalLinkProps}
            >
              <FontAwesomeIcon
                icon={faExternalLink}
                size="2x"
                className="h-[28px]" // NOTE: Cheeky fix; this FA icon is 32px, others are 28px... 😅
              />
            </Link>
          )}
        </div>
      </div>
    </div>
    <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20" />
  </div>
)
