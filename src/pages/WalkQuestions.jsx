import ScrollSegment from "./ScrollSegment";

export default function WalkQuestions() {
  return (
    <div
      style={{
        height: "100vh",
        overflowY: "scroll",
        scrollSnapType: "y mandatory",
        background: "linear-gradient(black, #111)",
        color: "white",
      }}
    >
      <ScrollSegment>Have you ever been happy?</ScrollSegment>
      <ScrollSegment>Have you ever felt loved?</ScrollSegment>
      <ScrollSegment>What do you look forward to?</ScrollSegment>
      <ScrollSegment>Do you have a purpose?</ScrollSegment>
      <ScrollSegment>Where do you find meaning?</ScrollSegment>
      <ScrollSegment>Given endless resources, what would you do?</ScrollSegment>
    </div>
  );
}
