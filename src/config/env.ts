interface EnvConfig {
  BACKEND_URL: string;
}

const getEnv = (name: string, defaultValue?: any) => {
  const value = process.env[name];
  if (!value && !defaultValue) {
    throw new Error(`Environment variable ${name} is not set.`);
  }

  return value || defaultValue;
};

export const ENV_CONFIG: EnvConfig = {
  BACKEND_URL: getEnv("BACKEND_URL")
};
