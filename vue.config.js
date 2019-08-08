
module.exports = {
    assetsDir: 'assets',
    runtimeCompiler: true,
    configureWebpack: {
        node: {
            __dirname: true,
            __filename: false
        },
        resolve: {
            alias: {
                '@grpc/proto-loader': 'webpack-proto-loader'
            }
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
                              name: 'assets/img/[name].[ext]'
                            }
                          }
                        }
                      }
                    ]
                  },
                  {
                    test: /\.(svg)(\?.*)?$/,
                    use: [
                      {
                        loader: 'file-loader',
                        options: {
                          name: 'assets/img/[name].[ext]'
                        }
                      }
                    ]
                  },
            ]
        }
    },
    pluginOptions: {
        nodeModulesPath: ['../../node_modules', './node_modules'],
        externals: ['@grpc/proto-loader'],
        electronBuilder: {
            builderOptions: {
                win: {
                    appId: 'com.electron.${productName}',
                    icon: './public/icons/icon.ico',
                    artifactName: '${productName}-${version}-win64.${ext}',
                    copyright: 'Copyright ${year} year ${author}'
                },
                linux:{
                    appId: 'com.electron.${productName}',
                    icon: './public/icons/512x512.png',
                    artifactName: '${productName}-${version}-linux.${ext}',
                    copyright: 'Copyright ${year} year ${author}',
                    category: 'Utility'
                },
                mac: {
                    appId: 'com.electron.${productName}',
                    icon: './public/icons/icon.icns',
                    artifactName: '${productName}-${version}-osx.${ext}',
                    copyright: 'Copyright ${year} year ${author}',
                    category: 'public.app-category.developer-tools'
                },
                files: [
                    '**/*',
                    "!**/node_modules/*/{CHANGELOG.md,README.md,README,readme.md,readme}",
                    "!**/node_modules/*/{test,__tests__,tests,powered-test,example,examples}",
                    "!**/node_modules/*.d.ts",
                    "!**/node_modules/.bin",
                    "!**/*.{iml,o,hprof,orig,pyc,pyo,rbc,swp,csproj,sln,xproj}",
                    "!.editorconfig",
                    "!**/._*",
                    "!**/{.DS_Store,.git,.hg,.svn,CVS,RCS,SCCS,.gitignore,.gitattributes}",
                    "!**/{__pycache__,thumbs.db,.flowconfig,.idea,.vs,.nyc_output}",
                    "!**/{appveyor.yml,.travis.yml, circle.yml}",
                    "!**/{npm-debug.log,yarn.lock,.yarn-integrity,.yarn-metadata.json}",
                    {
                        from:
                            '../../node_modules/protobufjs/google/protobuf',
                        to: 'node_modules/protobufjs/dist/google/protobuf',
                    },
                ],
                extraResources: [
                    {
                        from:
                            'node_modules/etcd3/lib/proto',
                        to: 'proto',
                    }
                ]
            },
        },
    },
};
