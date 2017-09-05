## Jonniek homepage

A nuxt.js project that generates static blog content and deploys to github pages. Database is stored locally for NeDB.

### Installation
```
npm install

#optionally clean up static files and remove imagebank folder
#optionally remove files in server/data folder to reset database
rm server/data/*

#add a remote for generated dir to push or edit deploy script in package.json
git remote add pushdir git@github.com:jonniek/jonniek.github.io.git
```

### Content management
```
npm run dev
#http://localhost:3000/admin
```

### Deploying
```
#start server in another window for generate to access content
npm run start

npm run generate
#you can verify content in /dist folder

npm run deploy
```