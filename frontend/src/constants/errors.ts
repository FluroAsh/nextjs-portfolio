type ERROR_MAP = { [key: string]: string }

export const ERROR_MAP: ERROR_MAP = {
  400: "Unexpected error",
  404: "Page Not Found!",
  500: "Please try again later",
} as const
