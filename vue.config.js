module.exports = {
    assetsDir: 'assets',
    runtimeCompiler: true,
    configureWebpack: {
        node: {
            __dirname: true,
            __filename: false
        }
    }
};
