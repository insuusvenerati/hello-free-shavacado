/**
 * @type {import('semantic-release').Options}
 */
module.exports = {
  branches: ["main", "develop"],
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    ["@semantic-release/npm", { npmPublish: false }],
    "@semantic-release/github",
  ],
};
