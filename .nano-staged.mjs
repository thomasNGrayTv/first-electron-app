import { resolve, sep } from "path";

export default {
  "*.{js,vue}": "eslint --cache --fix",

  /**
   * Run typechecking if any type-sensitive files was staged
   * @param {string[]} filenames
   * @return {string[]}
   */
  "packages/**/{*.vue}": ({ filenames }) => {
    const pathToPackages = resolve(process.cwd(), "packages") + sep;
    return Array.from(
      filenames.reduce((set, filename) => {
        const pack = filename.replace(pathToPackages, "").split(sep)[0];
        set.add(`npm run typecheck:${pack} --if-present`);
        return set;
      }, new Set())
    );
  },
};
