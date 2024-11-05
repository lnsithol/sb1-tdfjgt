import { GitHub, Google } from "lucia/oauth";

const githubAuth = new GitHub(
  process.env.GITHUB_CLIENT_ID!,
  process.env.GITHUB_CLIENT_SECRET!,
  {
    redirectUri: `${process.env.APP_URL}/api/auth/callback/github`,
    scope: ['user:email'],
  }
);

const googleAuth = new Google(
  process.env.GOOGLE_CLIENT_ID!,
  process.env.GOOGLE_CLIENT_SECRET!,
  {
    redirectUri: `${process.env.APP_URL}/api/auth/callback/google`,
    scope: ['email', 'profile'],
  }
);

export async function getGithubAuthUrl() {
  const [url, state] = await githubAuth.getAuthorizationUrl();
  return { url, state };
}

export async function getGoogleAuthUrl() {
  const [url, state] = await googleAuth.getAuthorizationUrl();
  return { url, state };
}

export async function handleGithubCallback(code: string, state: string) {
  const { getExistingUser, githubUser, createUser } =
    await githubAuth.validateCallback(code, state);

  const existingUser = await getExistingUser();
  if (existingUser) {
    return existingUser;
  }

  const user = await createUser({
    attributes: {
      email: githubUser.email,
      name: githubUser.name || githubUser.login,
      avatar: githubUser.avatar_url,
      emailVerified: true,
    },
  });

  return user;
}

export async function handleGoogleCallback(code: string, state: string) {
  const { getExistingUser, googleUser, createUser } =
    await googleAuth.validateCallback(code, state);

  const existingUser = await getExistingUser();
  if (existingUser) {
    return existingUser;
  }

  const user = await createUser({
    attributes: {
      email: googleUser.email,
      name: googleUser.name,
      avatar: googleUser.picture,
      emailVerified: true,
    },
  });

  return user;
}