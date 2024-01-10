export enum HeaderItem {
  HOME = "home",
  LEARNING = "learning",
  EVALUATION = "evaluation",
  ORIENTATION = "orientation",
}

export const headerNavLinks = [
  { id: HeaderItem.HOME, href: "/", title: "Home" },
  { id: HeaderItem.LEARNING, href: "/learning", title: "Learning" },
  { id: HeaderItem.EVALUATION, href: "/evaluation", title: "Evaluation" },
  { id: HeaderItem.ORIENTATION, href: "/orientation", title: "Orientation" },
];
