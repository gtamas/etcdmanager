# ETCD Manager
This is gonna be a free, cross-platform ETCD v3 client and GUI. The goal of the project is twofold:

- Provide an efficent, modern GUI for desktop (Windows, Linux, Mac), mobile (iOS and Android) and web.
- Cover all ETCD functionality. Anything you can do with etcdctl you should be able to do with this tool. This should be useful for simple and power users alike.

 Currently only the pre-alpha dektop version is available.

**Attention!**
This is still a work in progress, it's NOT production ready yet! Use at your own risk!

## Install

You may install it by cloning this repo.

```
git clone git@github.com:gtamas/etcdmanager.git
```

## Run / dev build

Once you have the code, simply execute the following commands. Please note that NPM 6.x or Yarn 1.16.x is required.

```
yarn install
yarn electron:serve
```

or

```
npm install
npm run electron:serve
```

## Coming soon..

- [ ] Builds for all OSes.
- [ ] End to end tests
- [ ] NPM package available



