/* eslint-disable no-console */
const process = require("process");
const chalk = require("chalk");
const isInMergeOrRebase = require("./is-rebase-merge.js")();

const printError = (msg) => console.warn(chalk.red(msg));
const absoluteMax = 50;
const absoluteMin = 5;
const errors = [];

/**
 * Check if the commit message follows a good standard
 *
 * @param {String} msg The multi-line message to check
 */
module.exports = function checkCommitMsg(commitMsg) {
  if (isInMergeOrRebase) {
    process.exit(0);
  }

  const firstLine = commitMsg.split("\n")[0];

  if(firstLine[0] !== firstLine[0].toUpperCase() && firstLine[0] === firstLine[0].toLowerCase()) {
    errors.push(
      `The first letter of your subject line must be capitalized.`
    );
  }

  if(firstLine[firstLine.length - 1] === '.') {
    errors.push(
      `Your subject must not end in a period "."`
    );
  }

  if (firstLine.length < absoluteMin) {
    errors.push(
      `Too short subject line in git commit message! Min ${absoluteMin} characters.`
    );
  }

  if (firstLine.length > absoluteMax) {
    errors.push(
      `Too long subject line in git commit message! Max ${absoluteMax} characters.`
    );
  }

  if (errors.length) {
    printError("Commit message policy violation(s)!\n");
    printError(" - " + errors.join("\n - "));

    // https://chris.beams.io/posts/git-commit/#seven-rules
    console.log(`\nThe 7 rules of a good commit message

    1. Separate subject from body with a blank line
    2. Limit the subject line to 50 characters
    3. Capitalize the subject line
    4. Do not end the subject line with a period
    5. Use the imperative mood in the subject line
    6. Wrap the body at 72 characters
    7. Use the body to explain what and why vs. how
  `);
    console.log(
      chalk.green(
        "\nYou can skip the checks by passing the flag `--no-verify` to Git"
      )
    );
    process.exit(1);
  }
};
