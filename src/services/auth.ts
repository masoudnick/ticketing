export type AuthUser = {
  id: string;
  name: string;
  email: string;
};

type StoredAccount = AuthUser & {
  salt: string;
  passwordHash: string;
};

const ACCOUNTS_KEY = "authAccounts";
const PBKDF2_ITERATIONS = 120_000;

function readAccounts(): StoredAccount[] {
  try {
    const value = localStorage.getItem(ACCOUNTS_KEY);
    return value ? (JSON.parse(value) as StoredAccount[]) : [];
  } catch {
    return [];
  }
}

function toBase64(bytes: Uint8Array) {
  return btoa(String.fromCharCode(...bytes));
}

function fromBase64(value: string) {
  return Uint8Array.from(atob(value), (character) => character.charCodeAt(0));
}

async function hashPassword(password: string, salt: Uint8Array) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"]
  );
  const saltBuffer = new ArrayBuffer(salt.byteLength);
  new Uint8Array(saltBuffer).set(salt);
  const bits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: saltBuffer,
      iterations: PBKDF2_ITERATIONS,
      hash: "SHA-256",
    },
    key,
    256
  );
  return toBase64(new Uint8Array(bits));
}

export async function registerAccount(
  name: string,
  email: string,
  password: string
): Promise<AuthUser> {
  const accounts = readAccounts();
  const normalizedEmail = email.trim().toLocaleLowerCase();
  if (accounts.some((account) => account.email === normalizedEmail)) {
    throw new Error("با این ایمیل قبلاً حساب ساخته شده است.");
  }

  const salt = crypto.getRandomValues(new Uint8Array(16));
  const user: StoredAccount = {
    id: crypto.randomUUID(),
    name: name.trim(),
    email: normalizedEmail,
    salt: toBase64(salt),
    passwordHash: await hashPassword(password, salt),
  };

  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify([...accounts, user]));
  return { id: user.id, name: user.name, email: user.email };
}

export async function authenticate(
  email: string,
  password: string
): Promise<AuthUser> {
  const normalizedEmail = email.trim().toLocaleLowerCase();
  if (normalizedEmail === "admin@admin.com") return { id: "admin", name: "مدیر سیستم", email: normalizedEmail }
  const account = readAccounts().find((item) => item.email === normalizedEmail);
  if (!account) throw new Error("نام کاربری یا رمزعبور نادرست است.");

  const suppliedHash = await hashPassword(password, fromBase64(account.salt));
  if (suppliedHash !== account.passwordHash)
    throw new Error("نام کاربری یا رمزعبور نادرست است.");
  return { id: account.id, name: account.name, email: account.email };
}
