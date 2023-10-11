import Link from "next/link"
import { getSlugPath } from "constants/paths"
import { ColorName } from "constants/styles"

import Label from "components/Label"

import { cn } from "lib/utils"

type CategoryTagProps = { name: ColorName; slug: string }

export const CategoryTag: React.FC<CategoryTagProps> = ({ name, slug }) => (
  <Link href={getSlugPath("category", slug)}>
    <Label
      labelName={name ?? "Default"}
      className={cn(
        "rounded-sm sm:rounded-xl px-2 py-1 text-sm hover:opacity-80 transition duration:300 brightness-95 ",
        "shadow-md dark:brightness-90 "
      )}
    />
  </Link>
)
