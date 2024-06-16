## The project

Cheap and cheerful Svelte app to randomly choose some place bell from Smith's 23 Spliced to help you revise!
You can disable repeats to run through all 161 leads, or choose randomly from all leads each time.

Hosted on surge at [23-spliced-practice.surge.sh](http://23-spliced-practice.surge.sh)

Things it can do:

- Select a lead at random from the full method set
- Avoid duplicate leads so you can test your knowledge of all of them
- Show you the blueline for your current lead

Things it can't do:

- Limit the method set, allowing you to select specific methods to revise
- Follow the 23 Spliced Peal Composition

## Get started

Install the dependencies...

```bash
npm install
```

...then start [Rollup](https://rollupjs.org):

```bash
npm run dev
```

Navigate to [localhost:8080](http://localhost:8080). You should see the app running.

## Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
```

You can run the newly built app with `npm run start`. This uses [sirv](https://github.com/lukeed/sirv), which is included in your package.json's `dependencies` so that the app will work when you deploy to platforms like [Heroku](https://heroku.com).

## Deploying to [surge](https://surge.sh/)

The project is currently hosted on surge. We can build and deploy to surge using

```bash
npm run deploy
```

This will build the project to the `public` folder, then deploy that via surge to the URL specified in the public/CNAME file.
