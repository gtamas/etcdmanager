module.exports = {
    assetsDir: 'assets',
    runtimeCompiler: true,
    configureWebpack: {
        node: {
            __dirname: true,
            __filename: false,
        },
    },
    pluginOptions: {
        electronBuilder: {
            builderOptions: {
                win: {
                    icon: './public/win/etcd_logo.png.ico',
                },
                mac: {
                    icon: './public/mac/etcd_logo.png.icns',
                },
                files: [
                    '**/*',
                    '!**/node_modules/*/{CHANGELOG.md,README.md,README,readme.md,readme}',
                    '!**/node_modules/*/{test,__tests__,tests,powered-test,example,examples}',
                    '!**/node_modules/*.d.ts',
                    '!**/node_modules/.bin',
                    '!**/*.{iml,o,hprof,orig,pyc,pyo,rbc,swp,csproj,sln,xproj}',
                    '!.editorconfig',
                    '!**/._*',
                    '!**/{.DS_Store,.git,.hg,.svn,CVS,RCS,SCCS,.gitignore,.gitattributes}',
                    '!**/{__pycache__,thumbs.db,.flowconfig,.idea,.vs,.nyc_output}',
                    '!**/{appveyor.yml,.travis.yml,circle.yml}',
                    '!**/{npm-debug.log,yarn.lock,.yarn-integrity,.yarn-metadata.json}',
                    {
                        from:
                            'node_modules/@grpc/proto-loader/node_modules/protobufjs/google/protobuf',
                        to: 'google/protobuf',
                        filter: '*.proto',
                    },
                ],
            },
        },
    },
};
