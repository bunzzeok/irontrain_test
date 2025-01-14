export const headerList = [
  { title: "FirstName", value: "firstname" },
  { title: "Gender", value: "gender" },
  { title: "Phone", value: "phone" },
  { title: "Email", value: "email" },
  { title: "Birthday", value: "birthday" },
] as {
  title: string;
  value: "firstname" | "gender" | "phone" | "email" | "birthday";
}[];
