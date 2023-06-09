export function fetchPhrase(words: string[] = []) {
  return new Promise<{ data: string[] }>((resolve) =>
    setTimeout(() => resolve({ data: words }), 500)
  );
}