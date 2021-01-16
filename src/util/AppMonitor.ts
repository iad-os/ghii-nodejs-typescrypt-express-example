export class AppMonitor {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  appFastFail({ err = undefined } = {}) {
    setInterval(() => process.exit(0), 1000);
  }
}

export default new AppMonitor();
