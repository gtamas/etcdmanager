# ETCD Manager
This is a free, cross-platform ETCD v3 client and GUI. The goal of the project is twofold:

- Provide an efficient, modern GUI for desktop (Windows, Linux, Mac), mobile (iOS and Android) and web.
- Cover all ETCD functionality. Anything you can do with ***etcdctl***, you should be able to do with this tool. This should be useful for simple and power users alike.

Currently only the **beta** desktop version is available.

**Attention!**
This is still a work in progress, it's **NOT** production ready yet! Use it at your own risk!

## Installation

### End users..

We have pre-built binaries for OSX (Yosemite+), Windows (7+) as well as the major Linux distributions (Debian, Ubuntu etc). Download one of these packages from the [releases](https://github.com/gtamas/etcdmanager/releases) page.

### Contributors..

You may install the dev version  either by cloning this repository...

```
git clone git@github.com:gtamas/etcdmanager.git
```

... or via Yarn:


```
yarn add etcd-manager
```

Please also check out the [contribution guide](./CONTRIBUTION.md) before writing any code.

### Running the dev build

Once you have the code, simply execute the following commands. Please note that NPM 6.x or Yarn 1.16.x is required, and Yarn is recommended.

```
yarn install
yarn electron:serve
```

or

```
npm install
npm run electron:serve
```

## Upgrading

We don't have automatic updates yet. If you've already installed this product and would like to upgrade, you have to download the the new release. Please see our [releases](https://github.com/gtamas/etcdmanager/releases) page. 

As for the dev version, you may update that by the usual means (Yarn or Git). In any case, please read our [changelog](./CHANGELOG.md) for an overview of the most recent changes.

## Bugs and feature requests

This is the beta version, so probably there are bugs. If you find one of them, please report it using our [issue tracker](https://github.com/gtamas/etcdmanager/issues).

This is also the place to request new features or ask questions. Please label your your issue appropriately, use the "bug", "enchantment" and "question" labels, respectively.

## Coming soon..

- [X] Builds for all OSes.
- [ ] Usage instructions / docs.
- [ ] End to end test coverage
- [X] NPM package available



