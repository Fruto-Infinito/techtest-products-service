import chalk from 'chalk';

export function getMethodColor(method: string) {
  switch (method.toUpperCase()) {
    case 'GET':
      return chalk.blue(method);
    case 'POST':
      return chalk.green(method);
    case 'PUT':
      return chalk.yellow(method);
    case 'PATCH':
      return chalk.magenta(method);
    case 'DELETE':
      return chalk.red(method);
    default:
      return chalk.gray(method);
  }
}

export function getStatusColor(statusCode: number) {
  return statusCode >= 500
    ? chalk.redBright(statusCode)
    : statusCode >= 400
      ? chalk.hex('#FFA500')(statusCode)
      : statusCode >= 300
        ? chalk.yellowBright(statusCode)
        : statusCode >= 200
          ? chalk.greenBright(statusCode)
          : chalk.blueBright(statusCode);
}

export function formatDuration(ms: number): string {
  return ms > 500 ? chalk.red(`${ms}ms`) : chalk.gray(`${ms}ms`);
}

export function grayLabel(label: string): string {
  return chalk.gray(label);
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const formatted = parseFloat((bytes / Math.pow(k, i)).toFixed(2));
  return `${formatted} ${sizes[i]}`;
}
