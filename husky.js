#!/usr/bin/env node
/**
 * Entry-point for the NPM based commit-hooks utility Husky
 *
 * Usage:
 *  - Install Husky: `npm install husky -D`
 *  - Put this in your package.json's script section:
 *      "commitmsg": "node -r '@fatso83/check-commit-msg/husky'"
 */
const gitRoot = require("./git-root");
const fs = require("fs");
const filename = ".git/COMMIT_EDITMSG";
const fullPath = filename.replace(".git", gitRoot);
const commitMsg = fs.readFileSync(fullPath).toString();

const checkCommitMsg = require("./check-commit-msg");

checkCommitMsg(commitMsg);
