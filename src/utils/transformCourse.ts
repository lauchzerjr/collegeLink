export function transformCourse(course: string): string {
  const courseWithoutAccent = course
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f|\s]/g, "");

  const courseName = courseWithoutAccent.split(/[\W_]+/);
  const courseCamelCase = courseName
    .map((palavra, index) =>
      index === 0 ? palavra : palavra.charAt(0).toUpperCase() + palavra.slice(1)
    )
    .join("");

  return courseCamelCase.charAt(0).toLowerCase() + courseCamelCase.slice(1);
}
