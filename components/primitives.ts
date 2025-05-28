import { tv } from "tailwind-variants";

export const title = tv({
  base: "tracking-tight inline font-semibold",
  variants: {
    color: {
      violet: "from-[#FF1CF7] to-[#b249f8]",
      yellow: "from-yellow-400 to-yellow-600",
      blue: "from-blue-400 to-blue-600",
      cyan: "from-[#00b7fa] to-[#01cfea]",
      green: "from-[#6FEE8D] to-[#17c964]",
      pink: "from-[#FF72E1] to-[#F54C7A]",
      default: "text-black-600",
      muted: "text-black-100",
      primary: "text-blue-600",
      accent: "text-yellow-600",
    },
    size: {
      sm: "text-3xl lg:text-4xl",
      md: "text-[2.3rem] lg:text-5xl leading-9",
      lg: "text-4xl lg:text-6xl",
      xl: "text-5xl lg:text-7xl",
      "2xl": "text-6xl lg:text-8xl",
    },
    fullWidth: {
      true: "w-full block break-normal",
    },
    align: {
      left: "w-full text-left",
      center: "w-full text-center",
      right: "w-full text-right",
    },
  },
  defaultVariants: {
    size: "md",
  },
  compoundVariants: [
    {
      color: ["violet", "yellow", "blue", "cyan", "green", "pink"],
      class: "bg-clip-text text-transparent bg-gradient-to-b",
    },
  ],
});

export const subtitle = tv({
  base: "w-full my-2 text-md text-default-600 block max-w-full",
  variants: {
    color: {
      default: "text-black-600",
      muted: "text-black-100",
      primary: "text-blue-600",
      accent: "text-yellow-600",
    },
    fullWidth: {
      true: "!w-full",
    },
    align: {
      left: "w-full text-left",
      center: "w-full text-center",
      right: "w-full text-right",
    },
  },
  defaultVariants: {
    color: "default",
    fullWidth: false,
  },
});

export const description = tv({
  base: "text-base leading-relaxed text-gray-600  max-w-prose",
  variants: {
    color: {
      default: "text-gray-600 ",
      muted: "text-gray-500 ",
      primary: "text-blue-600 ",
      accent: "text-yellow-600 ",
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    color: "default",
    size: "md",
  },
});

export const highlight = tv({
  base: "font-semibold",
  variants: {
    color: {
      blue: "bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600",
      yellow:
        "bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600",
      pink: "bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-pink-600",
      green:
        "bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-600",
      cyan: "bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-cyan-600",
      gray: "text-gray-700 ",
    },
  },
  defaultVariants: {
    color: "gray",
  },
});
