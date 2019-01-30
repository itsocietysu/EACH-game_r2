
export default function ChoщseStatus(Score) {
  let res;

  if (Score >= 0 && Score < 1000) res = "Beginner";
  else if (Score >= 1000 && Score < 2000) res =  "Student";
  else if (Score >= 2000 && Score < 3000) res = "Expert";
  else if (Score >= 3000 && Score < 4000) res = "Profi";
  else res = "Master";

  return res;
}