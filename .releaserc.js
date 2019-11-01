module.exports = {
  release: {
    branch: "master",
  },

  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        preset: "angular",
      },
    ],

    [
      "@semantic-release/release-notes-generator",
      {
        preset: "angular",
        writerOpts: {
          commitsSort: ["subject", "scope"],
        },
      },
    ],

    ["@semantic-release/github"],
  ],
}
