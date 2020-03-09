module.exports = {
    assetsDir: 'assets',
    runtimeCompiler: true,
    configureWebpack: {
        node: {
            __dirname: true,
            __filename: false,
        },
        resolve: {
            alias: {
                '@grpc/proto-loader': 'webpack-proto-loader',
            },
        },
        module: {
            rules: [
                {
                    test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                fallback: {
                                    loader: 'file-loader',
                                    options: {
                                        name: 'assets/img/[name].[ext]',
                                    },
                                },
                            },
                        },
                    ],
                },
                {
                    test: /\.(svg)(\?.*)?$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: 'assets/img/[name].[ext]',
                            },
                        },
                    ],
                },
            ],
        },
    },
    pluginOptions: {
        nodeModulesPath: ['../../node_modules', './node_modules'],
        externals: ['@grpc/proto-loader'],
        electronBuilder: {
            builderOptions: {
                directories: {
                    buildResources: './build_files',
                },
                appId: 'io.etcdmanager.app',
                copyright: `ICell Ltd and contributors ${new Date().getFullYear()}`,
                publish: ['github'],
                npmRebuild: false,
                nsis: {
                    oneClick: false,
                    perMachine: false,
                    allowToChangeInstallationDirectory: true,
                    installerIcon: './build_files/icon.ico',
                    uninstallerIcon: './build_files/icon.ico',
                    installerHeader: './build_files/header_icon.bmp',
                    license: 'LICENSE',
                    installerLanguages: ['en_US', 'hu_HU'],
                    createDesktopShortcut: 'always',
                    multiLanguageInstaller: true,
                    runAfterFinish: false,
                },
                win: {
                    icon: './public/icons/icon.ico',
                    artifactName: '${productName}-${version}-win64.${ext}',
                    target: [
                        {
                            target: 'nsis',
                            arch: ['x64', 'ia32'],
                        },
                    ],
                },
                appImage: {
                    license: 'LICENSE',
                },
                snap: {
                    summary:
                        'Free, multi-platform ETCD client with a modern UI',
                },
                linux: {
                    icon: './public/icons/512x512.png',
                    artifactName: '${productName}-${version}-linux.${ext}',
                    category: 'Development',
                    desktop: {
                        'Type': 'Application',
                        'Application': 'UTF-8',
                        'Name': 'ETCD Manager',
                        'Application Name': 'Multi-platform ETCD client',
                    },
                    synopsis:
                        'Free, multi-platform ETCD client with a modern UI',
                    target: [
                        {
                            target: 'AppImage',
                            arch: 'x64',
                        },
                        {
                            target: 'tar.gz',
                            arch: 'x64',
                        },
                    ],
                },
                dmg: {
                    background: './build_files/icon_gray.png',
                    title: '${productName} v${version}',
                    contents: [
                        {
                            x: 150,
                            y: 220,
                        },
                        {
                            x: 390,
                            y: 220,
                            type: 'link',
                            path: '/Applications',
                        },
                    ],
                },
                pkg: {
                    allowAnywhere: false,
                    installLocation: '/Applications',
                    allowCurrentUserHome: true,
                    overwriteAction: 'upgrade',
                    background: {
                        file: './build_files/icon.png',
                        alignment: 'topleft',
                        scaling: 'proportional',
                    },
                    license: 'LICENSE',
                    welcome: './build_files/welcome.html',
                    conclusion: './build_files/conclusion.html',
                    isVersionChecked: false,
                },
                mac: {
                    category: 'public.app-category.developer-tools',
                    icon: './public/icons/icon.icns',
                    artifactName: '${productName}-${version}-osx.${ext}',
                    target: [
                        {
                            target: 'pkg',
                            arch: 'x64',
                        },
                    ],
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
                    '!**/{appveyor.yml,.travis.yml, circle.yml}',
                    '!**/{npm-debug.log,yarn.lock,.yarn-integrity,.yarn-metadata.json}',
                    {
                        from: '../../node_modules/protobufjs/google/protobuf',
                        to: 'node_modules/protobufjs/dist/google/protobuf',
                    },
                ],
                extraResources: [
                    {
                        from: 'node_modules/etcd3/lib/proto',
                        to: 'proto',
                    },
                ],
            },
        },
    },
};
