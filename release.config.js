module.exports = {
    branches: [ // updated to include "main"
        '+([0-9])?(.{+([0-9]),x}).x',
        'main',
        'next',
        'next-major',
        {name: 'beta', prerelease: true},
        {name: 'alpha', prerelease: true},
    ],
    plugins: [
        ['@semantic-release/commit-analyzer', {
            preset: 'conventionalcommits',
        }],
        ['@semantic-release/release-notes-generator', {
            preset: 'conventionalcommits',
        }],
        '@semantic-release/changelog', // updates changelog file.
        '@semantic-release/npm', // updates package.json with new version.
        '@semantic-release/git', // create git commit for version, including any files changed from previous plugins.
        '@semantic-release/github', // creates github release, adds comments to issues/prs.
    ],
};
