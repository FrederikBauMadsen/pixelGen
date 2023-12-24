interface ValueProps {
  value: string;
}
export default function checkWhiteSpace({ value }: ValueProps) {
  return value.indexOf(" ") >= 0;
}
