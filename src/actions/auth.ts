// TODO

export async function login(username: string, password: string) {
  const response = await fetch("/api/login", {
    method: "POST",
    body: JSON.stringify({ username, password })
  });
}
